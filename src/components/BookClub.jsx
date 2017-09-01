import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';


class BookClub extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <h1>After Login or Sign UP redirect here..</h1>
      </div>
    )
  }
}

export default withRouter(BookClub);
