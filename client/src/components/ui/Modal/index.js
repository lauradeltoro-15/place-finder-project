import React from 'react'

import Modal from 'react-bootstrap/Modal'

import "./modal.css"

const UiModal = (props) =>  {
    return (
        <Modal size="lg" show={props.show} onHide={() => props.handleModal(false)}>
            <Modal.Body>
                <div className="margin-left-cont">
                    <span className="cross-simbol pointer" onClick={() => {
                        props.handleModal(false)
                    }}>&#10006;</span>
                </div>
                {props.children}
            </Modal.Body>
        </Modal>
    )
}

export default UiModal