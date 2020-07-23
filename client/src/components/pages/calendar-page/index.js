import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Calendar from "./calendar"

import EventService from "../../../services/EventService"
import OfferService from "../../../services/OfferService"


class CalendarPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: undefined,
            offers: undefined
        }
        this.eventService = new EventService()
        this.offerService = new OfferService()
    }
    componentDidMount = () => this.updateEvents()

    updateEvents = () => this.props.match.params.userId ? this.getAllUserEvents(this.props.match.params.userId) :
        this.getAllLocalOffers(this.props.match.params.localId)

    getAllUserEvents = id => {
        this.eventService.getAllEventsUser(id)
            .then(response => {
                console.log(response.data)
                this.setState({ events: response.data })
            })
            .catch(err => console.log(err))
    }

    getAllLocalOffers = (id) => {
        
        this.offerService.getAllLocalOffers(id)
            .then(response => this.setState({ offers: response.data }))
            .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.events)
        return (
            <>
                {(this.state.events || this.state.offers) &&
                    <Container as="main">
                        <Calendar events={this.state.events} offers={this.state.offers} {...this.props} />
                    </Container>
                }
            </>
        )
    }
}

export default CalendarPage