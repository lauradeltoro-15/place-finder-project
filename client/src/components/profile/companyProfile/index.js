import React, {Component} from 'react'
import {Link} from "react-router-dom"
class CompanyProfile extends Component {
    constructor (){
        super ()
        this.state = {}
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