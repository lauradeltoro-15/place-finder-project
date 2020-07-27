import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './map.css'
import Button from 'react-bootstrap/Button'
import { Link, Redirect } from 'react-router-dom'


import googleMapStyles from "./maps-style"


export class MapContainer extends Component {

    constructor (props){
        super (props)
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            activeEvent: {}
        }
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            activeMarker: marker,
            showingInfoWindow: true,
            activeEvent: this.props.events.filter(event => event._id == marker.id)[0]
        })
        
    };

    onInfoWindowClose = () => {
        this.setState({
            activeMarker: {},
            showingInfoWindow: false
        })
    }

    render() {
      const {google} = this.props
      return (
        <Map 
            google={this.props.google} 
            
            zoom={14}
            styles={this.props.mapStyle}
            initialCenter={{lat: 40.416775, lng: -3.703790}}
            >
            {this.props.events.map(event => 
                <Marker onClick={this.onMarkerClick}
                    key={event._id}
                    id={event._id}
                    icon={
                        {
                        url:"https://res.cloudinary.com/dlsnvevxk/image/upload/v1595786555/avatar/marker-1_ymeqx7.png",
                        anchor: new google.maps.Point(32,32),
                        scaledSize: new google.maps.Size(32,40)
                        }
                    }
                    position={{
                        lat: event.acceptedOffer.local.location.coordinates.lat,
                        lng: event.acceptedOffer.local.location.coordinates.lng
                    }}
                    name={event.acceptedOffer.local.name} />
            )}
            <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onInfoWindowClose}>
                {this.state.activeEvent.owner ? 
                <article className='maps-card'>

                    <article><img src={this.state.activeEvent.avatar}></img></article>
                    <h4>{this.state.activeEvent.name}</h4>
                    <span className="color-text-black">Creator:</span>  {this.state.activeEvent.owner.username}  |   <span className="color-text-black">Participants:</span>  {this.state.activeEvent.participants.length}<br></br><br></br>
                    <span className="color-text-black">City:</span>  {this.state.activeEvent.city}  |  <span className="color-text-black">Local:</span>  {this.state.activeEvent.acceptedOffer.local.name}
                    {/* <Link to={`/user/${this.state.activeEvent.owner._id}/events/${this.state.activeEvent._id}`} ><Button variant="primary">More</Button></Link> */}
                    
                </article> 
                : <p>cargando</p>
                }
               
            </InfoWindow>
        </Map>
      );
    }
  }

MapContainer.defaultProps = googleMapStyles

export default GoogleApiWrapper({
  apiKey: "AIzaSyDY0ca9uUtMtAtYBETgl9AYh-slo_gl9eg"
})(MapContainer)

