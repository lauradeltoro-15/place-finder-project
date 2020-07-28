import React, { Component } from 'react'

import SmallCard from "./smallChatBotCard"

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
                    placeholder:"i.e: fine, sad, happy, angry...",
                    trigger: '3'
                },
                {
                    id: '3',
                    message: 'So you are feeling {previousValue} ? Maybe I can do something you!',
                    trigger: '4'
                },
                {
                    id: '4',
                    options: [
                        { value: 1, label: 'What are my events?', trigger: '5' },
                        { value: 2, label: 'Do I have any event today?', trigger: '11' },
                        { value: 3, label: "I'm fine, thank you", trigger: '9' }
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
                    trigger: "7"
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
                    end:true

                },
            ],
            stepsNoLogged: [
                {
                    id: '1',
                    message: "la arme",
                    trigger: '2',
                },
                {
                    id: '2',
                    user: true,
                    trigger: '3',
                },
                {
                    id: '3',
                    message: "tonta",
                    trigger: '4',
                },
                {
                    id: '4',
                    options: [
                        { value: 1, label: 'What events are near me?', trigger: '5' },
                        { value: 2, label: 'Suggest me an event', trigger: '6' },
                        { value: 3, label: 'What are my plans for this week?', trigger: '7' },
                    ],
                },
                {
                    id: '5',
                    message: "These are the events near you",
                    end: true
                },
                {
                    id: '6',
                    message: "This is my suggestion",
                    end: true
                },
                {
                    id: '7',
                    message: "These are your plans for the week",
                    end: true
                }

            ]
            

        } 
        this.eventService = new EventService()
    }
    getAllMyEvents = (events) => {  
        return (
            <div>
                {events.map(event => <SmallCard event={event}/>)}
            </div>
        )
    }
    getMyEventsOfToday= () => {
        const today = new Date()
        const todayEvents = this.props.events && this.props.events.filter(event =>
            this.obtainDateInFormat(event.startTime) === this.obtainDateInFormat(today))
        return todayEvents && todayEvents.length > 0 ? this.getAllMyEvents(todayEvents) : <p>You don't have any events today</p>
    }
    // seeDetailsOfAnEvent = name => {
    //     const index = this.props.events && this.props.events.indexOf(event => event.name === name)
    //     index === -1 ? <p>You don't have any event with that name, are you sure you write it wright?</p> : 
    // }
    

    obtainDateInFormat = date => {
        const newDate = new Date(date)
        let dd = String(newDate.getDate()).padStart(2, '0')
        let mm = String(newDate.getMonth() + 1).padStart(2, '0')
        let yyyy = newDate.getFullYear()
        return `${yyyy}-${mm}-${dd}`
    }

    render() {
        return (
            <ChatBot floating="true"
                steps={this.props.loggedInUser ? this.state.stepsLogged : this.state.stepsNoLogged}
            />
        )
    }
}

export default Chatbotcontainer