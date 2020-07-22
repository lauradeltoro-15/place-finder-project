import React, {Component} from 'react'

import Container from 'react-bootstrap/Container'
import Calendar from "./calendar"

import EventService from "../../services/EventService"

class CalendarPage extends Component {
    constructor (props){
        super (props)
        this.state = {
            events: []
        }
        this.eventService = new EventService()
    }
    componentDidMount = () => {
        const id = this.props.match.params.userId
    
        this.eventService.getAllEventsUser(id)
            .then(response => this.setState({ events: response.data }))
            .catch(err => console.log(err))
    }
    obtainDateInFormat = date => {
        let newDate = new Date(date)
        const dd = String(newDate.getDate()).padStart(2, '0')
        const mm = String(newDate.getMonth() + 1).padStart(2, '0')
        const yyyy = newDate.getFullYear()
        newDate = yyyy + '-' + mm + '-' + dd
        return newDate
    }
    render() {
        console.log(this.state.events)
        const formattedEvents = this.state.events.length > 0 && this.state.events.map(event => { return { title: event.name, date: this.obtainDateInFormat(event.date) } })
        console.log(formattedEvents)

        
        return (
            <>
                { this.state.events.length > 0 &&
                    <Container as="main">
                    <Calendar events={formattedEvents}/>
                    </Container>
                }
            </> 
        )
    }
}

export default CalendarPage