import React, { Component } from 'react'
import UserService from "../../../../services/UserService"

import './profile.css'

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
        console.log(company)
        return (
            <>
            <section className="general-info">

                <article className='desc-cont'>
                    <p className='color-text'>Description : </p>
                        {company.description ? <p>{company.description}</p> : <p>You don't have a description yet. Complete your profile and let us know about <Link className="color-text" to={`/profile/edit/company/${this.props.loggedInUser._id}`}>your company</Link>.</p>}    
                    
                </article>

                <hr></hr>
                <article className='desc-cont'>
                        <p className='color-text'>Contact</p>
                        {company.contact.phone.value && 
                            <>
                            <img alt="phone-icon" className="small-icon" src={company.contact.phone.image} />
                            <span>{company.contact.phone.value}</span>
                            </>
                        }
                        {company.contact.instagram.value &&
                            <>
                                <img alt="instagram-icon" className="small-icon" src={company.contact.instagram.image} />
                                <span>{company.contact.instagram.value}</span>
                            </>
                        }
                        {company.contact.facebook.value &&
                            <>
                                <img alt="instagram-icon" className="small-icon" src={company.contact.facebook.image} />
                                <span>{company.contact.facebook.value}</span>
                            </>
                        }
                        {company.contact.instagram.value &&
                            <>
                                <img alt="instagram-icon" className="small-icon" src={company.contact.website.image} />
                                <span>{company.contact.website.value}</span>
                            </>
                        }
                        {!company.contact.instagram.value && !company.contact.phone.value && !company.contact.facebook.value && !company.contact.website.value && <p>You don't have any contact information, <Link className="color-text" to={`/profile/edit/company/${this.props.loggedInUser._id}`}>fill it!</Link></p>}
                        
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
                    <LocalList handleToast={this.props.handleToast} user={this.props.userDetails._id} loggedInUser={this.props.loggedInUser} />
            </section>
            </>
        )
    }
}

export default CompanyProfile