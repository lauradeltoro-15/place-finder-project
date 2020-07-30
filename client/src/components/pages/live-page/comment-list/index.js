import React, {Component} from 'react'

import CommentForm from "./comment-form"
import CommentCard from "./comment-card"
import ReactPaginate from 'react-paginate'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import "./comment-list.css"
class CommentList extends Component {
    constructor (){
        super ()
        this.state = {
            comments: undefined,
            offset: 0,
            elements: undefined,
            perPage: 5,
            currentPage: 0
        }
    }

    componentDidMount = () => {
        window.scrollTo(0, 0)
        this.setComments()
    }

    setComments = () => {
        this.setState({pageCount: Math.ceil(this.props.comments.length/this.state.perPage)}, () => this.setElementsForCurrentPage())
    }

    setElementsForCurrentPage = () => {
        let elements = this.props.comments.slice(this.state.offset, this.state.offset + this.state.perPage).map((comment, i) => {
            return (
                <section className="comments">  
                { comment?  <CommentCard key={comment._id} {...comment}/> : <p>There are no comments yet.</p> }
                </section>
            )
        })
        this.setState({elements: elements})
    }

    componentDidUpdate = prevProps => this.props.comments !== prevProps.comments && this.setComments()

    handlePageClick = comments => {
        const selectedPage = comments.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({ currentPage: selectedPage, offset: offset }, () => this.setElementsForCurrentPage())
    }

    render () {

        let paginationElement
        if(this.state.pageCount > 1) paginationElement = (
            <ReactPaginate
              className='pagination-comments'
              previousLabel={"Prev.Page"}
              nextLabel={"Next-Page"}
              breakLabel={<span className="gap">...</span>}
              pageCount={this.state.pageCount}
              onPageChange={this.handlePageClick}
              forcePage={this.state.currentPage}
              containerClassName={"paginate"}
              pageClassName={"page-link"}
              previousClassName={"next-prev"}
              previousLinkClassName={"page-item"}
              nextClassName={"next-prev"}
              nextLinkClassName={"next-prev"}
              disabledClassName={"inactive"}
              activeClassName={"Lactive"}
              activeLinkClassName={"page-link"}
            />
          ) 

        return (
            <>
            <Row>
                <Col md={{span: 8, offset: 2}} className='comments-col'>
                {this.state.elements}   
                {paginationElement}
                 <CommentForm className='comment-form' loggedInUser={this.props.loggedInUser} updateEventInfo={this.props.updateEventInfo} eventId={this.props.eventId}/>
                </Col>
                   
            </Row>
            
            </>
        )
        
    }
}

export default CommentList