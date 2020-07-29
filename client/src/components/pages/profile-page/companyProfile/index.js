import React, { Component } from 'react'



import './profile.css'

import Button from 'react-bootstrap/Button'

import LocalList from "./local/local-list"
import UiModal from "../../../ui/Modal"
import LocalForm from "./local/local-form"
import SpinnerContainer from "../../../ui/Spinner"
import { Link } from "react-router-dom"

class CompanyProfile extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    isUserTheProfileOwner = () => this.props.loggedInUser._id === this.props.paramId

    handleFormModal = status => this.setState({ showModal: status })

    handleFormSubmit = () => {
        this.handleFormModal(false)
        this.props.updateUserDetails(this.props.paramId)
    }

    render() {
        const company = this.props.userDetails.companyDetails
        return (
            <>{!company ? <SpinnerContainer /> :
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
                                    <Button onClick={() => this.handleFormModal(true)} variant='dark' type='submit' >Add new local</Button>

                                </>
                            }
                        </article>
                    </section>
                    <section className='local-section'>
                        <h3>Locals</h3>
                        <LocalList handleToast={this.props.handleToast} handleModal={this.handleFormModal} user={this.props.userDetails._id} locals={this.props.locals} loggedInUser={this.props.loggedInUser} updateUserDetails={this.props.updateUserDetails} />
                    </section>
                    <UiModal handleModal={this.handleFormModal} show={this.state.showModal} >
                        <LocalForm loggedInUser={this.props.loggedInUser} handleToast={this.props.handleToast} handleFormSubmit={this.handleFormSubmit} />
                    </UiModal>
                </>
            }
            </>
        )
    }
}

export default CompanyProfile