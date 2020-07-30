import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Calendar from "./calendar"
import Button from 'react-bootstrap/Button'

import EventService from "../../../services/EventService"
import OfferService from "../../../services/OfferService"
import LocalService from "../../../services/LocalService"

import SpinnerContainer from "../../ui/Spinner"

import "./calendar-page.css"

class CalendarPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: undefined,
            offers: undefined,
            recommendations: undefined,
        }
        this.eventService = new EventService()
        this.offerService = new OfferService()
        this.localService = new LocalService()
    }
    componentDidMount = () => {
        window.scrollTo(0, 0)
        this.updateEvents()
    }

    updateEvents = () => {

        if(this.props.match.params.userId ){
            this.getPersonRecommendations(this.props.match.params.userId)
            this.getAllUserEvents(this.props.match.params.userId)
        }
        else{
            this.getLocalInfo(this.props.match.params.localId)
            this.getLocalRecommendations(this.props.match.params.localId)
        }
    }

    getAllUserEvents = id => {
        this.eventService.getAllEventsUser(id)
            .then(response => {
                this.setState({ events: response.data })})
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message)) 
    }
    getLocalInfo = id => {
        this.getAllLocalOffers(id)
        this.getLocalDetails(id)
    }
    getAllLocalOffers = id => {
        this.offerService.getAllLocalOffers(id)
            .then(response => this.setState({ offers: response.data }))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message)) 
    }
    getLocalDetails = id => {
        this.localService.getOneLocal(id)
            .then(response => this.setState({ local: response.data }))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }

    getPersonRecommendations = (userId) => {
        this.eventService
            .getRecommendations(userId)
            .then(response => this.setState({ recommendations: response.data }))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }

    getLocalRecommendations = (localId) => {
        this.eventService
            .getLocalRecommendations(localId)
            .then(response => this.setState({ recommendations: response.data }))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))

    }

    joinEvent = (eventId, userId) => {
        this.eventService
            .joinEvent(eventId, userId)
            .then(() => this.updateEvents())
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message)) 
    }

    render() {
        return (
            <>
                {(this.state.events || (this.state.offers && this.state.local)) ?
                    <Container fluid as="main">
                        <Row >
                        <Col className='recommendations' md={{span: 4}}>
                        <h3>For you <img  className='logo-heart' src='https://res.cloudinary.com/dlsnvevxk/image/upload/v1596120541/avatar/fainder-love_bz4ic5.png'></img> by <span className='logo'>fainder</span></h3>
                          <div className='recommendations-container' > {this.state.recommendations && 
                            this.state.recommendations.map((event, i) => 
                                <div className='row'>
                                <div className='events-calendar'>
                                    <div className='col-md-2'><img src={event.avatar}></img></div>
                                    <div className='col-md-7'>
                                    <h6 className='color-text'>{event.name}</h6>
                                    {event.acceptedOffer ? <span className='text-black'>Confirmed </span> : <span className='text-black'>Not confirmed </span>}    |     
                                    
                                    <span className='text-black'> Participants: </span><span className='text-small'>{event.participants.length}</span>
                                    
                                    <p className='text-small'><span className='text-black'>Theme: </span>{event.theme.map(theme => <span className='btn btn-grey'>{theme}</span>)}</p>
                                    </div>
                                    <div className='col-md-3 recommendations-button-div'>
                                    {this.props.loggedInUser.companyDetails &&
                                        <Button onClick={() => this.handleFormModal(true)} variant="primary">Add an offer</Button>
                                    }
                                    {this.props.loggedInUser.personDetails && 
                                        <Button variant='primary' onClick={() => this.joinEvent(event._id, this.props.loggedInUser._id) }> Join event </Button>
                                    }
                                    </div>   
                                </div>
                                </div>
                                )
                            } 
                            </div>
                        </Col>

                        <Col className='calendar' md={{span: 6}}>
                          <Calendar events={this.state.events} loggedInUser={this.props.loggedInUser} local={this.state.local} handleToast={this.props.handleToast} offers={this.state.offers} updateEvents={this.updateEvents} {...this.props} />
                        </Col>
                        
                        </Row>
                        
                    </Container> : <SpinnerContainer />
                 
                }
            </>
        )
    }
}

export default CalendarPage