import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import AuthService from "../services/AuthService"

import { Switch, Route, Redirect } from 'react-router-dom'

import AuthForm from "./auth-form"
import NavBar from "./ui/NavBar"
import ProfilePage from "./profile/"
import LocalForm from "./local/local-form"
import PersonEdit from './profile/personProfile/person-form'
import CompanyEdit from "./profile/companyProfile/company-form"
import LocalDetails from "./local/local-details"
import EventForm from './event/form'
import EventDetails from './event/details'
import Calendar from "./profile-calendar/calendar"
import EventList from './event/list'
import OfferForm from './offer/form'

class App extends Component {
  constructor (){
    super ()
    this.state = {
      loggedInUser: null, 
    }
    this.AuthService = new AuthService()
  }

  setTheUser = user => {
    this.setState({ loggedInUser: user }, () => this.state)
  }
  isUserAllowed = (currentUserId, userAllowedId) => {
    return currentUserId === userAllowedId
  }

  fetchUser = () => {
    this.AuthService
      .isLoggedIn()
      .then(response => {
        this.state.loggedInUser === null && this.setState({ loggedInUser: response.data })
      })
      .catch(err => console.log({ err }))
  }

  render() {
    this.fetchUser()
    return (
      <>
        <NavBar loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser} />

        <Switch>       
          <Route path="/signup" render={props => <AuthForm setTheUser={this.setTheUser} {...props} />}></Route>
          <Route path="/login" render={props => <AuthForm setTheUser={this.setTheUser} {...props} />}></Route>
                  
          <Route exact path="/user/:id/local/add" render={props => this.state.loggedInUser && this.isUserAllowed(this.state.loggedInUser._id, props.match.params.id)? <LocalForm loggedInUser={this.state.loggedInUser} {...props}/> : <Redirect to='/login' />} />
          <Route path="/user/:id/local/:localId/edit/" render={props => this.state.loggedInUser && this.isUserAllowed(this.state.loggedInUser._id, props.match.params.id) ? <LocalForm {...props} loggedInUser={this.state.loggedInUser}/> : <Redirect to='/login' />} />
          <Route path="/user/:id/local/:localId" render={props => this.state.loggedInUser ? <LocalDetails {...props} loggedInUser={this.state.loggedInUser} /> : <Redirect to='/login' />} />
          
          <Route exact path="/user/:id/event/create" render={props => this.state.loggedInUser ? <EventForm loggedInUser={this.state.loggedInUser} {...props} personDetails={this.state.loggedInUser.personDetails} /> : <Redirect to='/login' />} />
          <Route exact path="/user/:id/event/edit/:eventId" render={props => this.state.loggedInUser ? <EventForm loggedInUser={this.state.loggedInUser} {...props} personDetails={this.state.loggedInUser.personDetails} /> : <Redirect to='/login' />} />
          <Route exact path="/events"  render={props => <EventList loggedInUser={this.state.loggedInUser} {...props}  />} />
          <Route exact path="/user/:userId/events/:eventId"  render={props => <EventDetails loggedInUser={this.state.loggedInUser} {...props}  />} />

          <Route path="/profile/edit/company/:userId" render={props => this.state.loggedInUser && this.isUserAllowed(this.state.loggedInUser._id, props.match.params.userId)? <CompanyEdit setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} {...props} /> : <Redirect to='/login' />}></Route>
          <Route path="/profile/edit/:userId" render={props => this.state.loggedInUser && this.isUserAllowed(this.state.loggedInUser._id, props.match.params.userId)? <PersonEdit  setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} {...props} />: <Redirect to='/login' />}></Route>
          <Route path="/profile/:userId/calendar" render={props => <Calendar loggedInUser={this.state.loggedInUser} {...props} /> } />
          <Route exact path="/profile/:userId" render={props => this.state.loggedInUser ? <ProfilePage loggedInUser={this.state.loggedInUser} {...props} /> : <Redirect to='/login' />} />

          <Route path='/user/:id/event/:eventId/offer/add' render={props => this.state.loggedInUser ? <OfferForm loggedInUser={this.state.loggedInUser} {...props}/> : <Redirect to='/login' />}/>
        </Switch>
      </>
    )
  }
}

export default App