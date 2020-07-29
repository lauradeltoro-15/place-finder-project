/*global google*/

import React, { Component } from 'react'

import LocalService from "../../../../../../services/LocalService"
import { Link } from 'react-router-dom'
import './local-det.css'

import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import Map from "./map/Static/index"
import Directions from './map/Directions'

import SpinnerContainer from "../../../../../ui/Spinner"

class LocalDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            directions: undefined,
            local: undefined,
            showDirections: false,
            travelMode: undefined,
            currentLatLng: {
                lat: undefined,
                lng: undefined
            }
        }
        this.localService = new LocalService()
    }
    componentDidMount = () => {
        window.scrollTo(0, 0)
        const id = this.props.match.params.localId
        this.getLocalDetails(id)
        this.getGeoLocation()
    }

    componentDidUpdate = (prevProps, prevState)  =>{
        this.state.travelMode !== prevState.travelMode && this.render()
    }

    getLocalDetails = id => {
        this.localService.getOneLocal(id)
            .then(response => this.setState({ local: response.data }))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }
    isUserOwner = () => this.props.loggedInUser && this.props.match.params.id === this.props.loggedInUser._id

    setDirections = (showDirections, travelMode) => {
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
            {
                origin: new google.maps.LatLng(this.state.currentLatLng.lat, this.state.currentLatLng.lng),
                destination: new google.maps.LatLng(this.state.local.location.coordinates.lat, this.state.local.location.coordinates.lng),
                travelMode: google.maps.TravelMode[travelMode]
            },
            (result, status) => {

                if (status ===  google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                        travelMode: travelMode,
                        showDirections: showDirections
                    })

                } else {
                    console.error(`error fetching directions ${result}`)
                }
            }
        )
    }

    getGeoLocation = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
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
        
        console.log('rendedirng local details')
        return (
            <>
                {!this.state.local ? <SpinnerContainer/> :
                    <Container fluid as="main" className='main-cont' >
                        <Row>
                            <Col md={{ span: 5, offset: 1 }} className='content'>
                                <h1 className='color-text'>{this.state.local.name}</h1>
                                <span className="color-text-black">Owner: </span> {this.state.local.owner.username}
                                <br></br>
                                <br></br>
                                <span className="color-text-black">Description: </span> {this.state.local.description}
                                <br></br>
                                <br></br>
                                <span className="color-text-black">Capacity: </span> {this.state.local.capacity}
                                <br></br>
                                <br></br>
                                <span className="color-text-black">Location: </span> {this.state.local.location.address}
                                <br></br>
                                <hr></hr>
                                <h5>Facilities</h5>
                                {this.state.local.facilities.map((facility, i) => <small className="btn btn-grey" key={i}>{facility}</small>)}
                                <hr></hr>
                                <h5 className='color-text-black'>Services</h5>
                                {this.state.local.services.map((service, i) => <small className="btn btn-grey" key={i}>{service}</small>)}
                            </Col>
                            <Col className='img-local' md={{ span: 5, offset: 1 }}>
                                <img src={this.state.local.avatar} alt={ this.state.local.name }/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                    <Button onClick={()=>this.setDirections(false, undefined)}>Local</Button>
                                    <Button onClick={()=>this.setDirections(true, 'WALKING')}>Walking</Button>
                                    <Button onClick={()=>this.setDirections(true, 'TRANSIT')}>Public transport</Button>
                                    <Button onClick={()=>this.setDirections(true, 'DRIVING')}>Driving</Button>
    
                            </Col>
                        </Row>
                        <Row className="maps">
                            <Col md={{span: 8, offset: 2}} className="map-container">
                                    {!this.state.showDirections && <Map local={this.state.local} />}
                                    {this.state.directions && this.state.showDirections && this.state.currentLatLng.lat && <Directions directions={this.state.directions} location={this.state.currentLatLng} local={this.state.local} travelMode={this.state.travelMode}/>}  
                            
                            
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 2, offset: 5 }}>
                                {this.isUserOwner() &&
                                    <Link to={`/user/${this.state.local.owner._id}/local/${this.state.local._id}/edit`} className="btn btn-dark btn-block btn-sm local-btn">Edit local</Link>
                                }
                            </Col>
                        </Row>
                    </Container>
                }
            </>
        )
    }
}

export default LocalDetail