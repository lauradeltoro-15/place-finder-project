import React, {Component} from 'react'

import PersonProfile from "./personProfile"
import CompanyProfile from "./companyProfile"

import Container from 'react-bootstrap/esm/Container'

import UserService from '../../../services/UserService'

class ProfilePage extends Component {
    constructor (props){
        super (props)
        this.state = {
            userDetails: undefined
        }

        this.UserService = new UserService()
    }
    componentDidMount = () => {
        const id = this.props.match.params.userId
        this.UserService
            .getUserDetails(id)
            .then((response) =>  this.setState({ userDetails: response.data}))
            .catch(err => console.log(err))
    }
    getProfile = () => {
        if (this.state.userDetails) {
            return this.state.userDetails.companyDetails ?
                <CompanyProfile userDetails={this.state.userDetails} loggedInUser={this.props.loggedInUser} paramId={this.props.match.params.userId} />
                : <PersonProfile userDetails={this.state.userDetails} {...this.props} loggedInUser={this.props.loggedInUser} paramId={this.props.match.params.userId} />
        }

    }
    render() {
        const detailedProfile = this.getProfile()
        console.log("Estoy aquí")
        return (
            <>
                {!this.state.userDetails ? <h1>cargando</h1>:
                <Container as ="main">
                    <h1>{this.state.userDetails.username} profile</h1>
                    <span>{this.state.userDetails.personDetails ? "User" : "Company"}</span>
                    { detailedProfile }
                </Container>
            }
            </>     
        )
    }
}

export default ProfilePage
