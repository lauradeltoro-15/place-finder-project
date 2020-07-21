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
    componentDidMount = () => {
        const id = this.props.match.params.userId
        this.UserService
            .getUserDetails(id)
            .then((response) =>  this.setState({ userDetails: response.data}))
            .catch(err => console.log(err))
    }

    render () {
        let detailedProfile
        if(this.state.userDetails){
            detailedProfile = this.state.userDetails.companyDetails ? 
                <CompanyProfile userDetails={this.state.userDetails} loggedInUser={this.state.userDetails}/>
                : <PersonProfile userDetails={this.state.userDetails} loggedInUser={this.state.userDetails}/>
        }
        
        return (
            <>
                {!this.state.userDetails ? <h1>cargando</h1>:
                <main>
                        <h1>{this.state.userDetails.username} profile</h1>
                        <span>{this.state.userDetails.personDetails ? "User" : "Company"}</span>
                    { detailedProfile }
                </main>
            }
            </>

            
        )
    }
}

export default ProfilePage
