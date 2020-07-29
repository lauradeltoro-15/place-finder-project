import React, {Component} from 'react'
import { ThemeProvider } from 'styled-components';
import ChatBot from './ChatBot/index';

import './chatbot.css'

const theme = {
  background: '#F4F7F6',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#4AC5B6',
  headerFontColor: '#fff',
  botBubbleColor: '#4AC5B6',
  botFontColor: '#fff',
  userBubbleColor: '#4AC5B6',
  userFontColor: '#fff'
}

class ChatbotContainer extends Component {
  constructor (){
    super ()
    this.state = {}
  }

  render () {
    return (
      <>
        <ThemeProvider theme={theme} >
          <ChatBot  events={this.props.events} loggedInUser={this.props.loggedInUser}/>
        </ThemeProvider>
      </>
    )
  }
}

export default ChatbotContainer

