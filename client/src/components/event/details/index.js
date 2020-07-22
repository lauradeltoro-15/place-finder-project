import React, {Component} from 'react'
import EventService from '../../../services/EventService'

class EventDetails extends Component {
    constructor (props){
        super (props)
        this.state = {
            eventDetails: undefined
        }
        this.eventService = new EventService()
    }

    componentDidMount = () => this.getEventDetails(this.props.match.params.eventId)

    getEventDetails = (eventId) => {
        this.eventService
            .getOneEvent(eventId)
            .then(response => this.setState({eventDetails: response.data}))
            .catch(error => console.log(error))
    }


    render () {

        return (
            <>
            {!this.state.eventDetails ? <h1>cargando</h1> : 
                <>  
                <h1>{this.state.eventDetails.name}</h1>
                <p>Description: {this.state.eventDetails.name}</p>
                <p>Date: {this.state.eventDetails.date}</p>
                <p>City: {this.state.eventDetails.city}</p>
                <p>Type of local: {this.state.eventDetails.typeOfLocal}</p>
                <p>Number of participants:{this.state.eventDetails.participants.length} </p>
                
                </>
            }
            </>
        )
    }
}

export default EventDetails