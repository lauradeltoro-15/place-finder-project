import React, { Component } from 'react'

import EventService from '../../../../services/EventService'
import OfferService from '../../../../services/OfferService'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import './event-det.css'

import OffersList from "./offers-list"

class EventDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            eventDetails: undefined,
            owner: undefined
        }
        this.eventService = new EventService()
        this.offerService = new OfferService()
    }

    componentDidMount = () => this.updateState(this.props.match.params.eventId, this.props.match.params.userId)
    updateState = (eventId, userId) => {

        this.eventService
            .getOneEvent(eventId)
            .then(response => this.setState({ eventDetails: response.data }))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message)) 

        this.eventService
            .getEventOwner(userId)
            .then((response) => this.setState({ owner: response.data.owner.username }))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))     
    }
    render() {
        return (
           
            <>
                {!this.state.eventDetails ? <h1>cargando</h1> :
        
                    <>
                        <Container fluid className='main-cont'>
                            <Row>
                                <Col md={{ span: 5, offset: 1 }} className='content'>
                                    <h1 className='color-text'>{this.state.eventDetails.name}</h1>

                                    <span className="color-text-black">Creator: </span> {this.state.owner}
                                    <br></br>
                                    <br></br>
                                    <span className="color-text-black">Start Time: </span> {this.state.eventDetails.startTime}  |   
                                    <span className="color-text-black">  End Time: </span> {this.state.eventDetails.endTime}
                                    <br></br>
                                    <br></br>
                                    <span className="color-text-black">Description: </span> {this.state.eventDetails.name}
                                    <br></br>
                                    <br></br>
                                    <span className="color-text-black">City: </span> {this.state.eventDetails.city}
                                    <br></br>
                                    <br></br>
                                    <span className="color-text-black">Type of local: </span> {this.state.eventDetails.typeOfLocal}
                                    <br></br>
                                    <br></br>
                                    <span className="color-text-black">Participants: </span> {this.state.eventDetails.participants.length}
                                    <br></br>
                                    <hr></hr>
                                    <h5>Theme</h5>
                            
                                        {this.state.eventDetails.theme.map((theme, i) => <small className="btn btn-grey" key={i}>{theme}</small>)}

                                </Col>

                                <Col className='img-event' md={{span: 5, offset: 1}}>
                                    <img src={this.state.eventDetails.avatar} />
                                </Col>

                            </Row>

                            <Row>
                            <Col md={{ span: 10, offset: 1 }} class>
                            {this.state.eventDetails.acceptedOffer && this.state.eventDetails.acceptedOffer.local? 
                                    <>
                                        <h2 className='color-text'>Local details</h2>
                                        <span className="color-text-black">Owner: </span> {this.state.eventDetails.acceptedOffer.local.owner.username}  |   
                                        <span className="color-text-black"> City: </span> {this.state.eventDetails.city}
                                        <br></br>
                                        <br></br>

                                        <span className="color-text-black">Description: </span> {this.state.eventDetails.name}
                                        <br></br>
                                        <br></br>
                                        <p>Price per person: {this.state.eventDetails.acceptedOffer.price}</p>
                                        <p>Local: {this.state.eventDetails.acceptedOffer.local.name}</p>

                                        <p>Address: {this.state.eventDetails.acceptedOffer.local.location.address}</p>
                                        <p>Capacity: {this.state.eventDetails.acceptedOffer.local.capacity}</p>
                                        <p>Facilities: </p>
                                        <ul>
                                        {this.state.eventDetails.acceptedOffer.local.facilities.map(facility => <li>{facility}</li>)}
                                        </ul>
                                        <p>Services: </p>
                                        <ul>
                                        {this.state.eventDetails.acceptedOffer.local.services.map(service => <li>{service}</li>)}
                                        </ul>
                                    </>
                                    :
                                    <p>This event has no local yet</p>
                                    }
                            </Col>
                            </Row>
                            
            
                            <OffersList loggedInUser={this.props.loggedInUser} event={this.state.eventDetails} eventId={this.props.match.params.eventId} handleToast={this.props.handleToast}/>
                        
                            
                        </Container>
                    </>
                }
            </>
        )
    }
}

export default EventDetails