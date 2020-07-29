/*global google*/

import React, {Component} from 'react'
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    DirectionsRenderer,
    Marker
  } from "react-google-maps";

import '../../../../../../events-page/map/map.css'
import '../map.css'
import mapStyle from './maps-style'


class Directions extends Component {

    constructor (props){
        super (props)
        this.state = {
            currentLatLng: {
                lat: undefined,
                lng: undefined
            },
            directions: undefined,

        }
    }

    render() {
            
            const GoogleMapExample = 
                withGoogleMap(
                    (props) => (
                    <GoogleMap 
                        options={{styles: this.props.mapStyle}}
                        className='map-cont'
                        zoom={14}
                        initialCenter={this.props.location}
                    >
                        <DirectionsRenderer 
                            directions={this.props.directions}
                            options={{
                                suppressMarkers: true,
                                polylineOptions: {
                                        strokeColor: '#49B5C5',
                                        strokeWeight: 4
                                    }
                            }}
                        />    
                        <Marker
                            icon={{
                                anchor: new google.maps.Point(32,32),
                                scaledSize: new google.maps.Size(40,48),
                                url: 'https://res.cloudinary.com/dlsnvevxk/image/upload/v1595786555/avatar/marker-1_ymeqx7.png'
                                
                            }}
                            position={this.props.local.location.coordinates}
                        />
                        <Marker
                            icon={{
                                anchor: new google.maps.Point(32,32),
                                scaledSize: new google.maps.Size(40,48),
                                url: 'https://res.cloudinary.com/dlsnvevxk/image/upload/v1596050590/avatar/marker-person_ymc8up.png'
                            }}
                            position={this.props.location}
                        />                    
                    </GoogleMap>
            ))
            

      return (
          <>
          {!this.props.directions ? <h2>cargando</h2> :
            <GoogleMapExample
                containerElement={
                  <div style={{ height: `500px`, width: "100%" }} />
                }
                mapElement={<div style={{ height: `100%` }} />}
              />
                
            }
            </>
      )
      
    }

  }
  Directions.defaultProps = mapStyle

  export default Directions


