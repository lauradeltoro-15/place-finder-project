import React, {Component} from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/esm/Button'

class UiModal extends Component {
    constructor (){
        super ()
        this.state = {
            
        }
    }

    render() {
        console.log(this.props)
        return (
            <Modal size="lg" show={this.props.show} onHide={() => this.props.handleModal(false)}>
                <Modal.Body>
                    {this.props.children}
                    <Button onClick={() => this.props.handleEventDetailModal(false)}>Close</Button>
            </Modal.Body>
        </Modal>
        )
    }
}

export default UiModal