import React,{Component} from 'react';
import MenuBar from './MenuBar.jsx';

class Home extends Component {
  constructor(props){
    super(props);
  }

  render(){
    var colorStrip = [];
    for (var i = 1; i <= 10; i++) {colorStrip.push(<div key={i} className={"bc-color-strip-" +i} ></div>);}

    return (
      <div className="bc-outer-wrapper">
        <div className="bc-color-strip">{ colorStrip }</div>
        <MenuBar/>
        <div className="bc-books-container">
          <div>Approve Requests</div>
          <div>Search Books</div>
          <div>Add Books</div>
        </div>
      </div>
    )
  }
}

export default Home;
