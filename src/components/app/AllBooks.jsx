import React,{Component} from 'react';
import MenuBar from './MenuBar.jsx';
import * as Redux from "react-redux";
import axios from 'axios';
import _ from 'lodash';

import openSocket from 'socket.io-client';

if (process.env.NODE_ENV === 'production') {
  var socket_url = 'https://fcc-booktrading-club.herokuapp.com';
} else {
  var socket_url = 'http://localhost:3050';
}

const socket = openSocket(socket_url);

var actions = require('../../actions/actions.jsx');

class AllBooks extends Component {
  constructor(props){
    super(props);
    this.state = {
      setClass: null,
      hover: false
    }

    socket.on("pull_new_books", ()=>{
      console.log("book added");
      var {dispatch} = this.props;
      dispatch(actions.fetchAllBooks());
    });

    socket.on("pull_requests_sent", ()=>{
      var {dispatch} = this.props;
      dispatch(actions.fetchRequestsSent());
    });
  }

  componentDidMount(){
    this.setState({setClass: "bc-allbooks-active"});

  }

  componentWillUnmount(){
    this.setState({setClass: ""});
  }

  componentWillMount(){
    var {dispatch} = this.props;
    dispatch(actions.fetchAllBooks());
  }

  handleMouseEnter(id){
    this.setState({hover: id});
  }

  handleMouseLeave(){
    this.setState({hover: false});
  }

  handleTradeRequest(user, book){
    var {dispatch} = this.props;
    var trader = this.props.auth.user.email;
    var owner = user.user;
    // var book = book;

    const payload = {trader, owner, book};
    // console.log(payload);
    dispatch(actions.setTradeReqProg(true));
    dispatch(actions.updateUserRequests(payload));
  }

  render(){
    var colorStrip = [];
    for (var i = 1; i <= 10; i++) {colorStrip.push(<div key={i} className={"bc-color-strip-" +i} ></div>);}

    var renderOptions = (user, book)=>{
      if (this.state.hover === book.uid) {
        return <div className="bc-each-book-details" onMouseLeave={this.handleMouseLeave.bind(this)}>
          <div className="bc-each-book-user">
            <div><i className="fa fa-user-circle-o fa-2x"></i></div>
            <div className="bc-each-book-userName">{user.firstName ? user.firstName : "NA"}
            {user.lastName ? " " + user.lastName : null}</div>
            <br/>
            <div><i className="fa fa-envelope-o"></i></div>
            <div className="bc-each-book-userEmail">{user.user}</div>
          </div>

          <div className="bc-each-book-request">
            {
              _.find(this.props.books.requestsSent, {book: {uid: book.uid}})
              ? "Trade Requested"
              : (this.props.books.sendingTradeReq
                ? "Sending..."
                : <button onClick={this.handleTradeRequest.bind(this, user, book)}>Trade</button>)
            }
          </div>
        </div>
      }
    }

    return (
      <div className="bc-outer-wrapper">
        <div className="bc-color-strip">{ colorStrip }</div>
        <MenuBar allBooksActive={this.state.setClass}/>
        <div className="bc-books-container">
          <div className="bc-books-add">
            <div className="bc-books-list">
              {
                this.props.books.allBooks.length > 0 && this.props.auth.user ? this.props.books.allBooks.map((user) =>{
                  return user.books.map((book, index)=>{
                    var image_url = book.volumeInfo.imageLinks.thumbnail;
                    image_url = "https://"+image_url.slice(7);
                    return (
                      <div key={index} className="bc-each-book-container"
                        onMouseEnter={this.handleMouseEnter.bind(this, book.uid)}
                        >
                        <div className="bc-each-book">
                          <img className="bc-each-book-img" src={image_url}></img>
                        </div>
                        {renderOptions(user, book)}
                      </div>)
                  })
                })
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
      books: state.books,
      auth: state.auth
    }
  }
)(AllBooks);
