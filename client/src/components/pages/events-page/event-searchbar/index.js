import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import "./searchbar.css"

class SearchBar extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            minParticipants: null,
            maxParticipants: null,
            minPrice: null,
            maxPrice: null,
            minCapacity: null,
            maxCapacity: null,
            acceptedOffer: false,
            theme: [],
            owner: "",
            startTime: undefined,
            activeTimeLabel: undefined,
            localType: "",
            distanceFromLocation: null,
            showFilters: false
        }
    }
    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value })
        this.props.filterEvents({ ...this.state, [e.target.name]: e.target.value })
    }

    handleDateInputsChange = e => {

        e.target.value === "today" && this.sendOneDayValue(e, 0)
        e.target.value === "tomorrow" && this.sendOneDayValue(e, 1)
        e.target.value === "weekend" && this.sendWeekendValue(e)
        e.target.value === "week" && this.sendWeekValue(e)
        this.setState({ activeTimeLabel: e.target.value })
    }

    sendOneDayValue = (e, offset) => {
        let day = new Date()
        day = day.setDate(day.getDate() + offset)
        this.setState({ startTime: e.target.value })
        this.props.filterEvents({ ...this.state, minDay: day, maxDay: day })
    }

    sendWeekendValue = e => {
        let weekendDays = []
        for (let i = 0; i <= 6; i++) {
            let day = new Date()
            day = new Date(day.setDate(day.getDate() + i))
            if (day.getDay() === 0 || day.getDay() === 6) weekendDays.push(day)
        }
        this.setState({ startTime: e.target.value })
        this.props.filterEvents({ ...this.state, minDay: weekendDays[0], maxDay: weekendDays[1] })
    }

    sendWeekValue = e => {
        let weekDays = []
        for (let i = 0; i <= 6; i++) {
            let day = new Date()
            weekDays.push(new Date(day.setDate(day.getDate() + i)))
            if (day.getDay() === 0) break
        }
        this.setState({ startTime: e.target.value })
        this.props.filterEvents({ ...this.state, minDay: weekDays[0], maxDay: weekDays[weekDays.length - 1] })
    }

    toggleBooleanInputs = (e, name) => {
        this.setState({ [name]: !this.state[name] })
        e.target.classList.toggle("inactive")
        this.props.filterEvents({ ...this.state, [name]: !this.state[name] })
    }

    handleTags = e => {
        const stateToChange = [...this.state[e.target.name]]
        const index = stateToChange.indexOf(e.target.value)
        index === -1 ? stateToChange.push(e.target.value) : stateToChange.splice(index, 1)
        this.setState({ [e.target.name]: stateToChange })
        this.props.filterEvents({ ...this.state, [e.target.name]: stateToChange })
    }

    getThemes = () => {
        const theme = ["sport", "music", "learning", 'technology', 'health and wellness', 'kids', 'adults', 'photography', 'art', 'food', 'languajes', 'culture', 'cinema', 'games', 'fashion', 'dance', 'bussiness']
        return <><h5 className='int-title'>Theme</h5>
            <div className='check'>
                {theme.map(theme =>
                    <Form.Group className='theme'>
                        <Form.Label className={`btn btn-black btn-primary ${this.state.theme.includes(theme) && "active"}`} htmlFor={theme}>{theme}</Form.Label>
                        <Form.Control className="hidden-radio" onChange={e => this.handleTags(e)} checked={this.state.theme.includes(theme)} id={theme} value={theme} name="theme" type="checkbox" />
                    </Form.Group>
                )}
            </div>
        </>
    }

    render() {
        return (
            <Form>

                <Form.Group className="main-search-bar">
                    <span>&#128269;</span>
                    <Form.Control placeholder="Enter the name of an event" onChange={this.handleInputChange} value={this.state.name} name="name" type="text" className="main-input" />
                    <p class="show-filter-button" onClick={() => this.setState({ showFilters: !this.state.showFilters })}>Show Filters</p>
                </Form.Group>



                {this.state.showFilters &&
                    <div className="tab-container">
                    <p onClick={e => this.toggleBooleanInputs(e, "acceptedOffer")} className="show-filter-button tab-button inactive">Accepted Offer</p>
                        <Tabs defaultActiveKey="none" transition={false} id="noanim-tab-example">
                            <Tab eventKey="when" title="When">
                                <Form.Group>
                                    <Form.Label className={`btn btn-black btn-primary ${this.state.activeTimeLabel === "today" && "active"}`} htmlFor="today">Today</Form.Label>
                                    <Form.Control className="hidden-radio" onChange={this.handleDateInputsChange} id="today" value="today" checked={this.state.startTime === "today"} name="startTime" type="radio" />
                                    <Form.Label className={`btn btn-black btn-primary ${this.state.activeTimeLabel === "tomorrow" && "active"}`} htmlFor="tomorrow">Tomorrow</Form.Label>
                                    <Form.Control className="hidden-radio" onChange={this.handleDateInputsChange} id="tomorrow" value="tomorrow" checked={this.state.startTime === "tomorrow"} name="startTime" type="radio" />
                                    <Form.Label className={`btn btn-black btn-primary ${this.state.activeTimeLabel === "weekend" && "active"}`} htmlFor="weekend">This weekend</Form.Label>
                                    <Form.Control className="hidden-radio" onChange={this.handleDateInputsChange} id="weekend" value="weekend" checked={this.state.startTime === "weekend"} name="startTime" type="radio" />
                                    <Form.Label className={`btn btn-black btn-primary ${this.state.activeTimeLabel === "week" && "active"}`} htmlFor="week">This week</Form.Label>
                                    <Form.Control className="hidden-radio" onChange={this.handleDateInputsChange} id="week" value="week" checked={this.state.startTime === "week"} name="startTime" type="radio" />
                                </Form.Group>
                            </Tab>
                            <Tab eventKey="who" title="Who">
                                <Form.Group>
                                    <Form.Label className="color-text-black">Creator</Form.Label>
                                    <Form.Control onChange={this.handleInputChange} value={this.state.owner} name="owner" type="text" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="color-text-black">Max participants</Form.Label>
                                    <Form.Control onChange={this.handleInputChange} value={this.state.maxParticipants} name="maxParticipants" type="number" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="color-text-black">Min participants</Form.Label>
                                    <Form.Control onChange={this.handleInputChange} value={this.state.minParticipants} name="minParticipants" type="number" />
                                </Form.Group>
                            </Tab>
                            <Tab eventKey="Where" title="Where" >
                                <Form.Group>
                                    <Form.Label className="color-text-black">Min price</Form.Label>
                                    <Form.Control onChange={this.handleInputChange} value={this.state.minPrice} name="minPrice" type="number" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="color-text-black">Max price</Form.Label>
                                    <Form.Control onChange={this.handleInputChange} value={this.state.maxPrice} name="maxPrice" type="number" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="color-text-black">Min local capacity</Form.Label>
                                    <Form.Control onChange={this.handleInputChange} value={this.state.minCapacity} name="minCapacity" type="number" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="color-text-black">Max local capacity</Form.Label>
                                    <Form.Control onChange={this.handleInputChange} value={this.state.maxCapacity} name="maxCapacity" type="number" />
                                </Form.Group>
                                <Form.Group>
                                    <h5 className='int-title'>Local type</h5>
                                    <Form.Label className={`btn btn-black btn-primary ${this.state.localType === "restaurant" && "active"}`} htmlFor="restaurant">Restaurant</Form.Label>
                                    <Form.Control className="hidden-radio" onChange={this.handleInputChange} id="restaurant" value="restaurant" checked={this.state.localType === "restaurant"} name="localType" type="radio" />
                                    <Form.Label className={`btn btn-black btn-primary ${this.state.localType === "gym" && "active"}`} htmlFor="gym">Gym</Form.Label>
                                    <Form.Control className="hidden-radio" onChange={this.handleInputChange} id="gym" value="gym" checked={this.state.localType === "gym"} name="localType" type="radio" />
                                    <Form.Label className={`btn btn-black btn-primary ${this.state.localType === "hotel" && "active"}`} htmlFor="hotel">Hotel</Form.Label>
                                    <Form.Control className="hidden-radio" onChange={this.handleInputChange} id="hotel" value="hotel" checked={this.state.localType === "hotel"} name="localType" type="radio" />
                                    <Form.Label className={`btn btn-black btn-primary ${this.state.localType === "others" && "active"}`} htmlFor="others">Others</Form.Label>
                                    <Form.Control className="hidden-radio" onChange={this.handleInputChange} id="others" value="others" checked={this.state.localType === "others"} name="localType" type="radio" />
                                </Form.Group>
                                <Form.Group>
                                    <h5 className='int-title'>Distance from you</h5>
                                    <Form.Label className={`btn btn-black btn-primary ${this.state.distanceFromLocation === "1" && "active"}`} htmlFor="1">1 km</Form.Label>
                                    <Form.Control className="hidden-radio" onChange={this.handleInputChange} id="1" value="1" checked={this.state.distanceFromLocation === "1"} name="distanceFromLocation" type="radio" />
                                    <Form.Label className={`btn btn-black btn-primary ${this.state.distanceFromLocation === "5" && "active"}`} htmlFor="5">5 km</Form.Label>
                                    <Form.Control className="hidden-radio" onChange={this.handleInputChange} id="5" value="5" checked={this.state.distanceFromLocation === "5"} name="distanceFromLocation" type="radio" />
                                    <Form.Label className={`btn btn-black btn-primary ${this.state.distanceFromLocation === "10" && "active"}`} htmlFor="10">10 km</Form.Label>
                                    <Form.Control className="hidden-radio" onChange={this.handleInputChange} id="10" value="10" checked={this.state.distanceFromLocation === "10"} name="distanceFromLocation" type="radio" />
                                    <Form.Label className={`btn btn-black btn-primary ${this.state.distanceFromLocation === "20" && "active"}`} htmlFor="20">20 km</Form.Label>
                                    <Form.Control className="hidden-radio" onChange={this.handleInputChange} id="20" value="20" checked={this.state.distanceFromLocation === "20"} name="distanceFromLocation" type="radio" />
                                </Form.Group>
                            </Tab>
                            <Tab eventKey="about" title="About" >
                                <Form.Group>
                                    {this.getThemes()}
                                </Form.Group>
                            </Tab>
                        </Tabs>


                     
                    </div>
                }

            </Form>
        )
    }
}

export default SearchBar