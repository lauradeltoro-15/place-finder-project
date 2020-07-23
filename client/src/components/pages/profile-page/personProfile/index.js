import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import EventList from '../../../pages/events-page/event-list'
import EventService from "../../../../services/EventService"

//Boostrap
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/esm/Row'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: undefined
        }
        this.eventService = new EventService()
    }
    componentDidMount = () => this.updateEventList()

    updateEventList = () => this.getProfileUserEvents(this.props.paramId)

    getProfileUserEvents = userId => {
        this.eventService.
            getAllEventsUser(userId)
            .then(response => this.setState({ events: response.data }))
            .catch(err => console.log(err))
    }

    isUserTheProfileOwner = () => this.props.loggedInUser._id === this.props.paramId

    filterEvents = role =>
        !this.state.events ? null : role === "owner" ?
        this.state.events.filter(event => event.owner === this.props.paramId) :
        this.state.events.filter(event => event.participants.includes(this.props.paramId) && event.owner !== this.props.paramId) 
    
    render() {
        return (
            <>
                {!this.state.events ? <h1>Cargando</h1> :
                    <section>
                        <h1>Username: {this.props.userDetails.username}</h1>
                        <hr></hr>
                        <h5>Age</h5>
                        {this.props.userDetails.personDetails.age}
                        <hr></hr>
                        <h5>Genre</h5>
                        {this.props.userDetails.personDetails.genre}
                        <hr></hr>
                        <h5>Interests:</h5>
                        {this.props.userDetails.personDetails.interests.map((hobbie, i) => <h6 key={i}>{hobbie}</h6>)}
                        <hr></hr>
                        <h1>Created events</h1>
                        <EventList loggedInUser={this.props.loggedInUser} updateEventList={this.updateEventList} {...this.props} events={this.filterEvents("owner")} paramId={this.props.paramId} />
                        <h1>Joined events</h1>
                        <EventList loggedInUser={this.props.loggedInUser} updateEventList={this.updateEventList} {...this.props} events={this.filterEvents("participant")} paramId={this.props.paramId} />

                        {this.isUserTheProfileOwner() &&
                            <>
                                <Link to={`/profile/edit/${this.props.loggedInUser._id}`} ><Button variant="dark" type="submit">Edit</Button></Link>
                                <Link to={`/user/${this.props.loggedInUser._id}/event/create`} ><Button variant="dark" type="submit">Create a new event</Button></Link>
                                <Link to={`/profile/${this.props.loggedInUser._id}/calendar`} ><Button variant="dark" type="submit">See your calendar</Button></Link>
                            </>
                        }
                    </section>
                }
            </>
        )
    }
}

export default Profile