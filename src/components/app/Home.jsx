import React,{Component} from 'react';
import MenuBar from './MenuBar.jsx';
import * as Redux from "react-redux";
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

          <div className="bc-books-requests">
            <div className="bc-books-request"></div>
            <div className="bc-books-request"></div>
            <div className="bc-books-request"></div>
            <div className="bc-books-request"></div>
            <div className="bc-books-request"></div>
          </div>

          <div className="bc-books-add">
            <div className="bc-books-list">
              {
                this.props.books.myBooks.length > 0 ? this.props.books.myBooks.map((book) =>{
                  return (
                    <div key={book.id} className="bc-each-book-container">
                      <div className="bc-each-book">
                        <img className="bc-each-book-img" src={book.volumeInfo.imageLinks.thumbnail}></img>
                      </div>
                    </div>)
                }) : null
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
