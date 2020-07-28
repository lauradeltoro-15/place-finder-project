import React, {Component} from 'react'

import ChatBot from 'react-simple-chatbot';

class Chatbotcontainer extends Component {
    constructor (props){
        super (props)
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
                    trigger: '3'
                },
                {
                    id: '3',
                    message: 'So you are feeling {previousValue} ? Maybe I can do something your!',
                    trigger: '4'
                },
                {
                    id: '4',
                    options: [
                        { value: 1, label: 'What are my events?', trigger: '5' },
                    ],
                },
                {
                    id: '5',
                    component: this.getAllMyEvents(),
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
    }
    getAllMyEvents = () => {
    return (
        <div>
            {this.props.events && this.props.events.map(event => <div>{event.name}</div>)}
        </div>
 )
   
    }

    render() {
        console.log(this.props)
        return (
                <ChatBot floating="true"
                    steps={this.props.loggedInUser ? this.state.stepsLogged: this.state.stepsNoLogged}
                />
        )
    }
}

export default Chatbotcontainer