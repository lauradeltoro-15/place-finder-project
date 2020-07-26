import React from "react"

import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'

const SpinnerContainer = () => {
    return (
        <main className="spinner-container">
            <Spinner animation="border" role="status" >
                <span className="sr-only">Loading...</span>
            </Spinner>
        </main>
    )
}
export default SpinnerContainer