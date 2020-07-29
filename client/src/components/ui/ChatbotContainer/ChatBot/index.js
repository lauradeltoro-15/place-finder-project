import React, { Component } from 'react'

import SmallCard from "./smallChatBotCard"

import { Link } from "react-router-dom"

import ChatBot from 'react-simple-chatbot';

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
                    placeholder: "i.e: nervous, sad, happy, angry...",
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
                    id: '11',
                    component: this.getMyEventsOfToday(),
                    trigger: "7"

                },
                {
                    id: '12',
                    component: <p>You can find them <Link className="color-text" to='/events'>here</Link> </p>,
                    trigger: "7"

                },
                {
                    id: '13',
                    component: <p>You can find it <Link className="color-text" to={`/profile/${this.props.loggedInUser && this.props.loggedInUser._id}`}>here</Link> </p>,
                    trigger: "7"

                },
                {
                    id: '14',
                    message: "You can see the details on an event by clicking on its name",
                    trigger: "7"
                }
            ],
            stepsNoLogged: [
                {
                    id: '1',
                    message: `Hi, friend! What is your name? `,
                    trigger: '2',
                },
                {
                    id: '2',
                    user: true,
                    trigger: '3'
                },
                {
                    id: '3',
                    message: `Nice to meet you {previousValue}, welcome to Fainder!`,
                    trigger: '4',
                },
                {
                    id: '4',
                    message: "Fainder is an app designed to share events so people can find where to hold it",
                    trigger: '5',
                    delay: 3000
                },
                {
                    id: '5',
                    component: <p>You can find them <Link className="color-text" to='/events'>here</Link> </p>,
                    trigger: '6',
                    delay: 3000
                },
                {
                    id: '6',
                    message: "Would you like to share your local or to attend/create events?",
                    trigger: '7',
                    delay: 3000
                },
                {
                    id: '7',
                    options: [
                        { value: 1, label: 'Share my local', trigger: '8' },
                        { value: 2, label: "Attend and create events", trigger: '11' },
                    ],
                    delay: 3000
                },
                {
                    id: '8',
                    message: "Good idea! You should sign up as a company, you can create as many locals as you want!",
                    trigger: '9',
                },
                {
                    id: '9',
                    component: <p>You can start <Link className="color-text" to='/signup'>here</Link>.</p>,
                    trigger: '10',
                },
                {
                    id: '10',
                    message: "Talk to me again when you are logged in! I still have some surprises for you!",
                    end: true,
                },
                {
                    id: '11',
                    message: "I am sure you will enjoy all our events! And go to the best locals in town!",
                    trigger: '9',
                },

            ],
        }
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

    obtainDateInFormat = date => {
        const newDate = new Date(date)
        let dd = String(newDate.getDate()).padStart(2, '0')
        let mm = String(newDate.getMonth() + 1).padStart(2, '0')
        let yyyy = newDate.getFullYear()
        return `${yyyy}-${mm}-${dd}`
    }

    render() {

        return (
            <ChatBot floating="true" steps={this.props.loggedInUser ? this.state.stepsLogged : this.state.stepsNoLogged} />
        )
    }
}

export default Chatbotcontainer