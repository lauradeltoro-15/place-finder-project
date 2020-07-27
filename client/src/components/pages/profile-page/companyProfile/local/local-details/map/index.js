import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import '../../../../../events-page/map/map.css'
import Button from 'react-bootstrap/Button'
import { Link, Redirect } from 'react-router-dom'
import './map.css'

import googleMapStyles from '../../../../../events-page/map/maps-style'


export class MapContainer extends Component {

    constructor (props){
        super (props)
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            activeLocal: {}
        }
    }

    onMarkerClick = (props, marker, e) => {

        this.setState({
            activeMarker: marker,
            showingInfoWindow: true,
            activeLocal: this.props.local
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
            className='map-cont'
            zoom={14}
            styles={this.props.mapStyle}
            initialCenter={{lat: this.props.local.location.coordinates.lat, lng: this.props.local.location.coordinates.lng}}
            >
              
                <Marker onClick={this.onMarkerClick}
                    key={this.props.local._id}
                    id={this.props.local._id}
                    icon={
                        {
                        url:"https://res.cloudinary.com/dlsnvevxk/image/upload/v1595786555/avatar/marker-1_ymeqx7.png",
                        anchor: new google.maps.Point(32,32),
                        scaledSize: new google.maps.Size(40,48)
                        }
                    }
                    position={{
                        lat: this.props.local.location.coordinates.lat,
                        lng: this.props.local.location.coordinates.lng
                    }}

                    name={this.props.local.name} />
            
            <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onInfoWindowClose}>
                
                <article className='maps-card'>

                    <article><img src={this.props.local.avatar}></img></article>
                    <h4>{this.props.local.name}</h4>
                    <span className="color-text-black">Owner:</span>  {this.props.local.owner.username}  |   <span className="color-text-black">Capacity:</span>  {this.props.local.capacity}<br></br><br></br>
                    <span className="color-text-black">Address:</span>  {this.props.local.location.address}  |  <span className="color-text-black">Description:</span>  {this.props.local.description}
                    
                </article> 
            
            </InfoWindow>
        </Map>
      );
    }
  }

MapContainer.defaultProps = googleMapStyles

export default GoogleApiWrapper({
  apiKey: "AIzaSyDY0ca9uUtMtAtYBETgl9AYh-slo_gl9eg"
})(MapContainer)

