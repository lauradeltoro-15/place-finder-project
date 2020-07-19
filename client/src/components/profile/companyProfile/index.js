import React, {Component} from 'react'
import UserService from "../../../services/UserService"

import {Link} from "react-router-dom"
class CompanyProfile extends Component {
    constructor (props){
        super (props)
        this.state = {
            user: undefined
        }
        this.userService = new UserService()
    }
    componentDidMount = () => this.updateUserProfile()
    updateUserProfile = () => {
        console.log(this.props)
        // this.userService
        //     .getUserDetails()
        //     .then(response => this.setState({ coasters: response.data }))
        //     .catch(err => console.log(err))
    }
    render () {
        return (
            <>
                <h1>This is the company profile</h1>
                <Link to={`/profile/edit/company/${this.props.loggedInUser._id}`}>Edit profile</Link>

            </>
        )
    }
}

export default CompanyProfile