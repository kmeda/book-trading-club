import React,{Component} from 'react';

class Home extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="bc-outer-wrapper">
        <div className="bc-color-strip">
          <div className="bc-color-strip-01"></div>
          <div className="bc-color-strip-02"></div>
          <div className="bc-color-strip-03"></div>
          <div className="bc-color-strip-04"></div>
          <div className="bc-color-strip-05"></div>
          <div className="bc-color-strip-06"></div>
          <div className="bc-color-strip-07"></div>
          <div className="bc-color-strip-08"></div>
          <div className="bc-color-strip-09"></div>
          <div className="bc-color-strip-10"></div>
        </div>

        <div className="bc-menu-bar">
          <div className="bc-allbooks">All Books</div>
          <div className="bc-mybooks">My Books</div>
          <div className="bc-profile">Karthik Meda</div>
          <div className="bc-settings"><i className="fa fa-cog" aria-hidden="true"></i></div>
          <div className="bc-signout">Logout</div>
        </div>
      </div>
    )
  }
}

export default Home;
