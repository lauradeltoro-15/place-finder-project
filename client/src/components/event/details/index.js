import React, {Component} from 'react'

import EventService from '../../../services/EventService'
import EventCard from '../card'

class EventDetails extends Component {
    constructor (props){
        super (props)
        this.state = {
            events : []
        }
        this.eventService = new EventService()
    }

    componentDidMount = () => this.updateEventList()

    updateEventList = () => {
        const id = this.props.loggedInUser._id

        this.eventService
            .getPersonEvents(id)
            .then(response => this.setState({events: response.data}))
            .catch(err => console.log(err))

    }



    render () {
        return (
            <>
            {this.state.events.length == 0 ? <h4 style={{'color' : 'white', 'padding' : '10%'}}>Nothing here yet</h4> : 
            <>
     
                {this.state.events.map(event => <EventCard updateEvents={this.updateEventList} key={event._id} {...event}/>)}
            </>
            }

            </>
        )
    }
}

export default EventDetails