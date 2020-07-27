import React, {Component} from 'react'

import EventService from '../../../../services/EventService'
import EventCard from './card'

import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

class  EventList extends Component {
    constructor (props){
        super (props)
        this.state = {
        }
        this.eventService = new EventService()
    }
    render() {
        return (
            <Row as="section" className="row-card-container">
                {this.props.events.map(event => <Col md={4}><EventCard {...this.props} updateEventList={this.props.updateEventList} loggedInUser={this.props.loggedInUser} key={event._id} {...event} /></Col>)}
            </Row>
        )
    }
}

export default EventList