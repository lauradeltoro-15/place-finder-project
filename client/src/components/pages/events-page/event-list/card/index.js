import { Link, Redirect } from 'react-router-dom'

import Col from 'react-bootstrap/esm/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import EventService from '../../../../../services/EventService'

import React, { Component } from 'react'

class EventCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            owner: undefined,
            ownerId: undefined,
            buttons: undefined,
        }
        this.eventService = new EventService()
    }

    componentDidMount = () => this.setOwner(this.props._id)

    deleteEvent = eventId => {
        this.eventService
            .deleteEvent(eventId)
            .then(() => this.props.updateEventList())
            .catch(err => console.log(err))
    }

    isUserTheProfileOwner = () => this.props.paramId ? this.props.loggedInUser._id === this.props.paramId : false

    setOwner = eventId => {
        this.eventService
            .getEventOwner(eventId)
            .then((response) => this.setState({ owner: response.data.owner.username, ownerId: response.data._id }))
            .catch(err => console.log(err))
    }

    joinEvent = (eventId, userId) => {
        this.eventService
            .joinEvent(eventId, userId)
            .then(() => this.props.updateEventList())
            .catch(err => console.log(err))
    }

    leaveEvent = (eventId, userId) => {
        this.eventService
            .leaveEvent(eventId, userId)
            .then(() => this.props.updateEventList())
            .catch(err => console.log(err))
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
    isParticipating = () => this.props.loggedInUser && this.props.participants.includes(this.props.loggedInUser._id)
    
    render() {

        return (
            <Col md={4}>
                <Card>
                    <Card.Img variant="top" src={this.props.image} />
                    <Card.Body>
                        <Card.Title>{this.props.name}</Card.Title>
                        <Card.Subtitle>Creator: {this.state.owner}</Card.Subtitle>
                        <Card.Text>Participants: <span className="color-text">{this.props.participants.length}</span></Card.Text>
                        <Card.Text>City: {this.props.city}</Card.Text>
                        <Card.Text>Date: {this.formatDate(this.props.startTime)}</Card.Text>
                        <Card.Text>From: {this.formatHour(this.props.startTime)} To: {this.formatHour(this.props.endTime)}</Card.Text>
                        <Card.Text>Type of Local: {this.props.typeOfLocal}</Card.Text>
                        {this.props.loggedInUser && this.props.loggedInUser._id === this.props.owner &&
                            <>
                                <Button variant="primary" onClick={() => this.deleteEvent(this.props._id) && <Redirect to='/profile' />}>Delete</Button>
                                <Link to={`/user/${this.props.loggedInUser._id}/event/edit/${this.props._id}`} ><Button variant="primary">Edit</Button></Link>
                            </>
                        }
                        {this.props.loggedInUser && this.props.loggedInUser._id !== this.props.owner && this.props.loggedInUser.personDetails &&
                            <Button variant={this.isParticipating() ? "danger" : "primary"} onClick={() => { this.isParticipating() ? this.leaveEvent(this.props._id, this.props.loggedInUser._id) : this.joinEvent(this.props._id, this.props.loggedInUser._id) }}>{this.isParticipating() ? "Leave event" : "Join event"} </Button>
                        }
                        <Link to={`/user/${this.state.ownerId}/events/${this.props._id}`} ><Button variant="primary">More</Button></Link>
                        
                        {this.props.loggedInUser && this.props.loggedInUser.companyDetails &&
                            <Link to={`/user/${this.state.ownerId}/event/${this.props._id}/offer/add`} ><Button variant="primary">Add an offer</Button></Link>
                        }

                    </Card.Body>
                </Card>
            </Col>
        )
    }
}

export default EventCard


