import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import AuthService from "../services/AuthService"

import { Switch, Route, Redirect } from 'react-router-dom'

import AuthForm from "./auth-form"
import NavBar from "./ui/NavBar"
import ProfilePage from "./profile/"
import LocalForm from "./profile/companyProfile/local-form/"
import PersonEdit from './profile/personProfile/person-form'
import CompanyEdit from "./profile/companyProfile/company-form"
import LocalDetails from "./profile/companyProfile/local-details"

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
          
          <Route path="/profile/edit/company/:userId" render={props => this.state.loggedInUser ? <CompanyEdit  setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} {...props} />: <Redirect to='/signup' />}></Route>
          <Route path="/profile/edit/:userId" render={props => this.state.loggedInUser ? <PersonEdit  setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} {...props} />: <Redirect to='/signup' />}></Route>
          <Route path="/profile" render={() => this.state.loggedInUser ? <ProfilePage loggedInUser={this.state.loggedInUser} /> : <Redirect to='/signup' />} />
        
          <Route path="/user/:id/local/add" render={props => this.state.loggedInUser ? <LocalForm loggedInUser={this.state.loggedInUser} {...props}/> : <Redirect to='/signup' />} />
          <Route path="/user/:id/local/:localId/edit/" render={props => this.state.loggedInUser ? <LocalForm {...props} /> : <Redirect to='/signup' />} />

          <Route path="/local/:id" render={props => this.state.loggedInUser ? <LocalDetails {...props} /> : <Redirect to='/signup' />} />
        </Switch>

      </>
    )
  }
}

export default App