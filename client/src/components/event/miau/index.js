import React, {Component} from 'react'

import EventService from '../../../services/EventService'
import EventCard from '../card'

class EventsProfile extends Component {
    constructor (props){
        super (props)
        this.state = {
            ownedEvents: [],
            participantEvents: [],
        }
        this.eventService = new EventService()
    }

    componentDidMount = () => {
        this.setEvents(this.props.loggedInUser._id)
    }


    setEvents = userId => {
        this.eventService
            .getOwnedEvents(userId)
            .then((response) => this.setState({ownedEvents: response.data}))
            .catch(err => console.log(err))

        this.eventService
            .getParticipantEvents(userId)
            .then((response) => this.setState({participantEvents: response.data}))
            .catch(err => console.log(err))
    }

    render() {

        return (
            <>
            <h3>Your events</h3>
            {this.state.ownedEvents.length == 0 ? <h5 style={{'color' : 'white', 'padding' : '10%'}}>Nothing here yet</h5> : 
            this.state.ownedEvents.map(event => <EventCard {...this.props} loggedUserEvents={this.state.ownedEvents} paramId={this.props.paramId} loggedInUser={this.props.loggedInUser} key={event._id} {...event} />)}
            <h3>Joined events</h3>
            {this.state.participantEvents.length == 0 ? <h5 style={{'color' : 'white', 'padding' : '10%'}}>Nothing here yet</h5> :
            this.state.participantEvents.map(event => <EventCard {...this.props} loggedUserEvents={this.state.participantEvents} paramId={this.props.paramId} loggedInUser={this.props.loggedInUser}  key={event._id} {...event} />)}
     
            </>
        )
    }
}

export default EventsProfile