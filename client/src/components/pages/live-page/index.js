import React, {Component} from 'react'

import Carrusel from "./live-pictures"
import PictureUploader from "./live-upload"
import EventService from "../../../services/EventService"
import SpinnerContainer from '../../ui/Spinner'

class LivePage extends Component {
    constructor (props){
        super (props)
        this.state = {
            pictures: undefined
        }
        this.eventService = new EventService()
    }
    componentDidMount = () => this.updateEventInfo()
    updateEventInfo = () => {
        this.eventService
            .getAllPicturesEvent(this.props.match.params.eventId)
            .then(response => this.setState({ pictures: response.data.pictures }))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <>
                {!this.state.pictures ? <SpinnerContainer /> :
                <main>
                        <Carrusel pictures={this.state.pictures} eventId={this.props.match.params.eventId}/>
                        <PictureUploader updateEventInfo={this.updateEventInfo} eventId={this.props.match.params.eventId} />

                </main>
                
                }
             
            </>
        )
    }
}

export default LivePage