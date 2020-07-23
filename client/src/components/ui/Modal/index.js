import React, {Component} from 'react'

import Modal from 'react-bootstrap/Modal'

class Modal extends Component {
    constructor (){
        super ()
        this.state = {
            
        }
    }

    render () {
        return (
        <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>
            <Modal.Body>
                <EventForm calendarDate={this.state.calendarDate} loggedInUser={this.props.loggedInUser} handleModal={this.handleEventSubmit} {...this.props} />
            </Modal.Body>
        </Modal>
        )
    }
}

export default Modal