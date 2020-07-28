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


const steps = [
  {
    id: '1',
    message: 'Hello World',
    end: true,
  },
];



class ThemeExample extends Component {
  constructor (){
    super ()
    this.state = {}
  }

  render () {
    return (
      <>
        <ThemeProvider theme={theme}>
          <ChatBot  steps={steps} />
        </ThemeProvider>
      </>
    )
  }
}

export default ThemeExample

