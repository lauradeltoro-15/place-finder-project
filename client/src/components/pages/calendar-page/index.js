import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Calendar from "./calendar"



import EventService from "../../../services/EventService"
import OfferService from "../../../services/OfferService"
import LocalService from "../../../services/LocalService"

import RecommendationList from "./recommendation-list"
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
        if (this.props.match.params.userId) {
            this.getPersonRecommendations(this.props.match.params.userId)
            this.getAllUserEvents(this.props.match.params.userId)
        }
        else {
            this.getLocalInfo(this.props.match.params.localId)
            this.getLocalRecommendations(this.props.match.params.localId)
        }
    }

    getAllUserEvents = id => {
        this.eventService.getAllEventsUser(id)
            .then(response => {
                this.setState({ events: response.data })
            })
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

    render() {
        return (
            <>
                {(this.state.events || (this.state.offers && this.state.local)) ?
                    <Container fluid as="main">
                        <Row >
                            <Col className='recommendations' md={{ span: 4, offset: 0 }}>
                                <RecommendationList updateEvents={this.updateEvents} handleToast={this.props.handleToast} recommendations={this.state.recommendations} loggedInUser={this.props.loggedInUser} />
                            </Col>
                            <Col className='calendar' md={{ span: 6 }}>
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