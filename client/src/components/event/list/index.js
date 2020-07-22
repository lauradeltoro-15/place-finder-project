import React, {Component} from 'react'

import EventService from '../../../services/EventService'
import EventCard from '../card'
import Container from 'react-bootstrap/esm/Container'

class  EventList extends Component {
    constructor (props){
        super (props)
        this.state = {
            events: undefined,
        }
        this.eventService = new EventService()
    }

    componentDidMount = () => this.updateEventList()

    updateEventList = () => this.props.loggedInUser ? this.setEvents(this.props.loggedInUser._id) : this.setEvents()

    getAllEvents = () => {
        this.eventService
            .getAllEvents()
            .then(response => this.setState({ events: response.data }))
            .catch(err => console.log(err)) 
    }

    getLoggedUserEvents = userId => {
        this.eventService.
            getAllEventsUser(userId)
            .then(response => this.setState({ events: response.data }))
            .catch(err => console.log(err)) 
    }

    setEvents = userId => this.props.location.pathname === "/events" ? this.getAllEvents() : this.getLoggedUserEvents(userId)
    
    filterEvents = () => {
        return this.props.list === "ownedEvents" ?
                this.state.events.filter(event => event.owner === this.props.loggedInUser._id) :
                this.props.list === "participantEvents" ?
                this.state.events.filter(event => event.participants.includes(this.props.loggedInUser._id) && event.owner !== this.props.loggedInUser._id) :
                this.state.events
    }

    render() {
        const events = this.state.events && this.filterEvents()
        return (
            <>
                {events &&
                <Container as='div'>
                    {events.map(event => <EventCard {...this.props} updateEventList={this.updateEventList} loggedInUser={this.props.loggedInUser} key={event._id} {...event} />)}
                </Container>}
            </>
        )
    }
}

export default EventList