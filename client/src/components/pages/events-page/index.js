import React, { Component } from 'react'

import EventService from '../../../services/EventService'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import EventList from "./event-list/"

import SpinnerContainer from "../../ui/Spinner"

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import Map from './map'
import "./main-page-event.css"



class EventPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: undefined,
            confirmedEvents: undefined,
            currentLatLng: {
                lat: undefined,
                lng: undefined
              },
        }
        this.eventService = new EventService()
    }

    componentDidMount = () => {
        this.updateEventList()

   this.getGeoLocation()
    
    }
    

    updateEventList = () => this.getAllFutureEvents()

    getAllFutureEvents = () => {
        this.eventService
            .getAllFutureEvents()
            .then(response => this.setState({ events: response.data,
             confirmedEvents: response.data.filter(event => event.acceptedOffer)}))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message)) 
    }



    getGeoLocation = () => {

        navigator.geolocation.getCurrentPosition(
                position => {
                    console.log('entro', position.coords);
                    this.setState(prevState => ({
                        currentLatLng: {
                            ...prevState.currentLatLng,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    }))
                }
            )
  
    }


    render() {

        console.log('el estado', this.state)
        
        return (
            <>
                {
                    !this.state.events ? <SpinnerContainer/> :
                        <main className="main-bg" style={{ height: this.state.height }}>
                            <Container className='event-page-container'>
                                {/* {Aquí la searchbar TO-DO}  */}
                                <div>
                                    <Row className="maps">
                                        <Col className="map-container">
                                        <center>
                                                <Map events={this.state.confirmedEvents}/>
                                        </center>
                                        </Col>
                                    
                                    </Row>
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