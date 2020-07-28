import React, { Component } from 'react'

import SmallCard from "./smallChatBotCard"
import DetailedCard from "./bigChatBotCard"

import { Link } from "react-router-dom"

import ChatBot from 'react-simple-chatbot';
import EventService from "../../../services/EventService"
class Chatbotcontainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stepsLogged: [
                {
                    id: '1',
                    message: `Hi ${this.props.loggedInUser && this.props.loggedInUser.username}! My name is Faindy. Nice to see you here! How do you feel today? `,

                    trigger: '2',
                },
                {
                    id: '2',
                    user: true,
                    placeholder: "i.e: ok, sad, happy, angry...",
                    trigger: '3'
                },
                {
                    id: '3',
                    message: 'So you are feeling {previousValue} ? Maybe I can do something for you!',
                    trigger: '4'
                },
                {
                    id: '4',
                    options: [
                        { value: 1, label: 'Show me all my events', trigger: '5' },
                        { value: 2, label: "Show me today's events", trigger: '11' },
                        { value: 3, label: "Where can I see all Fainder's events?", trigger: '12' },
                        { value: 4, label: "Where can I see my profile?", trigger: '13' },
                        { value: 5, label: "I'm fine, thank you", trigger: '9' }
                    ],
                },
                {
                    id: '5',
                    component: this.props.events && this.getAllMyEvents(this.props.events),
                    trigger: "6"
                },
                {
                    id: '6',
                    message: "I'm sure you will enjoy them a lot",
                    trigger: "14"
                },
                {
                    id: '7',
                    message: "Can I do something more for you?",
                    trigger: "8"
                },
                {
                    id: '8',
                    options: [
                        { value: true, label: 'Yes', trigger: '4' },
                        { value: false, label: 'No', trigger: '9' }
                    ],
                },
                {
                    id: '9',
                    message: `Have a great day ${this.props.loggedInUser && this.props.loggedInUser.username}, see you soon!`

                },
                {
                    id: '10',
                    message: `Have a great day ${this.props.loggedInUser && this.props.loggedInUser.username}, see you soon!`

                },
                {
                    id: '11',
                    component: this.getMyEventsOfToday(),
                    end: true

                },
                {
                    id: '12',
                    component: <p>You can find them <Link to='/events'>here</Link> </p>,
                    trigger: "7"

                },
                {
                    id: '13',
                    component: <p>You can find it <Link to={`/profile/${this.props.loggedInUser._id}`}>here</Link> </p>,
                    trigger: "7"

                },
                {
                    id: '14',
                    message: "Do you wanna see the details of any of them?",
                    trigger: "15"
                },
                {
                    id: '15',
                    options: [
                        { value: true, label: 'Yes', trigger: '16' },
                        { value: false, label: 'No', trigger: '7' }
                    ],
                },
                {
                    id: '16',
                    message: "Type the name of the event",
                    trigger: '17'
                },
                {
                    id: '17',
                    user: true,
                    trigger: '18'
                },
                {
                    id: '18',
                    component: (previousStep) => this.seeDetailsOfAnEvent(previousStep),
                    trigger: "7"
                }
            ]
        }
        this.eventService = new EventService()
    }
    getAllMyEvents = (events) => {
        return (
            <div>
                {events.map(event => <SmallCard event={event} />)}
            </div>
        )
    }
    getMyEventsOfToday = () => {
        const today = new Date()
        const todayEvents = this.props.events && this.props.events.filter(event =>
            this.obtainDateInFormat(event.startTime) === this.obtainDateInFormat(today))
        return todayEvents && todayEvents.length > 0 ? this.getAllMyEvents(todayEvents) : <p>You don't have any events today</p>
    }
    seeDetailsOfAnEvent = previousStep => {
        console.log(previousStep)
        // const index = this.props.events && this.props.events.findIndex(event => event.name === name)
        // console.log(index)
        // return index === -1 ? <p>You don't have any event with that name, try to write it again</p> : this.props.events[index]
    }


    obtainDateInFormat = date => {
        const newDate = new Date(date)
        let dd = String(newDate.getDate()).padStart(2, '0')
        let mm = String(newDate.getMonth() + 1).padStart(2, '0')
        let yyyy = newDate.getFullYear()
        return `${yyyy}-${mm}-${dd}`
    }

    render() {

        return (

            <ChatBot floating="true" steps={this.state.stepsLogged} />

        )
    }
}

export default Chatbotcontainer