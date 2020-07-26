import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import EventList from '../../../pages/events-page/event-list'
import EventService from "../../../../services/EventService"
import UiModal from "../../../ui/Modal" 
import EventForm from "../../events-page/event-form"

//Boostrap
import Button from 'react-bootstrap/Button'

import "./profile.css"
class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: undefined,
            showModal: false,
        }
        this.eventService = new EventService()
    }
    componentDidMount = () => this.updateEventList()


    updateEventList = () => this.getProfileUserEvents(this.props.paramId)
    
    handleFormModal = status => this.setState({ showModal: status })
    handleEventSubmit = () => {
        this.handleFormModal(false)
        this.updateEventList()
    }

    getProfileUserEvents = userId => {
        this.eventService.
            getAllFutureUserEvents(userId)
            .then(response => this.setState({ events: response.data }))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }

    isUserTheProfileOwner = () => this.props.loggedInUser._id === this.props.paramId

    filterEvents = role =>
        !this.state.events ? null : role === "owner" ?
        this.state.events.filter(event => event.owner === this.props.paramId) :
        this.state.events.filter(event => event.participants.includes(this.props.paramId) && event.owner !== this.props.paramId) 
    
    render() {
        console.log(this.props)
        return (
            <>
                {!this.state.events ? <h1>Cargando</h1> :
                    <section className="general-info">
                        <div className="age-genre-cont">
                            <p className="profile-data"><span className="color-text">Age: </span>{this.props.userDetails.personDetails.age || "?"}</p>
                            <p className="profile-data" ><span className="color-text">Genre: </span>{this.props.userDetails.personDetails.genre || "?"}</p>
                        </div>

                        <hr></hr>
                        <p className="color-text">Interests: </p>
                        {this.props.userDetails.personDetails.interests.length > 0 ? this.props.userDetails.personDetails.interests.map((hobbie, i) => <h6 className="btn btn-grey" key={i}>{hobbie}</h6>) : "No interests declared"}
                        <hr></hr>
                        <article className="event-section">
                            <article className="main-button-container">
                                {this.isUserTheProfileOwner() &&
                                    <>
                                        <Link to={`/profile/edit/${this.props.loggedInUser._id}`} ><Button variant="dark" type="submit">Edit</Button></Link>
                                    <Button variant="dark" type="submit" onClick={()=> this.handleFormModal(true)}>Create a new event</Button>
                                        <Link to={`/profile/${this.props.loggedInUser._id}/calendar`} ><Button variant="dark" type="submit">See your calendar</Button></Link>
                                    </>
                                }
                            </article>
                            <h3>Created events</h3>
                            {this.filterEvents("owner").length > 0 ? 
                                <EventList loggedInUser={this.props.loggedInUser} updateEventList={this.updateEventList} {...this.props} events={this.filterEvents("owner")} paramId={this.props.paramId} /> :
                                <p>You haven't created any events yet, why don't you <Link className="color-text" to={`/user/${this.props.loggedInUser._id}/event/create`} >try</Link>?</p>
                            }
                            <h3>Joined events</h3>
                            {this.filterEvents("participant").length > 0 ?
                                <EventList loggedInUser={this.props.loggedInUser} updateEventList={this.updateEventList} {...this.props} events={this.filterEvents("participant")} paramId={this.props.paramId} /> :
                                <p style={{ marginBottom: "100px" }}>You haven't joined any future event. <Link className="color-text" to={`/events`} >Find yours</Link>!</p>
                            }
                        </article>
                        <UiModal handleModal={this.handleFormModal} show={this.state.showModal} >
                            <EventForm loggedInUser={this.props.loggedInUser} handleToast={this.props.handleToast} handleEventSubmit={this.handleEventSubmit}/>
                        </UiModal>

                    </section>
                }
            </>
        )
    }
}

export default Profile