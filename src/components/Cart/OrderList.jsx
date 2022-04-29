import axios from 'axios';
import React, { Component, Fragment } from 'react'
import {Navbar,Container, Row, Col, Button, Card, Modal, DropdownButton, Dropdown} from 'react-bootstrap';
import AppURL from '../../api/AppURL';
import cogoToast from 'cogo-toast';
import { Redirect } from 'react-router-dom';

import Pagination from 'react-responsive-pagination';

export class OrderList extends Component {
    constructor() {
        super();

        this.state = {
            productData : [],
            filteredOrderList: [],

            isLoading: '',
            // d-none là ko hiện
            mainDiv: "d-none",

            reviewModal: false,

            name: "",
            rating: "",
            comments: "",

            product_name: "",
            product_code: "",
            id: "",

            pageRefreshStatus: false,

            dropdownValue: "All",

            cancelButton: "Cancel Order",

            totalPages: 0,
            currentPage: 1,
        }
    }

    componentDidMount = () => {
        this.setState({
            name: this.props.user['name'],
        })
      
        axios.get(AppURL.OrderListByUser(this.props.user['email'])).then(response => {
            this.setState({
            productData: response.data,
            filteredOrderList: response.data,
            totalPages: Math.ceil(response.data.length / 5),
            // placeholder
            isLoading: "d-none",
            // d-none là ko hiện
            mainDiv: "",
            })
        }).catch(error => {
            console.log(error)
        })
    }

    reviewModalClose = () => {
        this.setState({
            reviewModal: false
        })
    }

    reviewModalOpen = (productCode, productName, id) => {
        this.setState({
            reviewModal: true,
            product_code: productCode,
            product_name: productName,
            id: id
        })
    }
    
    postReview = () => {
        let productCode = this.state.product_code;
        let productName = this.state.product_name;
        let name = this.state.name;
        let rating = this.state.rating;
        let comments = this.state.comments;
        let id = this.state.id;

        // validation
        if (name.length == 0) {
            cogoToast.error('Plase Enter Your Name', {position: 'top-right'});
        } else if (rating.length === 0) {
            cogoToast.error('Plase Select Your Rating', {position: 'top-right'});
        } else if (comments.length === 0) {
            cogoToast.error('Plase Enter Your Comments', {position: 'top-right'});
        } else if (comments.length > 80) {
            cogoToast.error("Comments can't be more than 80 characters", {position: 'top-right'});
        } else {
            let myFormData = new FormData();
            myFormData.append('product_name', productName);
            myFormData.append('product_code', productCode);
            // KEYWORD PHẢI GIO61NG TRONG DATABASE
            myFormData.append('reviewer_name', name);
            myFormData.append('reviewer_photo', "");
            myFormData.append('reviewer_rating', rating);
            myFormData.append('reviewer_comments', comments);
            myFormData.append('id', id);

            axios.post(AppURL.PostReview, myFormData).then(response => {
                if(response.data === 1) {
                    cogoToast.success('Review Submitted', {position: 'top-right'});
                    this.setState({
                        reviewModal: false,
                        pageRefreshStatus: true
                    })
                } else {
                    cogoToast.error('Your Request Is Not Done Yet! Try Again', {position: 'top-right'});
                }
            }).catch(error => {
                cogoToast.error('Your Request Is Not Done Yet! Try Again', {position: 'top-right'});
            })
        }
    }

    pageRefresh = () => {
        if (this.state.pageRefreshStatus) {
            let URL = window.location;
            return (
                <Redirect to={URL}/>
            )
        }
      }
    
    dropdownSelect = (value) => {
        this.setState({
            dropdownValue: value,
            currentPage: 1,
        })

        let filteredOrderList = this.state.productData;

        if (value !== "All") {
            filteredOrderList = this.state.productData.filter(filteredOrder => filteredOrder['order_status'] === value);
        }

        this.setState({
            filteredOrderList: filteredOrderList
        })

        this.setState({
            totalPages: Math.ceil(filteredOrderList.length / 5),
        })
    }

    cancelOrder = (id) => {
        this.setState({
            cancelButton: "Sending Request..."
        })

        axios.get(AppURL.CancelOrder(id)).then(response => {
            if(response.data === 1) {
                cogoToast.success('Order Has Been Canceled', {position: 'top-right'});
                this.setState({
                    cancelButton: "Cancel Order",
                    pageRefreshStatus: true
                })
            } else {
                cogoToast.error('Your Request Is Not Done Yet! Try Again', {position: 'top-right'});
            }
        }).catch(error => {
            cogoToast.error('Your Request Is Not Done Yet! Try Again', {position: 'top-right'});
            this.setState({
                cancelButton: "Cancel Order"
            })
        })
    }

    handlePageChange(page) {
        this.setState({ currentPage: page });
        // ... do something with `page`
        window.scroll(0, 0);
      }


    render() {
        ///////////// PROTECT ROUTE //////////////////
        if (!localStorage.getItem('token')) {
            cogoToast.warn('You Should Log In First', {position: 'top-right'});
            return <Redirect to='login'/>
        }
        
        const orderList = this.state.filteredOrderList;
        // let filteredOrderList = orderList;

        // if (this.state.dropdownValue !== "All") {
        //     filteredOrderList = orderList.filter(filteredOrder => filteredOrder['order_status'] === this.state.dropdownValue);
        // }

        let paginationProductList = [];
        for (var i = 5 * (this.state.currentPage - 1); i <= (5 * this.state.currentPage) - 1; i++) {
            if (orderList[i] !== undefined) {
                paginationProductList.push(orderList[i]);
            }
        }

        const myView = paginationProductList.map((order, i) => {
            return (
                <Card key={i.toString()} className='card my-4'>                
                    <Card.Body>
                        <Row>
                            <Col md={5} lg={5} sm={12} xs={12} className='my-1'>
                                <h5 style={{color: '#337ab7'}}>Invoice: #{order['invoice_number']}</h5>
                                <h5 className="product-name">{order['product_name']}</h5>
                                <h6>{order['size']} | {order['color']}</h6>
                                <h6>Unit Price: <span style={{fontWeight: '300'}}>${order['unit_price']}</span></h6>
                                <h6> Quantity:<span style={{fontWeight: '300'}}> {order['quantity']} </span></h6>
                                <h6 style={{color: '#337ab7'}}>Total Price: ${order['unit_price']} x {order['quantity']} = ${order['total_price']}</h6>
                                <h6>Status: <span className={order['order_status'] == 'Pending' ? 'badge alert-danger' : (order['order_status'] == 'Processing' ? 'badge alert-warning' : (order['order_status'] == 'Completed' ? 'badge alert-success' : 'badge alert-secondary'))}>{order['order_status']}</span></h6>
                                { order['order_status'] == 'Pending' ? 
                                <Button onClick={() => this.cancelOrder(order['id'])} className='btn btn-danger'>
                                    {this.state.cancelButton}
                                </Button> :
                                (order['is_reviewed'] == 0 && order['order_status'] == 'Completed' ? 
                                    <Button onClick={() => this.reviewModalOpen(order['product_code'], order['product_name'], order['id'])} className='btn btn-info'>
                                        Post Review
                                    </Button> :

                                    ( order['order_status'] == 'Processing' || order['order_status'] == 'Canceled' ?
                                    null :
                                    <p className='badge alert-success'>
                                        Already Reviewed
                                    </p>
                                    )
                                )}
                                </Col>
                            <hr className='SmallH3'/>
                            <Col md={5} lg={5} sm={12} xs={12} className='my-1'>
                                <h5 style={{color: '#337ab7'}}>Delivery Information</h5>
                                <h6 className="product-name">Name: <span style={{fontWeight: '300'}}>{order['name']}</span></h6>
                                <h6 className="product-name">Address: <span style={{fontWeight: '300'}}>{order['delivery_address']}</span></h6>
                                <h6 className="product-name" style={{color: '#337ab7'}}>Order Date: <strong className='font-weight-bold'>{order['order_date']}</strong></h6>
                            </Col>
                            <hr className='SmallH3'/>

                            <Col md={2} lg={2} sm={12} xs={12} className='my-1'>
                                <h5 style={{color: '#337ab7'}}>Payment Method</h5>
                                <h6 className="product-name"><strong className='font-weight-bold'><span style={{fontWeight: '300'}}>{order['payment_method']}</span></strong></h6>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            )
        })

        return (
        <Fragment>
            <Container fluid={true} className='p-1'>
                <div className="section-title text-center mb-55 BigH2">
                    <h2>Order History by {this.props.user['name']}</h2>
                </div>       

                <div className="section-title text-center SmallH3">
                    <h3>Order History by {this.props.user['name']}</h3>
                </div>           

                <Row>
                    <DropdownButton variant='secondary' title="Filter Order" onSelect={this.dropdownSelect}>
                        <Dropdown.Item eventKey='All' className={this.state.dropdownValue === 'All' ? 'active-dropdown-item' : ''}>All Order</Dropdown.Item>
                        <Dropdown.Item eventKey='Pending' className={this.state.dropdownValue === 'Pending' ? 'active-dropdown-item' : ''}>Pending Order</Dropdown.Item>
                        <Dropdown.Item eventKey='Processing' className={this.state.dropdownValue === 'Processing' ? 'active-dropdown-item' : ''}>Processing Order</Dropdown.Item>
                        <Dropdown.Item eventKey='Completed' className={this.state.dropdownValue === 'Completed' ? 'active-dropdown-item' : ''}>Completed Order</Dropdown.Item>
                        <Dropdown.Item eventKey='Canceled' className={this.state.dropdownValue === 'Canceled' ? 'active-dropdown-item' : ''}>Canceled Order</Dropdown.Item>
                    </DropdownButton>
                </Row>

                {myView}
                {/* Pagination */}

                { this.state.productData.length !== 0 ?
                <Pagination
                    total={this.state.totalPages}
                    current={this.state.currentPage}
                    onPageChange={page => this.handlePageChange(page)}
                    previousLabel="Previous" 
                    nextLabel="Next"
                    /> : null }
       
            </Container>

            <Modal show={this.state.reviewModal} onHide={this.reviewModalClose}>
                <Modal.Header closeButton>
                <h6><i className="fa fa-bell"></i> Post Your Review</h6>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                        <label className="form-label">Product Name</label>
                        <input readOnly className="form-control" type="text" value={this.state.product_name}/>
                    </div>

                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                        <label className="form-label">Product Code</label>
                        <input readOnly className="form-control" type="text" value={this.state.product_code}/>
                    </div>
                    
                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                        <label className="form-label">Your Name</label>
                        <input onChange={(e) => {this.setState({name: e.target.value})}} className="form-control" type="text" value={this.state.name}/>
                    </div>

                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                        <label className="form-label">Select Product Rating</label>
                        <select onChange={(e) => {this.setState({rating: e.target.value})}} className="form-control">
                        <option value="">Choose</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        </select>
                    </div>

                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                        <label className="form-label">Your Comment</label>
                        <textarea rows={2} onChange={(e) => {this.setState({comments: e.target.value})}} className="form-control" type="text" placeholder="Enter Your Comments"/>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="success" onClick={this.postReview}>
                    Post
                </Button>

                <Button variant="danger" onClick={this.reviewModalClose}>
                    Close
                </Button>

                </Modal.Footer>
            </Modal>

            {this.pageRefresh()}
        </Fragment>
        )
    }
}

export default OrderList