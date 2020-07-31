import React, {Component} from 'react'

import EventService from '../../../../services/EventService'
import EventCard from './card'

import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

import ReactPaginate from 'react-paginate'
import './pagination.css'

class  EventList extends Component {
    constructor (props){
        super (props)
        this.state = {
            offset: 0,
            elements: undefined,
            perPage: 9,
            currentPage: 0
        }
        this.eventService = new EventService()
    }

    componentDidMount = () => {
        window.scrollTo(0, 0)
        this.setEvents()
    }

    componentDidUpdate = prevProps => this.props.events !== prevProps.events && this.setEvents()

    setEvents = () => this.setState({pageCount: Math.ceil(this.props.events.length/this.state.perPage)}, () => this.setElementsForCurrentPage())

    setElementsForCurrentPage = () => {
        let elements = this.props.events.slice(this.state.offset, this.state.offset + this.state.perPage).map((event, i) => {
            return (
                <Col md={4} key={i} ><EventCard key={i} {...this.props} updateEventList={this.props.updateEventList} loggedInUser={this.props.loggedInUser} key={event._id} {...event} /></Col>)}
            )
        this.setState({elements: elements})
    }
    
    handlePageClick = events => {
        const selectedPage = events.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({ currentPage: selectedPage, offset: offset }, () => this.setElementsForCurrentPage())
    }
    
    render() {

        let paginationElement
        if(this.state.pageCount > 1) paginationElement = (
            <ReactPaginate
              previousLabel={"Prev.Page"}
              nextLabel={"Next-Page"}
              breakLabel={<span className="gap">...</span>}
              pageCount={this.state.pageCount}
              onPageChange={this.handlePageClick}
              forcePage={this.state.currentPage}
              containerClassName={"paginate-1"}
              pageClassName={"page-link-1"}
              previousClassName={"next-prev-1"}
              previousLinkClassName={"page-item-1"}
              nextClassName={"next-prev-1"}
              nextLinkClassName={"next-prev-1"}
              disabledClassName={"inactive"}
              activeClassName={"Lactive-1"}
              activeLinkClassName={"page-link-1"}
            />
          ) 

    return (
        <>
            <Row>    
                {this.state.elements}      
            </Row>
            {paginationElement}
        </>
          )
    }
}
    
export default EventList