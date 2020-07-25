import React from 'react'

import Toast from 'react-bootstrap/Toast'

const CustomToast = ({ visible, text, handleToast }) => {
    return (
        <Toast style={{ position: 'fixed', right: '10px', bottom: '10px', width: '300px' }} show={visible} onClose={() => handleToast(false)} delay={3000} autohide>
            <Toast.Header style={{ fontFamily: "'Oleo Script', cursive"}}> <p className="mr-auto">Fainder</p> </Toast.Header>
            <Toast.Body>{text}</Toast.Body>
        </Toast>
    )
}

export default CustomToast