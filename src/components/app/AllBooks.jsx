import React,{Component} from 'react';
import MenuBar from './MenuBar.jsx';
import * as Redux from "react-redux";
import axios from 'axios';
var actions = require('../../actions/actions.jsx');

class AllBooks extends Component {
  constructor(props){
    super(props);
    this.state = {
      setClass: null,
      hover: false
    }
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



  render(){
    var colorStrip = [];
    for (var i = 1; i <= 10; i++) {colorStrip.push(<div key={i} className={"bc-color-strip-" +i} ></div>);}

    var renderOptions = (user, book, index)=>{
      if (this.state.hover === book.uid) {
        console.log(this.state.hover);
        return <div className="bc-each-book-details" onMouseLeave={this.handleMouseLeave.bind(this)}>
          <div className="bc-each-book-useremail">
            Owner <br/>
            {user.firstName ? user.firstName : null}
            {user.lastName ? " " + user.lastName : null}
            <br/>
            {user.user}

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
                this.props.books.allBooks.length > 0 ? this.props.books.allBooks.map((user) =>{
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

                        {renderOptions(user, book, index)}

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
