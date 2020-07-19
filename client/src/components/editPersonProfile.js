import React, {Component} from 'react'

import PersonService from '../services/PersonService'

//Bootstrap
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class profilePerson extends Component {
    constructor (props){
        super (props)
        this.state = {
            username: '',
            password: '',
            interests: []
        }
        this.personService = new PersonService()
    }

    handleInputChange = e => {
        if(e.target.checked) {
            this.state.interests.push(e.target.name)
        } else {
            this.state.interests = this.state.interests.filter(interest => interest != e.target.name)
        }
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.personService
            .editPersonProfile(this.props.loggedUser._id , this.state)
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.history.push('/')
            })
            .catch(err => console.log(err.response.data.message))   
    }

    render () {
      
        // this.props.loggedUser.interests.forEach(interest => {
        //     this.state.interests.push(interest)
        // })
        console.log("This is edit", this.props)
        return (
            <>
            {!this.props.loggedUser ? <h1>cargando</h1>:
            <Container as='main'>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.username} name="username" type="text" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.password} name="password" type="password" />
                        <Form.Text className="text-muted">At least three characters</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Sport</Form.Label>
                        <input type="checkbox" onChange={this.handleInputChange} name="sport" ckecked={this.state.interests.includes("sport")}/>
                        <Form.Label>Music</Form.Label>
                        <input type="checkbox" onChange={this.handleInputChange} name="music" ckecked={this.state.interests.includes("music")}/>
                        <Form.Label>Learning</Form.Label>
                        <input type="checkbox" onChange={this.handleInputChange} name="learning" ckecked={this.state.interests.includes("learning")}/>
                    </Form.Group>
                    <Button variant="dark" type="submit">Submit</Button>
                </Form>
            </Container>
            }
            </>
        )
    }
}

export default profilePerson