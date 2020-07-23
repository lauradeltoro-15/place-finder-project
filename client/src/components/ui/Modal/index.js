import React, {Component} from 'react'

import Modal from 'react-bootstrap/Modal'
import EventForm from '../../pages/events-page/event-form'

class UiModal extends Component {
    constructor (){
        super ()
        this.state = {
            
        }
    }

    render () {
        return (
            <Modal size="lg" show={this.props.show} onHide={() => this.props.handleModal(false)}>
            <Modal.Body>
                    <EventForm calendarDate={this.state.calendarDate} {...this.props} loggedInUser={this.props.loggedInUser} handleEventSubmit={this.handleEventSubmit} {...this.props} />
            </Modal.Body>
        </Modal>
        )
    }
}

export default UiModal