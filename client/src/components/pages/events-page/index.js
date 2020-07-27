import React, { Component } from 'react'

import EventService from '../../../services/EventService'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import EventList from "./event-list/"

import SpinnerContainer from "../../ui/Spinner"

import Map from './map'
import "./main-page-event.css"
import SearchBar from "./event-searchbar"


class EventPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: undefined,
            confirmedEvents: undefined,
            filteredEvents: undefined
        }
        this.eventService = new EventService()
    }

    componentDidMount = () => this.updateEventList()
   
    filterEvents = filters => {
        console.log(filters)
        let eventsCopy = [...this.state.events]
        eventsCopy = filters.name ? eventsCopy.filter(event => event.name.toLowerCase().includes(filters.name.toLowerCase())) : eventsCopy
        eventsCopy = filters.minParticipants ? eventsCopy.filter(event => event.participants.length >= filters.minParticipants) : eventsCopy
        eventsCopy = filters.maxParticipants ? eventsCopy.filter(event => event.participants.length <= filters.maxParticipants) : eventsCopy
        eventsCopy = filters.acceptedOffer ? eventsCopy.filter(event => event.acceptedOffer) : eventsCopy
        eventsCopy = filters.minDay && filters.maxDay ? eventsCopy.filter(event =>
            this.obtainDateInFormat(event.startTime) >= this.obtainDateInFormat(filters.minDay) && 
            this.obtainDateInFormat(event.startTime) <= this.obtainDateInFormat(filters.maxDay)
        ) : eventsCopy
        eventsCopy = filters.theme.length > 0 ? eventsCopy.filter(event => filters.theme.every(filter => event.theme.includes(filter))) : eventsCopy
        this.setState({ filteredEvents: eventsCopy })
    }
    obtainDateInFormat = date => {
        const newDate = new Date(date)
        let dd = String(newDate.getDate()).padStart(2, '0')
        let mm = String(newDate.getMonth() + 1).padStart(2, '0')
        let yyyy = newDate.getFullYear()
        return `${yyyy}-${mm}-${dd}`
    }
    

    updateEventList = () => this.getAllFutureEvents()

    getAllFutureEvents = () => {
        this.eventService
            .getAllFutureEvents()
            .then(response => this.setState({ events: response.data, filteredEvents: response.data, 
             confirmedEvents: response.data.filter(event => event.acceptedOffer)}))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message)) 
    }


    render() {
        
        return (
            <>
                {
                    !this.state.filteredEvents ? <SpinnerContainer/> :
                        <main className="main-bg" style={{ height: this.state.height }}>
                            <Container className='event-page-container'>
                                <SearchBar filterEvents={this.filterEvents} />
                                <div>
                                    <Row className="maps">
                                        <Col className="map-container">
                                        <center>
                                                <Map markers={this.state.confirmedEvents}/>
                                        </center>
                                        </Col>
                                    
                                    </Row>
                                </div>


                                <div>
                                    <EventList events={this.state.filteredEvents} updateEventList={this.updateEventList} loggedInUser={this.props.loggedInUser} handleToast={this.props.handleToast}/>
                                </div>
                            </Container>
                        </main>
                }
            </>
        )
    }
}

export default EventPage