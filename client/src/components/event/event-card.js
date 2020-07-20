import { Link, Redirect } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import UserService from '../../services/UserService'

import React, {Component} from 'react'

class EventCard extends Component {
    constructor (props){
        super (props)
        this.state = {}
        this.userService = new UserService()
    }

    deleteEvent = eventId =>{
        this.userService
            .deleteEvent(eventId)
            .then(() => this.props.updateEvents())
            .catch(err => console.log(err))
    }
    
    
    render () {

        return (
            <>
            <Col md={4}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Subtitle>City:{this.props.city}</Card.Subtitle>
                    <Card.Text>Date: {this.props.date}</Card.Text>
                    <Card.Text>Type of Local: {this.props.typeOfLocal}</Card.Text>
                    <Card.Text>Description: {this.props.description}</Card.Text>

                    <Link to={`/event/edit/${this.props._id}`} ><Button variant="primary">Edit</Button></Link>
                    <Button variant="primary" onClick={() => this.deleteEvent(this.props._id) && <Redirect to='/profile'/>  }>Delete</Button>
                </Card.Body>
            </Card>
            </Col>
 
            </>
        )
    }
}

export default EventCard
