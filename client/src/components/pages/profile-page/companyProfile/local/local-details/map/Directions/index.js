/*global google*/

import React, {Component} from 'react'
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    DirectionsRenderer
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

    // getTravelMode = () => {

    //     let travelModeAux
    //     if(this.props.travelMode == "WALKING") {
    //         travelModeAux = google.maps.TravelMode.WALKING
    //     } else if (this.props.travelMode == 'TRANSIT') {
    //         travelModeAux = google.maps.TravelMode.TRANSIT
    //     } else{
    //         travelModeAux = google.maps.TravelMode.DRIVING
    //     }
    //     return travelModeAux
    // }

    // getGeoLocation = () => {
    //     navigator.geolocation.getCurrentPosition(
    //         position => {
    //             this.setState(prevState => ({
    //                 currentLatLng: {
    //                     ...prevState.currentLatLng,
    //                     lat: position.coords.latitude,
    //                     lng: position.coords.longitude
    //                 }
    //             }))
    //         }
    //     )
    // }


    render() {
            console.log("RERENDERING", this.props)
            console.log('el estado', this.state)
            
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


