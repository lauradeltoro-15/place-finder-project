import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Calendar from "./calendar"

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
            offers: undefined
        }
        this.eventService = new EventService()
        this.offerService = new OfferService()
        this.localService = new LocalService()
    }
    componentDidMount = () => {
        window.scrollTo(0, 0)
        this.updateEvents()
    }

    updateEvents = () => this.props.match.params.userId ? this.getAllUserEvents(this.props.match.params.userId) :
        this.getLocalInfo(this.props.match.params.localId)

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
    render() {
        return (
            <>
                {(this.state.events || (this.state.offers && this.state.local)) ?
                    <Container as="main" className="calendar-bg">
                        <Calendar events={this.state.events} updateCalendarEvents={this.updateEvents} loggedInUser={this.props.loggedInUser} local={this.state.local} handleToast={this.props.handleToast} offers={this.state.offers} updateEvents={this.updateEvents} {...this.props} />
                    </Container> : <SpinnerContainer />
                 
                }
            </>
        )
    }
}

export default CalendarPage