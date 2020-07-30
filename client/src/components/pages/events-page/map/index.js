import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './map.css'
import SpinnerContainer from '../../../ui/Spinner'

import googleMapStyles from "./maps-style"


export class MapContainer extends Component {

    constructor (props){
        super (props)
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            activeEvent: {},
            defaultLocation: {lat: 40.416775, lng: -3.703790}
        }
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            activeMarker: marker,
            showingInfoWindow: true,
            activeEvent: this.props.markers.filter(event => event._id === marker.id)[0]
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
      const center = this.props.currentLocation.lat ? this.props.currentLocation : this.state.defaultLocation
      return (
        <Map 
            google={this.props.google} 
            
            zoom={14}
            styles={this.props.mapStyle}
            initialCenter={center}
            >
              {this.props.markers.map(marker => 
                <Marker onClick={this.onMarkerClick}
                    key={marker._id}
                    id={marker._id}
                    icon={
                        {
                        url:"https://res.cloudinary.com/dlsnvevxk/image/upload/v1595786555/avatar/marker-1_ymeqx7.png",
                        anchor: new google.maps.Point(32,32),
                        scaledSize: new google.maps.Size(40,48)
                        }
                    }
                    position={{
                        lat: marker.acceptedOffer.local.location.coordinates.lat,
                        lng: marker.acceptedOffer.local.location.coordinates.lng
                    }}

                    name={marker.acceptedOffer.local.name} />
            )}
            <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onInfoWindowClose}>
                {this.state.activeEvent.owner ? 
                <article className='maps-card'>

                          <article><img src={this.state.activeEvent.avatar} alt={this.state.activeEvent.name }></img></article>
                    <h4>{this.state.activeEvent.name}</h4>
                    <span className="color-text-black">Creator:</span>  {this.state.activeEvent.owner.username}  |   <span className="color-text-black">Participants:</span>  {this.state.activeEvent.participants.length}<br></br><br></br>
                    <span className="color-text-black">City:</span>  {this.state.activeEvent.city}  |  <span className="color-text-black">Local:</span>  {this.state.activeEvent.acceptedOffer.local.name}
                    
                </article> 
                : <SpinnerContainer />
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

