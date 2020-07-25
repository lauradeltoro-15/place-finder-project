import React, { Component } from 'react'
import UserService from "../../../../services/UserService"

import './profile.css'

import instagram from './instagram-bosquejado.svg'
import Button from 'react-bootstrap/Button'

import LocalList from "./local/local-list"

import { Link } from "react-router-dom"

class CompanyProfile extends Component {
    constructor() {
        super()
        this.state = {
            user: undefined
        }
        this.userService = new UserService()
    }
    isUserTheProfileOwner = () => this.props.loggedInUser._id === this.props.paramId
    render() {
        const company = this.props.userDetails.companyDetails
        const socialMedia = company.socialMedia.map(social => <li>{social.name}: <figure src={instagram}><Link to={social.mediaUrl} /></figure></li>)
        return (
            <>
            <section className="general-info">

                <article className='desc-cont'>
                    <span className = 'color-text'>Description : </span>
                    <span>{company.description}</span>
                </article>

                <hr></hr>
                <article className='desc-cont'>
                    <span className='color-text'>Contact</span>
                    <ul className='contact'>
                        <li>phone: {company.phone}</li>
                        {socialMedia}
                    </ul>
                </article>

                <hr></hr>
                <article className='desc-cont'>
                {this.isUserTheProfileOwner() &&
                    <>
                    <Link to={`/profile/edit/company/${this.props.loggedInUser._id}`}><Button variant='dark' type='submit' >Edit profile</Button></Link>
                        <Link to={`/user/${this.props.userDetails._id}/local/add`}><Button variant='dark' type='submit' >Add new local</Button></Link>
                        
                    </>
                }
                </article>
                
            </section>
            <section className='local-section'>
            <h3>Locals</h3>
                <LocalList user={this.props.userDetails._id} loggedInUser={this.props.loggedInUser} />
            </section>
            </>
        )
    }
}

export default CompanyProfile