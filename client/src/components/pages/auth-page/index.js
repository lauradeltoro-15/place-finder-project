import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import AuthForm from './auth-form'

const AuthPage = ({location}) => {
    const isSignup = location.pathname === "/signup"
    return (
        <Container as="main">
            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    <h3>{isSignup ? "Sign up" : "Log in"}</h3>
                    <hr></hr>
                    <AuthForm isSignup={isSignup} />
                </Col>
            </Row>
        </Container>
    )
}

export default AuthPage