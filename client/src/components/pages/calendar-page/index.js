import React, {Component} from 'react'

import Container from 'react-bootstrap/Container'
import Calendar from "./calendar"
import EventService from "../../../services/EventService"


class CalendarPage extends Component {
    constructor (props){
        super (props)
        this.state = {
            events: []
        }
        this.eventService = new EventService()
    }
    componentDidMount = () => {
        console.log(this.props)
        const id = this.props.match.params.userId
        this.eventService.getAllEventsUser(id)
            .then(response => this.setState({ events: response.data }))
            .catch(err => console.log(err))
    }

    render() {  
        return (
            <>
                { this.state.events.length > 0 &&
                    <Container as="main">
                        <Calendar events={this.state.events} {...this.props}/>
                    </Container>
                }
            </> 
        )
    }
}

export default CalendarPage