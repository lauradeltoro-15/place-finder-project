import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import  './auth-page.css'

import AuthForm from './auth-form'

const AuthPage = props => {
    const isSignup = props.location.pathname === "/signup"
    console.log(isSignup)
    return (
        <Container className='container' as="main">
            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    <h3>{isSignup ? "Sign up" : "Log in"}</h3>
                    <hr></hr>
                    <AuthForm setTheUser={props.setTheUser} {...props} isSignup={isSignup} />
                </Col>
            </Row>
        </Container>
    )
}

export default AuthPage