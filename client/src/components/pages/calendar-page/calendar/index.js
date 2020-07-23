import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from '@fullcalendar/interaction'

import EventService from "../../../../services/EventService"
import OfferService from "../../../../services/OfferService"

import Modal from "../../../ui/Modal"

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
        this.offerService = new OfferService()
    }
    componentDidMount = () => this.updateEvents()
    updateEvents = () => this.props.match.params.userId ? this.getAllUserEvents(this.props.match.params.userId) :
        this.getAllLocalOffers(this.props.match.params.localId)

    getAllUserEvents = (id) => {
        console.log("vuelve aqui")
        this.eventService.getAllEventsUser(id)
            .then(response => this.setState({ events: response.data }))
            .catch(err => console.log(err))
    }
    getAllLocalOffers = (id) => {
        this.offerService.getAllLocalOffers(id)
            .then(response => console.log("esta es la respuesta", response.data))
            .catch(err => console.log(err))
    }
    handleModal = (status, e) => e ? this.setState({ showModal: status, calendarDate: `${e.dateStr}T00:00` })
        : this.setState({ showModal: status })

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

        const formattedEvents = this.state.events.length > 0 && this.state.events.map(event => { return { title: event.name, start: this.obtainDateInFormat(event.startTime), end: this.obtainDateInFormat(event.endTime) } })
        return (
                <>
                    <FullCalendar
                        businessHours={this.state.businessHours}
                        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                        initialView="dayGridMonth"
                        selectable={true}
                        events={formattedEvents}
                        dateClick={(e) => this.handleModal(true, e)}
                        eventClick={() => alert("tocando evento")}
                        headerToolbar={{ start: "dayGridMonth,timeGridWeek" }}
                    />
                <Modal handleEventSubmit={this.handleEventSubmit} handleModal={this.handleModal} {...this.props} calendarDate={this.state.calendarDate} show={this.state.showModal} loggedInUser={this.props.loggedInUser}/> 
                </>
        )
    }
}

export default Calendar