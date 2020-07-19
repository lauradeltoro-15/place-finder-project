import React, {Component} from 'react'
import UserService from "../../../services/UserService"

import Container from 'react-bootstrap/Container'

import {Link} from "react-router-dom"
class CompanyProfile extends Component {
    constructor (){
        super ()
        this.state = {
            user: undefined
        }
        this.userService = new UserService()
    }

    render () {
        const company = this.props.userDetails.companyDetails
        const socialMedia = company.socialMedia.map(social => <li>{`${social.name}:  ${social.mediaUrl}`}</li>)
        return (
            <Container as="section">
                <h4>Description</h4>
                <p>{company.description}</p>
                <h4>Contact</h4>
                <ul>
                    <li>phone: {company.phone}</li>
                    {socialMedia}
                </ul>
                <Link to={`/profile/edit/company/${this.props.loggedInUser._id}`}>Edit profile</Link>
                <h4>Locals</h4>
                <Link to={`company/${company._id}/local/add`}>Add new local</Link>

            </Container>
        )
    }
}

export default CompanyProfile