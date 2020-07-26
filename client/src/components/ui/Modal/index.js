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

        return (
            <Modal size="lg" show={this.props.show} onHide={() => this.props.handleModal(false)}>
                <Modal.Body>
                    <span className="cross-simbol" onClick={() => this.props.handleModal(false)}>&#10006;</span>
                    {this.props.children}
            </Modal.Body>
        </Modal>
        )
    }
}

export default UiModal