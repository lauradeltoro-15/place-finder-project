import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from '@fullcalendar/interaction'

import EventService from "../../../../services/EventService"
import OfferService from "../../../../services/OfferService"

import EventForm from '../../events-page/event-form'

import Modal from "../../../ui/Modal"

class Calendar extends Component {
    constructor() {
        super()
        this.state = {
            showModal: false,
        }
        this.eventService = new EventService()
        this.offerService = new OfferService()
    }

    handleModal = (status, e) => !this.props.events ? null :
        e ? this.setState({ showModal: status, calendarDate: `${e.dateStr}T00:00` }) :
            this.setState({ showModal: status })

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
    getEventDetails = e => {
        this.eventService.getEventByName(e.event._def.title)
            .then(response => this.setState({ eventDetail: response.data }))
            .catch(err => console.log(err))
    }
    getEventsToRender = () => this.props.events ?
        this.props.events.length > 0 && this.props.events.map(event => { return { title: event.name, start: this.obtainDateInFormat(event.startTime), end: this.obtainDateInFormat(event.endTime) } })
        : this.props.offers.length > 0 && this.props.offers.map(offer => { return { title: offer.event.name, start: this.obtainDateInFormat(offer.event.startTime), end: this.obtainDateInFormat(offer.event.endTime) } })

    render() {
        const formattedInfo = this.getEventsToRender()
        console.log(this.state.eventDetail, "event detail")
        return (

            <>
                <FullCalendar
                    businessHours={this.props.offers ? this.props.offers[0].local.availability : ""}
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    initialView="dayGridMonth"
                    selectable={true}
                    events={formattedInfo}
                    dateClick={e => this.handleModal(true, e)}
                    eventClick={e => this.getEventDetails(e)}
                    headerToolbar={{ start: "dayGridMonth,timeGridWeek" }}
                />
                <Modal handleEventSubmit={this.handleEventSubmit} handleModal={this.handleModal} {...this.props} calendarDate={this.state.calendarDate} show={this.state.showModal} loggedInUser={this.props.loggedInUser}> </Modal>
            </>
        )
    }
}

export default Calendar