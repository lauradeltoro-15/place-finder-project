import React from 'react'

import Modal from 'react-bootstrap/Modal'

const UiModal = (props) =>  {
    console.log(props)
    return (
        <Modal size="lg" show={props.show} onHide={() => props.handleModal(false)}>
            <Modal.Body>
                <span className="cross-simbol" onClick={() => {
                    console.log("HE")
                    props.handleModal(false)
                }}>&#10006;</span>
                {props.children}
            </Modal.Body>
        </Modal>
    )
}

export default UiModal