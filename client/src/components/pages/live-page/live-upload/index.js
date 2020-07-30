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
            .then(response => {
                document.querySelector(".chooser").classList.toggle("inactive")
                document.querySelector(".uploader").classList.toggle("inactive")

                this.setState({ picture: response.data.secure_url })
            })
            .catch(err => console.log(err) /*err.response && this.props.handleToast(true, err.response.data.message)*/)
    }
    handleFormSubmit = e => {
        e.preventDefault()
        console.log(this.state.picture)
        this.state.picture && 
            this.eventService.updateLiveEventPictures(this.props.eventId, this.state.picture)
            .then(() => {
                document.querySelector(".chooser").classList.toggle("inactive")
                document.querySelector(".uploader").classList.toggle("inactive")
                this.setState({ picture: undefined})
                this.props.updateEventInfo()
            })
            .catch(err => console.log(err))
    }
    render () {
        return (
            <Form onSubmit={this.handleFormSubmit}>
                <Form.Group >
                    <div className="upload-file-container">
                        <Form.Label className="picture-file-label pointer chooser" htmlFor="event-picture-input">Choose your picture!</Form.Label>
                        <Form.Control id="event-picture-input" onChange={this.handleFileUpload} name="pictures" type="file" className="picture-file-input" />
                        <span className='button-center'><Button className="picture-file-label inactive uploader" type="submit"><img className="upload-icon" alt="upload file icon" src="https://res.cloudinary.com/dlsnvevxk/image/upload/v1596109488/avatar/file-upload.png.png" /></Button></span>
                    </div>
                </Form.Group>
                   
            </Form>
        )
    }
}

export default FileUploader