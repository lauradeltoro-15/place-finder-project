import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import EventService from '../../../../../services/EventService'

import UiModal from "../../../../ui/Modal"
import EventForm from "../../event-form"
import OfferForm from "../../event-details/offers-list/form"
import './card.css'

import React, { Component } from 'react'

class EventCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            owner: undefined,
            ownerId: undefined,
            buttons: undefined,
            showModal: false,
        }
        this.eventService = new EventService()
    }

    componentDidMount = () => this.setOwner(this.props._id)

    deleteEvent = eventId => {
        this.eventService
            .deleteEvent(eventId, this.props.loggedInUser._id)
            .then(() => this.props.updateEventList())
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message)) 
    }

    handleFormModal = status => this.setState({ showModal: status })

    handleEventSubmit = () => {
        this.handleFormModal(false)
        this.props.updateEventList()
    }

    isUserTheProfileOwner = () => this.props.paramId ? this.props.loggedInUser._id === this.props.paramId : false

    setOwner = eventId => {
        this.eventService
            .getEventOwner(eventId)
            .then((response) => this.setState({ owner: response.data.owner.username, ownerId: response.data._id }))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message)) 
    }

    joinEvent = (eventId, userId) => {
        this.eventService
            .joinEvent(eventId, userId)
            .then(() => this.props.updateEventList())
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message)) 
    }

    leaveEvent = (eventId, userId) => {
        this.eventService
            .leaveEvent(eventId, userId)
            .then(() => this.props.updateEventList())
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message)) 
    }

    formatDate = date => {
        const newDate = new Date(date)
        const dd = String(newDate.getDate()).padStart(2, '0')
        const mm = String(newDate.getMonth() + 1).padStart(2, '0')
        const yyyy = newDate.getFullYear()
        return `${dd}-${mm}-${yyyy}`
    }

    formatHour = date => {
        const newDate = new Date(date)
        const hh = String(newDate.getHours()).padStart(2, '0')
        const min = String(newDate.getMinutes()).padStart(2, '0')
        return `${hh}:${min}h`
    }
    obtainDateInFormat = date => {
        const newDate = new Date(date)
        const hh = String(newDate.getHours()).padStart(2, '0')
        const min = String(newDate.getMinutes()).padStart(2, '0')
        let dd = String(newDate.getDate()).padStart(2, '0')
        let mm = String(newDate.getMonth() + 1).padStart(2, '0')
        let yyyy = newDate.getFullYear()
        return `${yyyy}-${mm}-${dd}T${hh}:${min}:00`
    }
    isLive = () => {
        const today = new Date() 
        const todayFormatted = this.obtainDateInFormat(today)
        const startTime = this.obtainDateInFormat(this.props.startTime)
        const endTime = this.obtainDateInFormat(this.props.endTime)
        return startTime <= todayFormatted && endTime >= todayFormatted
    }
    isParticipating = () => this.props.loggedInUser && this.props.participants.includes(this.props.loggedInUser._id)

    render() {
        const ownerId = this.props.owner && this.props.owner._id ? this.props.owner._id : this.props.owner

        const themes = this.props.theme.map((elem, i) => <small className="btn btn-grey" key={i}>{elem}</small>)
        return (

                <Card>
                    <Card.Img className='event-card-img' variant="top" src={this.props.avatar} alt={this.props.name}/>
                    <Card.Body>
                        <Card.Title className="color-text">{this.props.name}</Card.Title>
                        <Card.Text><span className="color-text-black">Creator:</span>  {this.state.owner}  |   <span className="color-text-black">Participants:</span> {this.props.participants.length}</Card.Text>
                        <Card.Text></Card.Text>
                        <Card.Text><span className="color-text-black">City:</span> {this.props.city}</Card.Text>
                        <Card.Text> {this.formatDate(this.props.startTime)} from {this.formatHour(this.props.startTime)} to {this.formatHour(this.props.endTime)}</Card.Text>
                        <Card.Text>{themes}</Card.Text>
                        <hr></hr>
                    {this.props.loggedInUser && this.props.loggedInUser._id === ownerId &&
                            <>
                                <Button variant="danger" onClick={() => this.deleteEvent(this.props._id)}>Delete</Button>
                                <Button variant="primary" onClick={() => this.handleFormModal(true)}>Edit</Button>
                            </>
                        }
                    {this.props.loggedInUser && this.props.loggedInUser._id !== ownerId && this.props.loggedInUser.personDetails &&
                            <Button variant={this.isParticipating() ? "danger" : "primary"} onClick={() => { this.isParticipating() ? this.leaveEvent(this.props._id, this.props.loggedInUser._id) : this.joinEvent(this.props._id, this.props.loggedInUser._id) }}>{this.isParticipating() ? "Leave event" : "Join event"} </Button>
                        }
                        <Link to={`/user/${this.state.ownerId}/events/${this.props._id}`} ><Button variant="primary">More</Button></Link>

                        {this.props.loggedInUser && this.props.loggedInUser.companyDetails && !this.props.acceptedOffer &&
                            <Button onClick={() => this.handleFormModal(true)} variant="primary">Add an offer</Button>
                        }
                    {this.props.acceptedOffer && <p className="btn-active-colored">Confirmed!</p>}
                    {this.props.loggedInUser && this.props.acceptedOffer && this.isParticipating() && this.isLive() &&
                        <Link to={`/live/${this.props._id}`} ><Button variant="primary">LIVE!</Button></Link>

                    }
                        <UiModal handleModal={this.handleFormModal} show={this.state.showModal} >
                            {this.props.loggedInUser && this.props.loggedInUser.personDetails ? <EventForm eventToEdit={this.props._id} loggedInUser={this.props.loggedInUser} handleToast={this.props.handleToast} handleEventSubmit={this.handleEventSubmit} />
                            : <OfferForm event={this.props._id} loggedInUser={this.props.loggedInUser} handleToast={this.props.handleToast} handleEventSubmit={this.handleEventSubmit} />
                            }
                        </UiModal>
                    </Card.Body>
                </Card>
        )
    }
}

export default EventCard


