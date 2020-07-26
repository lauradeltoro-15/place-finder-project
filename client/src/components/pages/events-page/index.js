import React, { Component } from 'react'

import EventService from '../../../services/EventService'
import Container from 'react-bootstrap/esm/Container'
import EventList from "./event-list/"

import Map from './map'
import "./main-page-event.css"



class EventPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: undefined,
            confirmedEvents: undefined
        }
        this.eventService = new EventService()
    }

    componentDidMount = () => this.updateEventList()

    
    

    updateEventList = () => this.getAllFutureEvents()

    getAllFutureEvents = () => {
        this.eventService
            .getAllFutureEvents()
            .then(response => this.setState({ events: response.data,
             confirmedEvents: response.data.filter(event => event.acceptedOffer)}))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message)) 
    }


    render() {
        
        return (
            <>
                {
                    !this.state.events ? <h1>Cargando</h1> :
                        <main className="main-bg">
                            <Container as="main" >
                                {/* {Aquí la searchbar TO-DO}  */}

                                <div style={{height: '400px'}}>
                                <Map events={this.state.confirmedEvents}/>
                                </div>

                                <div>
                                <EventList events={this.state.events} updateEventList={this.updateEventList} loggedInUser={this.props.loggedInUser} handleToast={this.props.handleToast}/>
                                </div>
                            </Container>
                        </main>
                }
            </>

        )
    }
}

export default EventPage