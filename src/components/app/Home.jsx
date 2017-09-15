import React,{Component} from 'react';
import MenuBar from './MenuBar.jsx';
import * as Redux from "react-redux";
import TimeAgo from 'react-timeago';

import openSocket from 'socket.io-client';

if (process.env.NODE_ENV === 'production') {
  var socket_url = 'https://fcc-booktrading-club.herokuapp.com';
} else {
  var socket_url = 'http://localhost:3050';
}

const socket = openSocket(socket_url);

var actions = require('../../actions/actions.jsx');

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {setClass: null, requestId: false}

    socket.on("pull_requests_received", ()=>{
      var {dispatch} = this.props;
      dispatch(actions.fetchRequestsRecieved());
    });

    socket.on("pull_new_books", ()=>{
      var {dispatch} = this.props;
      dispatch(actions.fetchMyBooks());
    });
  }


  componentWillMount(){
    var {dispatch} = this.props;
    dispatch(actions.fetchMyBooks());
  }

  componentDidMount(){
    this.setState({setClass: "bc-mybooks-active"});
  }

  componentWillUnmount(){
    this.setState({setClass: ""});
  }

  cancelRequest(request_id, trader_email){
    this.setState({requestId: request_id});
    var {dispatch} = this.props;
    var owner = this.props.auth.user.email;
    var payload = {request_id, trader_email, owner};
    dispatch(actions.cancelRequest(payload));
  }

  approveRequest(request_book, request_id, trader_email){
    this.setState({requestId: request_id});
    var {dispatch} = this.props;
    var owner = this.props.auth.user.email;
    var payload = {request_id, trader_email, owner, request_book};
    dispatch(actions.approveRequest(payload));
  }

  removeBook(book){
    var {dispatch} = this.props;
    dispatch(actions.removeBookfromDatabase(book.uid));
  }

  render(){
    var requests = this.props.books.requestsReceived;
        requests = requests.sort((a,b) => {
          return b.timestamp - a.timestamp;
        });

    var renderButtons = (request) => {
      if (this.state.requestId === request.request_id) {
        return <i className="fa fa-spinner fa-pulse"></i>
      } else {
        return <div className="bc-books-request-btns"><i onClick={this.approveRequest.bind(this, request.book, request.request_id, request.trader)} className="fa fa-check" aria-hidden="true"></i>
        <i onClick={this.cancelRequest.bind(this, request.request_id, request.trader)} className="fa fa-times" aria-hidden="true"></i></div>
      }
    }

    var colorStrip = [];
    for (var i = 1; i <= 10; i++) {colorStrip.push(<div key={i} className={"bc-color-strip-" +i} ></div>);}

    return (
      <div className="bc-outer-wrapper">
        <div className="bc-color-strip">{ colorStrip }</div>
        <MenuBar myBooksActive={this.state.setClass}/>
        <div className="bc-books-container">
          {
            this.props.books.requestsReceived.length > 0 ?
            <div>
            <div className="bc-books-requests-header">Trade Requests</div>
            <div className="bc-books-requests">
                {
                  requests.map((request, index)=>{
                      return <div key={index} className="bc-books-request">
                        <div className="bc-books-request-img">
                          <img src={request.book.volumeInfo.imageLinks.smallThumbnail}></img>
                          <div className="bc-books-request-details">
                            <div className="bc-books-request-user">
                              <div className="bc-books-request-user-label">Trader</div>
                              <div className="bc-books-request-userEmail">{request.trader}</div>
                            </div>

                            { renderButtons(request) }

                            <div className="bc-books-request-time"><TimeAgo date={request.timestamp}/></div>
                          </div>
                        </div>
                      </div>
                  })
              }
          </div>
          </div> : null
          }

          <div className="bc-books-requests-header">My Books</div>
          <div className="bc-books-add">
            <div className="bc-books-list">
              {
                this.props.books.myBooks.length > 0
                ? this.props.books.myBooks.map((book) =>{
                  var image_url = book.volumeInfo.imageLinks.thumbnail;
                      image_url = "https://"+image_url.slice(7);
                      return (
                        <div key={book.uid} className="bc-each-book-container">
                          <div className="bc-each-book">
                            <a href={book.accessInfo.webReaderLink} target="_blank"><img className="bc-each-book-img" src={image_url}></img></a>
                          </div>
                          <div className="bc-each-book-remove" onClick={this.removeBook.bind(this, book)}><i className="fa fa-trash" aria-hidden="true"></i></div>
                        </div>)
                      })
                :
                  this.props.books.noBooksToShow
                  ? <div className="bc-books-list-none">No books found. Search and add books you like.</div>
                  : <i className="bc-loading-allbooks fa fa-refresh fa-spin fa-fw"></i>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Redux.connect(
  (state) => {
    return {
      books: state.books
    }
  }
)(Home);
