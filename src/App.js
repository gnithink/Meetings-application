// Import React
import React, { Component } from 'react';
import {Router, navigate} from "@reach/router";
import firebase from './Firebase';

import Home from './Home';
import Welcome from "./Welcome";
import Navigation from "./Navigation";
import Login from "./Login";
import Meetings from "./Meetings";
import Checkin from "./Checkin";
import Register from "./Register";
import Attendees from "./Attendees";
import { isNull } from 'lodash';



class App extends Component {

  constructor(){
    super();
    this.state = {
      user : null,
      displayName: null,
      userID: null
    }
    // this.registerUser = this.registerUser.bind(this);
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName : userName
      })
      .then(()=> {
          this.setState({
            user: FBUser,
            displayName: FBUser.displayName,
            userID: FBUser.uid

          });
          console.log(this.state.user);
          navigate('/meetings');
      })
    })
  }

  logoutUser = e => {
    e.preventDefault();
    this.setState({
      displayName: null,
      userID: null,
      user: null
    });

    firebase.auth().signOut()
    .then(()=> {
      navigate('/login');
    })
  }

  addMeeting = meetingName => {
    // ${} i think this is value of expression
    // https://developers.google.com/web/updates/2015/01/ES6-Template-Strings
    // https://stackoverflow.com/questions/44788755/firebase-child-failed-first-argument-was-an-invalid-path
   
    const ref = firebase.database().ref(`meetings/${this.state.user.uid}`);
    ref.push({meetingName: meetingName});
  }



  // should see what this thing does component did mount
  componentDidMount(){

    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser){
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        const meetingRef = firebase.database().ref('meetings/' + FBUser.uid);
        meetingRef.on('value', snapshot => {
          let meetings = snapshot.val();
          let meetingsList = [];

          for (let item in meetings) {
            meetingsList.push({
              meetingID: item,
              meetingName: meetings[item].meetingName
            });
          }
          this.setState({
            meetings: meetingsList,
            howManyMeetings: meetingsList.length
          });
        });
      }
      else{
        this.setState({user: null});
      }
      }
    )

    // const ref = firebase.database().ref('User');

    // ref.on("value", snapshot =>{
    //   let FBUser = snapshot.val();
    //   console.log(FBUser);
    //   this.setState({user: FBUser});
    // });
    
  }

  render() {
    return (
      <>
        <Navigation user ={this.state.user} logoutUser = {this.logoutUser}/>
        {this.state.user && (<Welcome 
        userName = {this.state.displayName}
        logoutUser = {this.logoutUser}/>)}
        
        <Router>
          <Home path = "/" user = {this.state.user}/>
          <Login path = "/login" />
          <Meetings 
          path = "/meetings" 
          meetings = {this.state.meetings}
          addMeeting = {this.addMeeting}
          userID = {this.state.userID}/>
          <Checkin path = "/checkin/:userID/:meetingID"/>
          <Attendees 
          path = "/attendees/:userID/:meetingID"
          adminUser = {this.state.userID}
          />
          <Register path = "/register" registerUser = {this.registerUser} />
        </Router>
      </>
    );
  }
}

export default App;
