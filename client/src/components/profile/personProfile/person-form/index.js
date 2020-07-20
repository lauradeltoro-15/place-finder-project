import React, {Component} from 'react'

import UserService from '../../../../services/UserService'

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
            interests: undefined,
            genre: undefined,
            age: undefined,
            previousLoggedUser: undefined
        }
        this.userService = new UserService()
    }

    componentDidMount = () => {
        this.enterUsernameStateValue(this.props.loggedInUser)

        const id = this.props.loggedInUser._id
        this.userService
            .getUserDetails(id)
            .then((response) => this.setState({ interests: response.data.personDetails.interests, age: response.data.personDetails.age, genre: response.data.personDetails.genre}))
            .catch(err => console.log(err))
    }

    enterUsernameStateValue = user => this.setState({ username: user.username })

    handleInputChange = e => e.target.type !== "checkbox" ? this.setState({ [e.target.name]: e.target.value })
        : this.handleCheckbox(e.target)

    handleCheckbox = (target) => {
        const stateToChange = [...this.state[target.name]]
        const index = stateToChange.indexOf(target.value)
        index === -1 ? stateToChange.push(target.value) : stateToChange.splice(index, 1)
        this.setState({ [target.name]: stateToChange })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.setState({previousLoggedUser: this.props.loggedInUser})
        this.userService
            .editUserProfile(this.props.loggedInUser._id , this.state)
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.history.push('/profile')
            })
            .catch(err => console.log(err))   
    }

    render () {

        return (
            <>
            { this.state.interests == undefined ? <h1>cargando</h1>:
            <Container as='main'>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control readOnly={true} onChange={this.handleInputChange} value={this.state.username} name="username" type="text" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.password} name="password" type="password" />
                        <Form.Text className="text-muted">At least three characters</Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Age</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.age} name="age" type="number" />
                    </Form.Group>

                    <Form.Group>
                        <label>Male</label>
                        <input onChange={this.handleInputChange} checked={this.state.genre === "Male"} value="Male" name="genre" type="radio" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Female</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.genre === "Female"} value="Female" name="genre" type="radio" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Sport</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.interests.includes("sport")} value="sport" name="interests" type="checkbox" />
                        <Form.Label>Learning</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.interests.includes("learning")} value="learning" name="interests" type="checkbox" /> 
                        <Form.Label>Music</Form.Label>
                        <input onChange={this.handleInputChange} checked={this.state.interests.includes("music")} value="music" name="interests" type="checkbox" /> 
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