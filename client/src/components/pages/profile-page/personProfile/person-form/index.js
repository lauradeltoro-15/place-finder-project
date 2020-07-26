import React, {Component} from 'react'

import UserService from '../../../../../services/UserService'
import FilesService from '../../../../../services/FilesService'

//Bootstrap
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

import SpinnerContainer from "../../../../ui/Spinner"

class profilePerson extends Component {

    constructor (props){
        super (props)
        this.state = {
            username: '',
            password: '',
            interests: undefined,
            genre: undefined,
            age: undefined,
            previousLoggedUser: undefined,
            avatar: '',
        }
        this.userService = new UserService()
        this.filesService = new FilesService()
    }

    componentDidMount = () => {
        this.enterUsernameStateValue(this.props.loggedInUser)

        const id = this.props.loggedInUser._id
        this.userService
            .getUserDetails(id)
            .then((response) => this.setState({ interests: response.data.personDetails.interests, age: response.data.personDetails.age, genre: response.data.personDetails.genre}))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
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
                this.props.history.push(`/profile/${this.props.loggedInUser._id}`)
            })
            .catch(err => err.response && err.response.status === 400 || err.response.status === 401 ? this.setState({ errorMsg: err.response.data.message })
                : this.props.handleToast(true, err.response.data.message))    
    }


    handleFileUpload = e => {
        const uploadData = new FormData()
        uploadData.append("avatar", e.target.files[0])
        this.filesService.handleUpload(uploadData)
            .then(response => this.setState({ avatar: response.data.secure_url }))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message))
    }

    getInterests = () => {
        const interest = ["sport", "music", "learning", 'technology', 'health and wellness', 'kids', 'adults', 'photography', 'art', 'food', 'languajes', 'culture', 'cinema', 'games', 'fashion', 'dance', 'bussiness']
        return <><h5 className='int-title'>Your interests</h5>

                <div className='check'>
                    {interest.map(interest =>
                    <div className='interests'>
                    <label>{interest}</label>
                    <input onChange={this.handleInputChange} checked={this.state.interests.includes(interest)} value={interest} name="interests" type="checkbox" />
                    </div>   
                )}
                </div>
        </>
    }

    render () {

  

        return (
            <>
            { this.state.interests == undefined ? <SpinnerContainer/>:


                <Row className='person-form-row'>

                    <Col  className='person-form-col' md={{span: 6, offset: 3}}>
                    <h1 className='color-text'>Edit your profile</h1>
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
                                <Form.Label>Avatar</Form.Label>
                                <Form.Control onChange={this.handleFileUpload}  name="avatar" type="file" />
                            </Form.Group>
                            

                            <Form.Group>
                                <Form.Label>Age</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.age} name="age" type="number" />
                            </Form.Group>

                            <div className='check'>
                                <div>
                                <label>Male</label>
                                <input onChange={this.handleInputChange} checked={this.state.genre === "Male"} value="Male" name="genre" type="radio" />
                                </div>
                                
                          
                                <div>
                                <label>Female</label>
                                <input onChange={this.handleInputChange} checked={this.state.genre === "Female"} value="Female" name="genre" type="radio" />
                                </div>
                                
                            </div>
                                

                            <Form.Group>
                            {this.getInterests()}
                            </Form.Group>
                           

                        
                                {this.state.errorMsg && <p>{this.state.errorMsg}</p>}
                        <Button className='submit-btn' variant="dark" type="submit">Submit</Button>
                    </Form>
                    </Col>
                </Row>
                
            }
            </>
        )
    }
}

export default profilePerson