import React from 'react'

import Modal from 'react-bootstrap/Modal'

const UiModal = (props) =>  {

    return (
        <Modal size="lg" show={props.show} onHide={() => props.handleModal(false)}>
            <Modal.Body>
                <span className="cross-simbol" onClick={() => props.handleModal(false)}>&#10006;</span>
                {props.children}
            </Modal.Body>
        </Modal>
    )
}

export default UiModal