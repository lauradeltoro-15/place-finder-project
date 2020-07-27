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
                position => 
                    this.setState(prevState => ({
                        currentLatLng: {
                            ...prevState.currentLatLng,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }}))
            )
    }

    getKilometros = function(lat1,lon1,lat2,lon2)
    {
        console.log('coordenadas a evaluar', lat1,lon1,lat2,lon2)
    const rad = (deg)  => deg* (Math.PI/180)
    const R = 6378.137; //Radio de la tierra en km
    const dLat = rad( lat2 - lat1 );
    const dLong = rad( lon2 - lon1 );
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;
    return d*1000 //distance in m!
    }



    render() {

        this.state.confirmedEvents && console.log(`la distancia entre los puntos es de: `, this.getKilometros(40.1, 3.7, 40.100002, 3.695)) 
       
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
                                                <Map markers={this.state.confirmedEvents}/>
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