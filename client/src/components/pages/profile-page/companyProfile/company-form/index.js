import React, { Component } from 'react'

import UserService from "../../../../../services/UserService"
import FileService from '../../../../../services/FilesService'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import '../profile.css'

import SpinnerContainer from "../../../../ui/Spinner"

class CompanyForm extends Component {
    constructor() {
        super()
        this.state = {
            description: "",
            phone: "",
            address: "",   
            facebook: "",
            instagram: "",
            website: "",
            username: "",
            password: "",
            avatar: '',
            errorMsg: '',
        }
        this.userService = new UserService()
        this.filesService = new FileService() 
    }

    componentDidMount = () => {
        
        const id = this.props.match.params.id
        this.userService
            .getUserDetails(id)
            .then(response => {
                console.log(response)
                this.updateStateFromApi(response.data)
            })
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message)) 
    }

    updateStateFromApi = data => {
        this.setState({
            username: data.username,
            description: data.companyDetails.description,
            phone: data.companyDetails.contact.phone.value,
            address: data.companyDetails.location ? data.companyDetails.location.address : '',
            facebook: data.companyDetails.contact.facebook.value,
            instagram: data.companyDetails.contact.instagram.value,
            website: data.companyDetails.contact.website.value,
            avatar: data.avatar
        })
        console.log("he llegado")
    }

    mapSocialMediaInfo = (socialMedia, name) => socialMedia.filter(social => social.name === name).map(social => social.mediaUrl)[0]
    
    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault() 
        this.userService
            .editUserProfile(this.props.loggedInUser._id , this.state)
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.history.push(`/profile/${this.props.loggedInUser._id}`)
            })
            .catch(err => !err.response ? null :
                err.response.status === 400 ? this.setState({ errorMsg: err.response.data.message }) :
                    this.props.handleToast(true, err.response.data.message)) 
    }

    enterUsernameStateValue = user => this.setState({ username: user.username })

    handleFileUpload = e => {
        const uploadData = new FormData()
        uploadData.append("avatar", e.target.files[0])

        this.filesService.handleUpload(uploadData)
            .then(response => this.setState({ avatar: response.data.secure_url }))
            .catch(err => err.response && this.props.handleToast(true, err.response.data.message)) 
    }

    render() {
        console.log(this.state)
        return (
            <>
                {this.state.username.length < 1 ? <SpinnerContainer/> :
                <Row className='profile-form-row'>
                    <Col className='profile-form-col' md={{span: 6, offset: 3}}>
                    <h1 className='color-text'>Edit your profile</h1>
                    <Form onSubmit={this.handleFormSubmit}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control onChange={this.handleInputChange} value={this.state.username} name="username" type="textarea" readOnly={true}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.password} name="password" type="password" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Avatar (URL)</Form.Label>
                            <Form.Control onChange={this.handleFileUpload}  name="avatar" type="file" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control onChange={this.handleInputChange} value={this.state.phone} name="phone" type="number" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control onChange={this.handleInputChange} value={this.state.description} name="description" type="textarea" />
                        </Form.Group>
                        <h5 className='int-title'>Social Media</h5>
                        <Form.Group>
                            <Form.Label>Instagram</Form.Label>
                            <Form.Control onChange={this.handleInputChange} value={this.state.instagram} name="instagram" type="text" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Facebook</Form.Label>
                            <Form.Control onChange={this.handleInputChange} value={this.state.facebook} name="facebook" type="text" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Website</Form.Label>
                            <Form.Control onChange={this.handleInputChange} value={this.state.website} name="website" type="text" />
                            </Form.Group>
                            {this.state.errorMsg && <p>{this.state.errorMsg}</p>}
                        <div className='button-center'><Button variant="dark" type="submit">Submit</Button></div>
                    </Form>
                    </Col>
                </Row>
                
            }
            </>
        )
    } 
}

export default CompanyForm