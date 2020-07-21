import React, {Component} from 'react'

import EventService from '../../../services/EventService'
import EventCard from '../card'
import Container from 'react-bootstrap/esm/Container'


class  EventList extends Component {
    constructor (){
        super ()
        this.state = {
            events: undefined
        }
        this.eventService = new EventService()
    }

    componentDidMount = () => this.updateEventList()
    updateEventList = () => {
        this.eventService
            .getAllEvents()
            .then(response => this.setState({ events: response.data }))
            .catch(err => console.log(err))
    }
    render () {
        return (
            <>
                {!this.state.events ? <h1>cargando</h1>: 
                    <Container as='div'>
                        {this.state.events.map(event => <EventCard key={event._id} {...event}/>)}
                    </Container>
                }

            </>
        )
    }
}

export default EventList