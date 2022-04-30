import axios from 'axios';
import React, { Component, Fragment } from 'react'
import {Navbar,Container, Row, Col,Button,Card, Modal} from 'react-bootstrap';
import AppURL from '../../api/AppURL';
import cogoToast from 'cogo-toast';
import { Redirect } from 'react-router-dom';
import CartLoading from '../placeholder/CartLoading';

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      confirmButton: 'Confirm Order',
      city: "",
      payment: "",
      name: "",
      address: "",

      isLoading: '',
      // d-none là ko hiện
      mainDiv: "d-none",

      pageRefreshStatus: false,
      pageRedirectStatus: false,

      notiModal: true,
    }
  }

  componentDidMount = () => {
    this.setState({
        name: this.props.user['name'],
        address: this.props.user['address'] == null ? '' : this.props.user['address']
    })

    // check sold out
    this.props.cart.forEach(product => 
        axios.get(AppURL.CheckSoldOut(product['product_code'])).then(res =>{
            if (res.data === 1) {
                cogoToast.loading(product['product_name'] + ' Was Sold Out', {position: 'top-right'}).then(() => {
                    this.removeCartItem(product['id']);
                });
            } 
        }).catch(err => {
            console.log(err)
        }));
  }

  removeCartItem = (id) => {
    axios.get(AppURL.RemoveCartList(id, this.props.user['email'])).then(response => {
        // set cart on cart redux
        this.props.setCartData(response.data);
        cogoToast.success('Product Item Removed', {position: 'top-right'});

    }).catch(error => {
        cogoToast.error('Your Request Is Not Done Yet! Try Again', {position: 'top-right'});
    })
  }

  itemPlus = (id, quantity, price) => {
    axios.get(AppURL.CartItemPlus(id, quantity, price, this.props.user['email'])).then(response => {
        // set cart on cart redux
        this.props.setCartData(response.data);
        cogoToast.success('Product Item Increased', {position: 'top-right'});

    }).catch(error => {
        cogoToast.error('Your Request Is Not Done Yet! Try Again', {position: 'top-right'});
    })
  }

  itemMinus = (id, quantity, price) => {
    axios.get(AppURL.CartItemMinus(id, quantity, price, this.props.user['email'])).then(response => {
        // set cart on cart redux
        this.props.setCartData(response.data);

        cogoToast.success('Product Item Decreased', {position: 'top-right'});

    }).catch(error => {
        cogoToast.error('Your Request Is Not Done Yet! Try Again', {position: 'top-right'});
    })
  }

  confirmOrder = () => {
 
    let city = this.state.city;
    let payment = this.state.payment;
    let name = this.state.name;
    let address = this.state.address;
    let email = this.props.user['email'];

    // validation
    if (city.length == 0) {
        cogoToast.error('Plase Select City', {position: 'top-right'});
    } else if (payment.length === 0) {
        cogoToast.error('Plase Select Payment', {position: 'top-right'});
    } else if (name.length === 0) {
        cogoToast.error('Plase Enter Your Name', {position: 'top-right'});
    } else if (address.length === 0) {
        cogoToast.error('Plase Enter Your Address', {position: 'top-right'});
    } else {            // validate OK
        // ko bao g đụng hàng
        let invoice = new Date().getTime();
        let myFormData = new FormData();
        myFormData.append('city', city);
        // KEYWORD PHẢI GIO61NG TRONG DATABASE
        myFormData.append('payment_method', payment);
        myFormData.append('name', name);
        myFormData.append('delivery_address', address);
        myFormData.append('email', email);
        myFormData.append('invoice_number', invoice);
        myFormData.append('delivery_charge', "00");
        
        axios.post(AppURL.CartOrder, myFormData).then(response => {
            if(response.data === 1) {
                cogoToast.success('Order Request Received', {position: 'top-right'});
                this.setState({
                    pageRedirectStatus: true
                })
                // set cart on cart redux
                let emptyCart = [];
                this.props.setCartData(emptyCart);
            } else {
                cogoToast.info(response.data.message, {position: 'top-right'});
            }
        }).catch(error => {
            cogoToast.info(error.response.data.message, {position: 'top-right'});
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

  pageRedirect = () => {
    if (this.state.pageRedirectStatus === true) {
        return (
            <Redirect to='/orderlist'/>
        )
    }
  }

  handleClose = () => {
      this.setState({
          notiModal: false
      })
  }

  render() {
    ///////////// PROTECT ROUTE //////////////////
    if (!localStorage.getItem('token')) {
        cogoToast.warn('You Should Log In First', {position: 'top-right'});
        return <Redirect to='login'/>
    }

    const cartList = this.props.cart;

    let totalPriceSum = 0;

    const myView = cartList.map((cartItem, i) => {
      totalPriceSum = Number(totalPriceSum) + Number(cartItem['total_price']);

      return (
        <Card key={i.toString()} >                
            <Card.Body>
                <Row>
                    <Col md={6} lg={3} sm={6} xs={6}>
                        <img className="cart-product-img" src={cartItem['image']}/>
                    </Col>

                    <Col md={6} lg={6} sm={6} xs={6}>
                        <h5 className="product-name">{cartItem['product_name']}</h5>
                        <h6> Quantity = {cartItem['quantity']} </h6>
                        <h6>Price = ${cartItem['unit_price']} x {cartItem['quantity']} = ${cartItem['total_price']}</h6>
                        <h6>{cartItem['size']} | {cartItem['color']}</h6>
                    </Col>

                    <Col md={12} lg={3} sm={12} xs={12} className='CartButton'>
                        
                        <Button onClick={() => this.itemPlus(cartItem['id'], cartItem['quantity'], cartItem['unit_price'])} className='btn p-2 site-btn mx-1'><i className='fa fa-plus m-0'></i></Button>

                        <Button onClick={() => this.itemMinus(cartItem['id'], cartItem['quantity'], cartItem['unit_price'])} className='btn p-2 site-btn mx-1'><i className='fa fa-minus m-0'></i></Button>

                        <Button onClick={() => this.removeCartItem(cartItem['id'])} className="btn p-2 site-btn mx-1"><i className="fa fa-trash-alt m-0"></i> </Button>

                    </Col>
                </Row>              
            </Card.Body>               
        </Card>
      )
    })



    return (
      <Fragment>
           <Container fluid={true}>   
            <div className="section-title text-center mb-55"><h2>Cart List</h2></div>
            <Row>
                {/* Product Cart Data */}
                <Col className="p-1" lg={7} md={7} sm={12} xs={12} >
                    {this.props.loading ?
                        <CartLoading/> :
                        myView}
                </Col>
                
                {/* Information Form */}
                <Col className="p-1" lg={5} md={5} sm={12} xs={12} >
                    <div className="card p-2">
                        <div className="card-body">
                            <div className="container-fluid ">
                                <div className="row">
                                    <div className="col-md-12 p-1  col-lg-12 col-sm-12 col-12">
                                        <h5 className="Product-Name text-danger">Total Due: ${totalPriceSum}</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                        <label className="form-label">Choose City</label>
                                        <select onChange={(e) => {this.setState({city: e.target.value})}} className="form-control">
                                            <option value="">Choose</option>
                                            <option value="Ho Chi Minh City">Ho Chi Minh City</option>
                                            <option value="Boston">Boston</option>
                                            <option value="San Francisco">San Francisco </option>
                                            <option value="Los Angeles">Los Angeles </option>
                                            <option value="New York City">New York City </option>
                                            <option value="Texas">Texas </option>
                                            <option value="Tampa">Tampa  </option>
                                        </select>
                                    </div>
                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                        <label className="form-label">Choose Payment Method</label>
                                        <select onChange={(e) => {this.setState({payment: e.target.value})}} className="form-control">
                                        <option value="">Choose</option>
                                        <option value="Cash On Delivery">Cash On Delivery</option>
                                        <option value="Zelle">Zelle</option>
                                        <option value="Venmo">Venmo</option>
                                        </select>
                                    </div>
                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                        <label className="form-label">Your Name</label>
                                        <input onChange={(e) => {this.setState({name: e.target.value})}} className="form-control" type="text" placeholder="" value={this.state.name}/>
                                    </div>

                                    <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                        <label className="form-label">Delivery Address</label>
                                        <textarea  onChange={(e) => {this.setState({address: e.target.value})}} rows={2}  className="form-control" type="text" placeholder="" value={this.state.address}/>
                                    </div>
                                    <div className="d-grid gap-2 col-8 mx-auto mt-3">
                                        <button onClick={this.confirmOrder} className="btn btn-lg site-btn"> {this.state.confirmButton} </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
           </Row>
        </Container>



        {this.pageRefresh()}
        {this.pageRedirect()}

      </Fragment>
    )
  }
}

export default Cart