import React,{Component} from 'react';
import MenuBar from './MenuBar.jsx';
import * as Redux from "react-redux";

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

  render(){
    var colorStrip = [];
    for (var i = 1; i <= 10; i++) {colorStrip.push(<div key={i} className={"bc-color-strip-" +i} ></div>);}

    return (
      <div className="bc-outer-wrapper">
        <div className="bc-color-strip">{ colorStrip }</div>
        <MenuBar allBooksActive={this.state.setClass}/>
        <div className="bc-books-container">
          <div>Render all books with request option.</div>
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
