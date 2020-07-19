import React, {Component} from 'react'

import PersonProfile from "./personProfile/"
import CompanyProfile from "./companyProfile"

import UserService from '../../services/UserService'


class ProfilePage extends Component {
    constructor (props){
        super (props)
        this.state = {
            userDetails: undefined
        }

        this.UserService = new UserService()
    }
    componentDidMount = () =>{

        const id = this.props.loggedInUser._id

        this.UserService
            .getUserDetails(id)
            .then((response) =>  this.setState({ userDetails: response.data}))
            .catch(err => console.log(err))
    }

    render () {

        let detailedProfile
        if(this.state.userDetails){
            detailedProfile= this.props.loggedInUser.companyDetails ? 
            <CompanyProfile userDetails={this.state.userDetails} loggedInUser={this.props.loggedInUser}/>
            : <PersonProfile userDetails={this.state.userDetails} loggedInUser={this.props.loggedInUser}/>
        }
        
        return (
            <>
                {!this.props.loggedInUser ? <h1>cargando</h1>:
                <main>
                <h1>Welcome to your profile, {this.props.loggedInUser.username}</h1>
                    <span>{this.props.loggedInUser.personDetails ? "User" : "Company"}</span>
                    {detailedProfile }
                </main>
            }
            </>

            
        )
    }
}

export default ProfilePage
