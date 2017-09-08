import React,{Component} from 'react';
import * as Redux from 'react-redux';
import {BrowserRouter as Redirect, Router, Route, Switch, Link} from 'react-router-dom';
import { push } from 'react-router-redux';
import _ from 'lodash';
import books from 'google-books-search';
import axios from 'axios';
var actions = require('../../actions/actions.jsx');

class MenuBar extends Component {
  constructor(props){
    super(props);

  }

  searchBooks(){
    // _.trim(e.target.value);
    // e.persist();
    var {dispatch} = this.props;
    var term = this.refs.searchTerm.value;

      var url = `https://www.googleapis.com/books/v1/volumes?q=${term}&startIndex=0&maxResults=20&printType=all&orderBy=relevance&langRestrict=en&API_KEY=AIzaSyA_NAVmh4jsC-6ag1l7nYycm_kG2zJ9cg0`;
      console.log(url);

      if (_.trim(term) === '' || term.length < 1) {
        dispatch(actions.clearSearchResults());
        return;
      }

      axios.get(url).then((res)=>{
        // console.log(res.data.items);
        var results = res.data.items.map((item)=>{
          return item.volumeInfo;
        })
        console.log(results);
        dispatch(actions.setSearchResults(results));
      },(e)=>console.log(e))
    }


  componentWillMount(){
    //request user details from server and update state
    var {dispatch, auth} = this.props;

    if (!auth.user) {
      var email = localStorage.getItem("email");
      dispatch(actions.fetchUserDetails(email));
    }

  }

  componentDidMount(){
    var {dispatch, settings} = this.props;
    if (settings.showSettings) {
      dispatch(actions.showSettings(false));
    }
  }

  showSettings(){
    var {dispatch, settings} = this.props;
    settings.showSettings ? dispatch(actions.showSettings(false)) : dispatch(actions.showSettings(true));
  }

  mouseEnterSettings(){
    var {dispatch} = this.props;
    dispatch(actions.showSettings(true));
  }

  mouseLeaveSettings(){
    var {dispatch} = this.props;
    dispatch(actions.showSettings(false));
  }

  saveSettings(e){
    e.preventDefault();
    var {dispatch, auth} = this.props;

    var email = localStorage.getItem("email");
    var firstName = _.trim(this.refs.firstname.value);
    var lastName = _.trim(this.refs.lastname.value);
    var location = _.trim(this.refs.location.value);

    if (firstName === '' || lastName === '' || location === '') {
      return;
    }
    var settings = {email, firstName, lastName, location};
    dispatch(actions.saveUserSettings(settings));
  }

  signOutUser(){
    var {dispatch} = this.props;
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    dispatch(actions.nukeAuthData());
    dispatch(push('/signin'));
  }


  render(){

    if (!this.props.auth.user) {
      return <div>Loading....</div>
    }

    var renderSettingsBox = () => {
      return (
        <div className="bc-settings-box">
            <form className="bc-settings-form">
              <div>Profile Settings</div>
              <br/>
              <input className="bc-settings-input" type="text" placeholder={(Object.keys(this.props.auth.user)).length <= 0 ? "First Name" : "First Name -" + this.props.auth.user.firstName} ref="firstname"/>
              <input className="bc-settings-input" type="text" placeholder={(Object.keys(this.props.auth.user)).length <= 0 ? "Last Name" : "Last Name -" + this.props.auth.user.lastName} ref="lastname"/>
              <input className="bc-settings-input" type="text" placeholder={(Object.keys(this.props.auth.user)).length <= 0 ? "Location" : "Location -" + this.props.auth.user.location} ref="location"/>
                <br/>
                {
                  this.props.settings.saveSettings ?
                  <button onClick={(e)=>e.preventDefault()}><i className="fa fa-spinner fa-pulse"></i></button> :
                  <button onClick={this.saveSettings.bind(this)}>Save</button>
                }
            </form>
        </div>
      )
    }

    var renderSearchResults = () => {
      this.props.books.searchResults.map((each, index)=> {
        console.log(each.title);
        return (
          <li key={index}>{each.title}</li>
        );

      });
    }

    return (
      <div>
          <div className="bc-menu-bar">

          <a href='https://www.freecodecamp.org/challenges/manage-a-book-trading-club' target="_blank"><div className="bc-fcclogo"></div></a>
          <Link to='/'><div className={this.props.myBooksActive + " bc-mybooks"}>My Books</div></Link>
          <Link to='/allbooks'><div className={this.props.allBooksActive + " bc-allbooks"}>All Books</div></Link>

          <div className="bc-books-search">
            <input className="bc-books-searchbar" type="text" placeholder="Search and add books" ref="searchTerm"
                   onChange={_.debounce(this.searchBooks.bind(this), 300)}/>
            <i className="bc-search-icon fa fa-search" aria-hidden="true"></i>
            { this.props.books.searchResults ?
                <div className="bc-search-list-wrapper">
                  <div className="bc-search-list">
                    {
                      this.props.books.searchResults.map((each, index)=> {
                    return (
                      <div key={index} className="bc-book-details">
                        <img src={each.imageLinks ? each.imageLinks.thumbnail : null} className="bc-book-image"></img>
                      </div>
                    );

                  })
                }
                </div>
              </div> : null }
          </div>


          <div className="bc-profile">
            {(Object.keys(this.props.auth.user)).length <= 0 ? null : this.props.auth.user.firstName + " " + this.props.auth.user.lastName}
          </div>
          <div className="bc-notification">
            <i className="fa fa-bell" aria-hidden="true">
              {this.props.books.requestsPending ? null : <div className="bc-notification-alert"><i className="fa fa-circle" aria-hidden="true"></i></div>}
            </i>
          </div>

          <div className={this.props.settings.showSettings ? "bc-settings bc-settings-clicked" : "bc-settings" }
            onClick={this.showSettings.bind(this)}>
            <i className="fa fa-cog" aria-hidden="true" >
              {(Object.keys(this.props.auth.user)).length <= 0 ? <div className="bc-settings-alert"><i className="fa fa-exclamation" aria-hidden="true"></i></div> : null }
            </i>
          </div>
          {this.props.settings.showSettings ? renderSettingsBox() : null}

          <div className="bc-signout"><i className="bc-animate-logout fa fa-sign-out" aria-hidden="true" onClick={this.signOutUser.bind(this)}></i></div>
        </div>
      </div>
    )
  }
}

export default Redux.connect(
  (state) => {
    return {
      auth: state.auth,
      books: state.books,
      settings: state.settings
    }
  }
)(MenuBar);
