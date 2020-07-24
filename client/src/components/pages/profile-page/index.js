import React, {Component} from 'react'

import PersonProfile from "./personProfile"
import CompanyProfile from "./companyProfile"

import "./profile.css"

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
        return (
            <>
                {!this.state.userDetails ? <h1>cargando</h1> :
                    <main className="main-bg">
                        <Container className="profile-container">
                            <h1 className="big-title">{this.state.userDetails.username}'s profile</h1>
                            <small className="subtitle">{this.state.userDetails.personDetails ? "Event-lover" : "Company"}</small>
                            {detailedProfile}
                        </Container>
                </main>
   
            }
            </>     
        )
    }
}

export default ProfilePage
