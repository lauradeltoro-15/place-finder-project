import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './map.css'
import Button from 'react-bootstrap/Button'
import { Link, Redirect } from 'react-router-dom'


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
        const style = {
            position: 'relative',  
            width: '1000px',
            height: '400px'
            }
      return (
        <Map 
            google={this.props.google} 
            zoom={14}
            style={style}
            initialCenter={{lat: 40.416775, lng: -3.703790}}
            >
            {this.props.events.map(event => 
                <Marker onClick={this.onMarkerClick}
                    key={event._id}
                    id={event._id}
                    position={{
                        lat: event.acceptedOffer.local.location.coordinates.lat,
                        lng: event.acceptedOffer.local.location.coordinates.lng
                    }}
                    name={event.acceptedOffer.local.name} />
            )}
            <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onInfoWindowClose}>
                {this.state.activeEvent.owner ? 
                <div className='maps-card'>
                
                    <div><img src={this.state.activeEvent.avatar}></img></div>
                    <h4>{this.state.activeEvent.name}</h4>
                    <span className="color-text-black">Creator:</span>  {this.state.activeEvent.owner.username}  |   <span className="color-text-black">Participants:</span>  {this.state.activeEvent.participants.length}<br></br><br></br>
                    <span className="color-text-black">City:</span>  {this.state.activeEvent.city}  |  <span className="color-text-black">Local:</span>  {this.state.activeEvent.acceptedOffer.local.name}
                    {/* <Link to={`/user/${this.state.activeEvent.owner._id}/events/${this.state.activeEvent._id}`} ><Button variant="primary">More</Button></Link> */}
                    
                </div> 
                : <p>cargando</p>
                }
               
            </InfoWindow>
        </Map>
      );
    }
  }
 
export default GoogleApiWrapper({
  apiKey: "AIzaSyDY0ca9uUtMtAtYBETgl9AYh-slo_gl9eg"
})(MapContainer)

