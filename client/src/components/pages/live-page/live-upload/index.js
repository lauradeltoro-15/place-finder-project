import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import FileService from "../../../../services/FilesService"
import EventService from "../../../../services/EventService"


class FileUploader extends Component {
    constructor (){
        super ()
        this.state = {
            picture: undefined
        }
        this.fileService = new FileService()
        this.eventService = new EventService()
    }
    handleFileUpload = e => {
        const uploadData = new FormData()
        uploadData.append("avatar", e.target.files[0])
        this.fileService.handleUpload(uploadData)
            .then(response => this.setState({ picture: response.data.secure_url }))
            .catch(err => console.log(err) /*err.response && this.props.handleToast(true, err.response.data.message)*/)
    }
    handleFormSubmit = e => {
        e.preventDefault()
        console.log(this.state.picture)
        this.state.picture && //TO-DO => Deshabilitar botón
            this.eventService.updateLiveEventPictures(this.props.eventId, this.state.picture)
            .then(() => {
                this.setState({ picture: undefined})
                this.props.updateEventInfo()
            })
            .catch(err => console.log(err))
    }
    render () {
        return (
            <Form onSubmit={this.handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Picture</Form.Label>
                    <Form.Control onChange={this.handleFileUpload} name="pictures" type="file" />
                    <div className='button-center'><Button variant="dark" type="submit">Submit</Button></div>
                </Form.Group>
            </Form>
        )
    }
}

export default FileUploader