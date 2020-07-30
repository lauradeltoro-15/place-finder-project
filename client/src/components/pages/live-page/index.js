import React, {Component} from 'react'

import Carrusel from "./live-pictures"
import PictureUploader from "./live-upload"
import EventService from "../../../services/EventService"
import SpinnerContainer from '../../ui/Spinner'
import CommentList from "./comment-list"
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
        Promise.all([this.eventService.getAllPicturesEvent(this.props.match.params.eventId), this.eventService
            .getAllCommentsEvent(this.props.match.params.eventId)])
            .then(response => this.setState({ pictures: response[0].data.pictures, comments: response[1].data.comments }))
            .catch(err => console.log(err))
    }
    render() {
        console.log(this.state)
        return (
            <>
                {this.state.pictures && this.state.comments ?
                    <main className="live-event-main">
                        <h1>See the event in LIVE!</h1>
                        {this.state.pictures.length > 0 ?
                            <Carrusel pictures={this.state.pictures} eventId={this.props.match.params.eventId} /> :
                            <p className="default-message-carrousel">There are no pictures in this event yet!</p>

                        }
                        <PictureUploader updateEventInfo={this.updateEventInfo} eventId={this.props.match.params.eventId} />
                        <CommentList comments={this.state.comments} loggedInUser={this.props.loggedInUser} eventId={this.props.match.params.eventId} updateEventInfo={this.updateEventInfo} />
                    </main>
                    : <SpinnerContainer />
                }
             
            </>
        )
    }
}

export default LivePage