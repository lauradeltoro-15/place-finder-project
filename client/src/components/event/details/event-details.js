import React, {Component} from 'react'

import UserService from '../../../services/UserService'
import EventCard from '../card/event-card'

class EventDetails extends Component {
    constructor (props){
        super (props)
        this.state = {
            events : []
        }
        this.userService = new UserService()
    }

    componentDidMount = () => this.updateEventList()

    updateEventList = () => {
        const id = this.props.loggedInUser._id

        this.userService
            .getPersonEvents(id)
            .then(response => this.setState({events: response.data}))
            .catch(err => console.log(err))

    }



    render () {
        return (
            <>
            {this.state.events.length == 0 ? <h1>Cargando</h1>:
            <>
                <h1>Evento</h1>  
                {this.state.events.map(event => <EventCard updateEvents={this.updateEventList} key={event._id} {...event}/>)}
            </>
            }

            </>
        )
    }
}

export default EventDetails