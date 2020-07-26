import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import  './auth-page.css'

import AuthForm from './auth-form'

const AuthPage = props => {
    const isSignup = props.location.pathname === "/signup"
    return (
        <main className='auth-container' as="main">
            <Row className='row-login-container'>
                <Col className='auth-form' md={{ offset: 4, span: 4 }}>
                    <h3>{isSignup ? "Sign up" : "Log in"}</h3>
                    <hr></hr>
                    <AuthForm setTheUser={props.setTheUser} {...props} isSignup={isSignup} />
                </Col>
            </Row>
        </main>
    )
}

export default AuthPage