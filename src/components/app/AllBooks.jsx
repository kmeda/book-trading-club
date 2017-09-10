import React,{Component} from 'react';
import MenuBar from './MenuBar.jsx';
import * as Redux from "react-redux";
import axios from 'axios';
var actions = require('../../actions/actions.jsx');

class AllBooks extends Component {
  constructor(props){
    super(props);
    this.state = {setClass: null}
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

  render(){
    var colorStrip = [];
    for (var i = 1; i <= 10; i++) {colorStrip.push(<div key={i} className={"bc-color-strip-" +i} ></div>);}

    return (
      <div className="bc-outer-wrapper">
        <div className="bc-color-strip">{ colorStrip }</div>
        <MenuBar allBooksActive={this.state.setClass}/>
        <div className="bc-books-container">
          <div className="bc-books-add">
            <div className="bc-books-list">
              {
                this.props.books.allBooks.length > 0 ? this.props.books.allBooks.map((user) =>{
                  return user.books.map((book, index)=>{
                    var image_url = book.volumeInfo.imageLinks.thumbnail;
                    image_url = "https://"+image_url.slice(7);
                    return (
                      <div key={book.id} className="bc-each-book-container">
                        <div className="bc-each-book">
                          <img className="bc-each-book-img" src={image_url}></img>
                        </div>
                      </div>)
                  })
                })
                : null
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
)(AllBooks);
