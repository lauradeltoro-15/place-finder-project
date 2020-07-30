import React, { Component } from 'react'

import Button from "react-bootstrap/Button"

import EventService from "../../../../../services/EventService"
import OfferService from "../../../../../services/OfferService"

import OfferForm from "../../../events-page/event-details/offers-list/form"
import Modal from "../../../../ui/Modal"

class RecommendationCard extends Component {
    constructor() {
        super()
        this.state = {
            showModal: false,
        }
        this.eventService = new EventService()
        this.offerService = new OfferService()
    }

    joinEvent = (eventId, userId) => {
        this.eventService
            .joinEvent(eventId, userId)
            .then(() => this.props.updateEvents())
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }

    handleFormModal = (status, e) => this.setState({ showModal: status })

    handleEventSubmit = () => {
        this.handleFormModal(false)
        this.props.updateEvents()
    }

    render() {
        return (
            <div className='row'>
                <div className='events-calendar'>
                    <div className='col-md-2 img-recom-div'><img src={this.props.avatar}></img></div>
                    <div className='col-md-7'>
                        <h6 className='color-text'>{this.props.name}</h6>
                        {this.props.acceptedOffer ? <span className='text-black'>Confirmed </span> :
                            <span className='text-black'>Not confirmed </span>}    |
                <span className='text-black'> Participants: </span>{this.props.participants.length}
                        <p className="text-small"><span className='text-black'>Theme: </span>{this.props.theme.map(theme => <span className='btn btn-grey'>{theme}</span>)}</p>
                    </div>
                    <div className='col-md-4'>
                        {this.props.loggedInUser.companyDetails &&
                            <Button onClick={() => this.handleFormModal(true)} variant="primary">Add an offer</Button>
                        }
                        {this.props.loggedInUser.personDetails &&
                            <Button variant='primary' onClick={() => this.joinEvent(this.props._id, this.props.loggedInUser._id)}> Join event </Button>
                        }
                    </div>
                </div>
                <Modal handleModal={this.handleFormModal} show={this.state.showModal} >
                    <OfferForm event={this.props._id} updateCalendarOffers={this.props.updateEvents} handleToast={this.props.handleToast} handleEventSubmit={this.handleEventSubmit} loggedInUser={this.props.loggedInUser} />
                </Modal>
            </div>
        )
    }
}

export default RecommendationCard
