import React,{Component} from 'react';
import MenuBar from './MenuBar.jsx';
import * as Redux from "react-redux";
import TimeAgo from 'react-timeago'
var actions = require('../../actions/actions.jsx');

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {setClass: null}
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

  render(){
    var colorStrip = [];
    for (var i = 1; i <= 10; i++) {colorStrip.push(<div key={i} className={"bc-color-strip-" +i} ></div>);}

    return (
      <div className="bc-outer-wrapper">
        <div className="bc-color-strip">{ colorStrip }</div>
        <MenuBar myBooksActive={this.state.setClass}/>
        <div className="bc-books-container">
          {
            this.props.books.requestsReceived.length > 0 ?
            <div className="bc-books-requests">
                {
                  this.props.books.requestsReceived.map((request, index)=>{
                      return <div key={index} className="bc-books-request">
                        <div className="bc-books-request-img">
                          <img src={request.book.volumeInfo.imageLinks.smallThumbnail}></img>
                          <div className="bc-books-request-details">
                            <div className="bc-books-request-user">
                              <div className="bc-books-request-user-label">Trader</div>
                              {/* <br/> */}
                              <div className="bc-books-request-userEmail">{request.trader}</div>
                            </div>

                            <div className="bc-books-request-btns">
                              <i className="fa fa-check" aria-hidden="true"></i>
                              <i className="fa fa-times" aria-hidden="true"></i>
                            </div>

                            <div className="bc-books-request-time"><TimeAgo date={request.timestamp}/></div>
                          </div>
                        </div>
                      </div>
                  })
              }
          </div>

            : null

          }


          <div className="bc-books-add">
            <div className="bc-books-list">
              {
                this.props.books.myBooks.length > 0 ? this.props.books.myBooks.map((book) =>{
                  var image_url = book.volumeInfo.imageLinks.thumbnail;
                  image_url = "https://"+image_url.slice(7);
                  return (
                    <div key={book.id} className="bc-each-book-container">
                      <div className="bc-each-book">
                        <img className="bc-each-book-img" src={image_url}></img>
                      </div>
                    </div>)
                }) : <i className="bc-loading-allbooks fa fa-refresh fa-spin fa-fw"></i>
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
