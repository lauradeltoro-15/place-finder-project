import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from '@fullcalendar/interaction'

import EventService from "../../../services/EventService"

import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/esm/Container'

import EventForm from "../../event/form"

class Calendar extends Component {
    constructor() {
        super()
        this.state = {
            events: [],
            showModal: false,
            businessHours: [ // specify an array instead
                {
                    daysOfWeek: [1, 2, 3], // Monday, Tuesday, Wednesday
                    startTime: '08:00', // 8am
                    endTime: '18:00' // 6pm
                },
                {
                    daysOfWeek: [4, 5], // Thursday, Friday
                    startTime: '10:00', // 10am
                    endTime: '16:00' // 4pm
                }
            ]
        }
        this.eventService = new EventService()
    }
    componentDidMount = () => this.updateEvents()
    updateEvents = () => {
        const id = this.props.match.params.userId
        this.eventService.getAllEventsUser(id)
            .then(response => {
                console.log("Are we entering?")
                this.setState({ events: response.data })
            })
            .catch(err => console.log(err))
    }

    handleModal = (status, e) => e ? this.setState({ showModal: status, calendarDate: `${e.dateStr}T00:00` })
        : this.setState({showModal: status})
    

    handleEventSubmit = () => {
        this.handleModal(false)
        this.updateEvents()
    }

    obtainDateInFormat = date => {
        const newDate = new Date(date)
        const hh = String(newDate.getHours()).padStart(2, '0')
        const min = String(newDate.getMinutes()).padStart(2, '0')
        let dd = String(newDate.getDate()).padStart(2, '0')
        let mm = String(newDate.getMonth() + 1).padStart(2, '0')
        let yyyy = newDate.getFullYear()
        return `${yyyy}-${mm}-${dd}T${hh}:${min}:00`
    }
    render() {
        
        const formattedEvents = this.state.events.length > 0 && this.state.events.map(event => { return { title: event.name, start: this.obtainDateInFormat(event.startTime), end: this.obtainDateInFormat(event.endTime)} })
        console.log(formattedEvents)
        return (
            <>
                <Container>
                    <FullCalendar
                        businessHours={this.state.businessHours}
                        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                        initialView="dayGridMonth"
                        selectable={true}
                        events={formattedEvents}
                        dateClick={(e) => this.handleModal(true,e)}
                        eventClick={() => alert("tocando evento")}
                        headerToolbar={{ start: "dayGridMonth,timeGridWeek" }}
                    />
                </Container>
                <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <EventForm calendarDate={this.state.calendarDate} loggedInUser={this.props.loggedInUser} handleModal={this.handleEventSubmit} {...this.props}/>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default Calendar