import { Link, Redirect } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import EventService from '../../../services/EventService'

import React, {Component} from 'react'

class EventCard extends Component {
    constructor (props){
        super (props)
        this.state = {
            owner: undefined,
            buttons: undefined
        }
        this.eventService = new EventService()
    }

    componentDidMount = () => {
        this.setOwner(this.props._id)
    }

    deleteEvent = eventId =>{
        this.eventService
            .deleteEvent(eventId)
            .then(() => this.props.updateEvents())
            .catch(err => console.log(err))
    }
    
    isUserTheProfileOwner = () =>  this.props.paramId ? this.props.loggedInUser._id === this.props.paramId : false

    setOwner = eventId => {
        this.eventService
            .getEventOwner(eventId)
            .then((response) => this.setState({owner: response.data.owner.username}))
            .catch(err => console.log(err))
    }

    joinEvent = (eventId, userId) => {
        this.eventService
            .joinEvent(eventId, userId)
            .then(()=> this.redirectOrUpdate())
            .catch(err => console.log(err))
    }

    leaveEvent = (eventId, userId) => {
        this.eventService
            .leaveEvent(eventId, userId)
            .then(()=> this.redirectOrUpdate())
            .catch(err => console.log(err))
    }

    redirectOrUpdate = () => {
        console.log(this.props)
        console.log('boolean', this.props.location.pathname.includes("profile"))
        let path = '/profile/'+ this.props.loggedInUser._id
        console.log(path)
        return this.props.location.pathname.includes("profile") ? this.props.history.push(path) : this.props.updateEventList()
    }
    
    setButtons = () => {
        if (!this.props.loggedInUser) return

        if (this.props.owner == this.props.loggedInUser._id) {
            this.state.buttons = 
            <>
            <Button variant="primary" onClick={() => this.deleteEvent(this.props._id) && <Redirect to='/profile' />}>Delete</Button>
            <Link to={`/user/${this.props.loggedInUser._id}/event/edit/${this.props._id}`} ><Button variant="primary">Edit</Button></Link>
            </>;
        } else if(this.props.loggedUserEvents.map(event => event._id).includes(this.props._id)){
            this.state.buttons = 
            <Button variant="danger" onClick={() => {this.leaveEvent(this.props._id, this.props.loggedInUser._id) && this.redirectOrUpdate()}}>Leave Event </Button>
        } else {
            this.state.buttons = 
            <Button variant="primary" onClick={() => {this.joinEvent(this.props._id, this.props.loggedInUser._id) && this.redirectOrUpdate()}}>Join Event</Button>
        }
    }

    render() {
        this.setButtons()
        return (
            <>
            <Col md={4}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Subtitle>Creator: {this.state.owner}</Card.Subtitle>
                    <Card.Text>Participants:{this.props.participants.length}</Card.Text>
                    <Card.Text>City:{this.props.city}</Card.Text>
                    <Card.Text>Date: {this.props.date}</Card.Text>
                    <Card.Text>Type of Local: {this.props.typeOfLocal}</Card.Text>
                    <Card.Text>Description: {this.props.description}</Card.Text>
                    {!this.props.owner ? <h2>cargando</h2>
                    :
                    this.state.buttons 
                    }
                    <Link to={`/events/${this.props._id}`} ><Button variant="primary">See details</Button></Link>
                    
                </Card.Body>
            </Card>
            </Col>
 
            </>
        )
    }
}

export default EventCard


