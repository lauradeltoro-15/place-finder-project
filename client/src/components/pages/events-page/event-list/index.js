import React, {Component} from 'react'

import EventService from '../../../../services/EventService'
import EventCard from './card'

import Row from 'react-bootstrap/esm/Row'

class  EventList extends Component {
    constructor (props){
        super (props)
        this.state = {
        }
        this.eventService = new EventService()
    }


    render() {

        return (
            <Row as="section">
                    {this.props.events.map(event => <EventCard {...this.props} updateEventList={this.props.updateEventList} loggedInUser={this.props.loggedInUser} key={event._id} {...event} />)}
            </Row>
        )
    }
}

export default EventList