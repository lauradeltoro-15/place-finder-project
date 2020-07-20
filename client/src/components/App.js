import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import AuthService from "../services/AuthService"
import UserService from '../services/UserService'

import { Switch, Route, Redirect } from 'react-router-dom'

import AuthForm from "./auth-form"
import NavBar from "./ui/NavBar"
import ProfilePage from "./profile/"
import CompanyForm from "./profile/companyProfile/company-form"
import LocalForm from "./profile/companyProfile/local-form"
import PersonEdit from './profile/personProfile/person-form'
import PersonProfile from './profile/personProfile'
import CompanyEdit from "./profile/companyProfile/company-form"
import EventCreateForm from "./event/event-create-form"
import EventEditForm from './event/event-edit-form'

class App extends Component {
  constructor (){
    super ()
    this.state = {
      loggedInUser: null, 
    }
    this.AuthService = new AuthService()
  }
  setTheUser = user => {
    console.log("This is previous user: ", this.state.loggedInUser)
    console.log("This is new user: ", user)
    this.setState({ loggedInUser: user }, () => this.state)
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
        {/* <CompanyForm />
        <LocalForm /> */}
        <hr></hr>
        <Switch>
          <Route path="/signup" render={props => <AuthForm setTheUser={this.setTheUser} {...props} />}></Route>
          <Route path="/login" render={props => <AuthForm setTheUser={this.setTheUser} {...props} />}></Route>
          {/* <Route exact path="/person/profile" render={props => <PersonProfile loggedUser={this.state.loggedInUser} />}></Route> */}
          <Route exact path="/event/create" render={props => this.state.loggedInUser ? <EventCreateForm loggedInUser={this.state.loggedInUser} {...props} personDetails={this.state.loggedInUser.personDetails} /> : <Redirect to='/login' />} />
          <Route path="/event/edit/:personId" render={props => this.state.loggedInUser ? <EventEditForm loggedInUser={this.state.loggedInUser} {...props} personDetails={this.state.loggedInUser.personDetails} /> : <Redirect to='/login' />} />
          <Route path="/profile/edit/company/:userId" render={props => this.state.loggedInUser ? <CompanyEdit  setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} {...props} />: <Redirect to='/signup' />}></Route>
          <Route path="/profile/edit/:userId" render={props => this.state.loggedInUser ? <PersonEdit  setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} {...props} />: <Redirect to='/signup' />}></Route>
          <Route path="/profile" render={() => this.state.loggedInUser ? <ProfilePage loggedInUser={this.state.loggedInUser} /> : <Redirect to='/login' />} />
          
        </Switch>
      </>
    )
  }
}

export default App