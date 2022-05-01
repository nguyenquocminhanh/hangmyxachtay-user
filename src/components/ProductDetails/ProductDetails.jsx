import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Form, Button, Breadcrumb } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import SuggestedProduct from './SuggestedProduct';

import cogoToast from 'cogo-toast';

import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import { Redirect } from 'react-router-dom';

import parse from 'html-react-parser';

class  ProductDetails extends Component {
  constructor() {
      super();
      this.state = {
          previewImg: "0",

          isSize: null,
          isColor: null,
          size: '',
          color: '',
          quantity: '',
          productCode: null,
          productID: null,
          addToCartButton: "Add To Cart",
          orderNowButton: "Order Now",

          pageRefreshStatus: false,
          pageRedirectStatus: false,

          addToFavButton: "Favourite",

          reviewData: [],
          isFavorite: false,
      }
  }

  componentDidMount = () => {
    // get product reviewed
    axios.get(AppURL.ProductReviews(this.props.productData['productList'][0]['product_code'])).then(response => {
        if (response.status == 200) {
            this.setState({
                reviewData: response.data,
                isLoading: 'd-none',
                // d-none là ko hiện
                mainDiv: ""
            })
        }
    }).catch(error => {
        console.log(error)
    });
  }

  imageOnclick = (event) => {
    let imgSrc = event.target.getAttribute('src');
    this.setState({previewImg: imgSrc})
    
  }

  starsGenerate = (rate) => {
    let myStars;

    if (rate < 1.5 && rate > 0) { 
        myStars = (
            <span className="text-warning">
                <i className="fa fa-star"></i> 
            </span>
        )
    }
    else if (1.5 <= rate && rate < 2.5) {
        myStars = (
            <span className="text-warning">
                <i className="fa fa-star"></i> 
                <i className="fa fa-star"></i> 
            </span>
        )
    }
    else if (2.5 <= rate && rate < 3.5) {
        myStars = (
            <span className="text-warning">
                <i className="fa fa-star"></i> 
                <i className="fa fa-star"></i> 
                <i className="fa fa-star"></i> 
            </span>
        )
    }
    else if (3.5 <= rate && rate < 4.5) {
        myStars = (
            <span className="text-warning">
                <i className="fa fa-star"></i> 
                <i className="fa fa-star"></i> 
                <i className="fa fa-star"></i> 
                <i className="fa fa-star"></i> 
            </span>
        )
    }
    else if (rate >= 4.5) {
        myStars = (
            <span className="text-warning">
                <i className="fa fa-star"></i> 
                <i className="fa fa-star"></i> 
                <i className="fa fa-star"></i> 
                <i className="fa fa-star"></i> 
                <i className="fa fa-star"></i> 
            </span>
        )
    }
    else {
     myStars =  <span className="text-warning"></span>  
    }
    return myStars;
  }

  // CART actions
  colorOnChange = (event) => {
    this.setState({
        color: event.target.value
    })
  }

  sizeOnChange = (event) => {
    this.setState({
        size: event.target.value
    })
  }

  quantityOnChange = (event) => {
    this.setState({
        quantity: event.target.value
    })
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
    if (this.state.pageRedirectStatus) {
        let URL = window.location;
        return (
            <Redirect to='/cart'/>
        )
    }
}

  addToCart = () => {
    let isSize = this.state.isSize;
    let isColor = this.state.isColor;
    let color = this.state.color;
    let size = this.state.size;
    let quantity = this.state.quantity;
    let productCode = this.state.productCode;
    let product_id = this.state.productID;
    
    let email = this.props.user['email'];

    // validation before add to cart
    if (isColor === "YES" && color.length === 0) {
        cogoToast.error('Please Select Color', {position: 'top-right'});
    } else if (isSize === "YES" && size.length === 0) {
        cogoToast.error('Please Select Size', {position: 'top-right'});
    } else if (quantity.length === 0) {
        cogoToast.error('Please Select Quantity', {position: 'top-right'});
    } else if (!localStorage.getItem('token')) {
        cogoToast.warn('Please Login First', {position: 'top-right'});
    } else {            // all checked PASSED!!
        this.setState({addToCartButton: "Adding..."});
        let formData = new FormData();
        formData.append("color", color);
        formData.append("size", size);
        formData.append("quantity", quantity);
        formData.append("product_code", productCode);
        formData.append("email", email);
        formData.append("product_id", product_id);

        axios.post(AppURL.AddToCart, formData).then(response => {
        
            cogoToast.success('Product Added Successfully!!', {position: 'top-right'});
            this.setState({
                addToCartButton: "Add To Cart",
                // pageRefreshStatus: true
            })
            // update cart in redux store
            this.props.setCartData(response.data)

        }).catch(error => {
            cogoToast.error('Your Request Is Not Done Yet! Try Again', {position: 'top-right'});
            this.setState({
                addToCartButton: "Add To Cart",
            })
        })
    }

  }

  addToFavourite = () => {
    let productCode = this.state.productCode;
    let email = this.props.user['email'];
    let productID = this.state.productID;

    if (!localStorage.getItem('token')) {
        cogoToast.warn('Please Login First', {position: 'top-right'});
    } else {
        this.setState({
            addToFavButton: 'Adding...'
        });

        axios.get(AppURL.AddToFavourite(productCode, email, productID)).then(response => {
            cogoToast.success('Product Is Now In Favourite', {position: 'top-right'});
            this.setState({
                addToFavButton: "Favourite",
                // pageRefreshStatus: true
            })
            // update favData in AppRoute
            this.props.setFavData(response.data);
        }).catch(error => {
            cogoToast.error('Your Request Is Not Done Yet! Try Again', {position: 'top-right'});
            this.setState({
                addToFavButton: "Favourite",
            })
        })
    }
  }

  orderNow = () => {
    let isSize = this.state.isSize;
    let isColor = this.state.isColor;
    let color = this.state.color;
    let size = this.state.size;
    let quantity = this.state.quantity;
    let productCode = this.state.productCode;
    let product_id = this.state.productID;
    
    let email = this.props.user['email'];

    // validation before add to cart
    if (isColor === "YES" && color.length === 0) {
        cogoToast.error('Please Select Color', {position: 'top-right'});
    } else if (isSize === "YES" && size.length === 0) {
        cogoToast.error('Please Select Size', {position: 'top-right'});
    } else if (quantity.length === 0) {
        cogoToast.error('Please Select Quantity', {position: 'top-right'});
    } else if (!localStorage.getItem('token')) {
        cogoToast.warn('Please Login First', {position: 'top-right'});
    } else {            // all checked PASSED!!
        this.setState({orderNowButton: "Adding..."});
        let formData = new FormData();
        formData.append("color", color);
        formData.append("size", size);
        formData.append("quantity", quantity);
        formData.append("product_code", productCode);
        formData.append("email", email);
        formData.append("product_id", product_id);

        axios.post(AppURL.AddToCart, formData).then(response => {
            cogoToast.success('Product Added Successfully!!', {position: 'top-right'});
            // update cart in redux store
            this.props.setCartData(response.data)
            this.setState({
                orderNowButton: "Order Now",
                // ***** //
                pageRedirectStatus: true
            })
            
        }).catch(error => {
            cogoToast.error('Your Request Is Not Done Yet! Try Again', {position: 'top-right'});
            this.setState({
                orderNowButton: "Order Now",
                pageRedirectStatus: false
            })
        })
    }
  }


  render() { 
    const productData = this.props.productData;
    let title = productData['productList'][0]['title'];
    let short_description = productData['productDetails'][0]['short_description'];
    let long_description = productData['productDetails'][0]['long_description'];
    let brand = productData['productList'][0]['brand'];
    let image = productData['productList'][0]['image'];
    let category = productData['productList'][0]['category'];
    let price = productData['productList'][0]['price'];
    let product_code = productData['productList'][0]['product_code'];
    let remark = productData['productList'][0]['remark'];
    let number_rate = productData['productList'][0]['number_rate'];
    let special_price = productData['productList'][0]['special_price'];
    let star = productData['productList'][0]['star'];
    let subcategory = productData['productList'][0]['subcategory'];
    let image_one = productData['productDetails'][0]['image_one'];
    let image_two = productData['productDetails'][0]['image_two'];
    let image_three = productData['productDetails'][0]['image_three'];
    let image_four = productData['productDetails'][0]['image_four'];
    let color = productData['productDetails'][0]['color'];
    let size = productData['productDetails'][0]['size'];
    let product_id = productData['productDetails'][0]['product_id'];
    let soldout = productData['productList'][0]['soldout']; // 0 or 1

    // PREVIEW IMAGE
    if (this.state.previewImg === "0") {
        this.setState({previewImg: image})
    }

    // REVIEW
    const reviewData = this.state.reviewData;
    let myReview;
    if (reviewData.length > 0) {
        myReview = reviewData.map((review, i) => {
            return (
                <div key={i.toString()}>
                    <p className=" p-0 my-1">
                        <span className="Review-Title">{review['reviewer_name']} &nbsp;</span> 
                        {this.starsGenerate(review['reviewer_rating'])}
                    </p>
                    <p className='text-secondary p-0 my-1'>
                        Reviewed on {review['review_date']}
                    </p>
                    <p className='p-0 my-1'>
                        {review['reviewer_comments']}
                    </p>
                </div>
            ) 
        })
    } else {
        myReview = <p>There have no review yet</p>
    }

    // check whether product has size or not
    if (this.state.isSize === null) {
        if (size != 'na') {
            this.setState({
                isSize: "YES"
            })
        } else {
            this.setState({
                isSize: "NO"
            })
        }
    }

    // check whether product has color or not
    if (this.state.isColor === null) {
        if (color != 'na') {
            this.setState({
                isColor: "YES"
            })
        } else {
            this.setState({
                isColor: "NO"
            })
        }
    }

    // get productCode
    if (this.state.productCode === null) {
        this.setState({
            productCode: product_code
        })

        // get favorite data tu AppRoute de check xem loved chua 
        this.props.favData.forEach(fav => {
            if(fav['product_code'] === product_code) {
                this.setState({
                    isFavorite: true
                })
            }
        })

    }      

    if (this.state.productID === null) {
        this.setState({
            productID: product_id
        })
    }

    return (
      <Fragment>
          <Container fluid={true} className="BetweenTwoSection">
            <div className='Breadbody'>
                  <Breadcrumb>
                      <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
                      <Breadcrumb.Item>
                          <Link to={'/productcategory/' + category}>{category}</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                          <Link to={'/productsubcategory/' + category + '/' + subcategory}>{subcategory}</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                          <Link to={'/productdetails/' + product_id}>{title}</Link>
                      </Breadcrumb.Item>
                  </Breadcrumb>
            </div>

            <Row className="p-2">
                <Col className="shadow-sm bg-white pb-3 mt-4" md={12} lg={12} sm={12} xs={12}>
                    <Row>
                        <Col className="" md={6} lg={6} sm={12} xs={12}>
                        {/* <img id="previewImg" className="w-100 Bigimage" src={image} /> */}
                        
                        <div className='position-relative'>
                            { special_price == null ? null : <span className="badge alert-success fs-6">-{((100 * (price - special_price)) / price).toFixed(0)}%</span> }
                           
                            { soldout == 1 ? 
                            <span className="badge alert-secondary fs-6 position-absolute end-0" style={{zIndex: '1'}}>SOLD OUT</span> : 
                            null }
                        </div>
                            
                        <InnerImageZoom className='DetailImage' zoomScale={1.5} zoomType={"hover"} src={this.state.previewImg} zoomSrc={this.state.previewImg} />

                        <Container className="my-3 p-0">
                            <Row>
                                <Col className="px-1"  md={3} lg={3} sm={3} xs={3}>
                                    <img onClick={this.imageOnclick} className="w-100 Smallimage" src={image_one} />
                                </Col>
                                <Col className="px-1" md={3} lg={3} sm={3} xs={3}>
                                    <img onClick={this.imageOnclick} className="w-100 Smallimage" src={image_two} />
                                </Col>
                                <Col className="px-1" md={3} lg={3} sm={3} xs={3}>
                                    <img onClick={this.imageOnclick} className="w-100 Smallimage" src={image_three} />
                                </Col>
                                <Col className="px-1" md={3} lg={3} sm={3} xs={3}>
                                    <img onClick={this.imageOnclick} className="w-100 Smallimage" src={image_four} />
                                </Col>
                            </Row>
                        </Container>
                        </Col>
                        <Col className="p-2 " md={6} lg={6} sm={12} xs={12}>
                        <h5 className="Product-Name">{title} <span className="badge alert-success">{remark}</span></h5>
                        <h6 className="section-sub-title">{short_description}</h6>

                        {/* Price */}                        
                        {special_price != null?
                        <p className='Product-price-on-card mb-1'> 
                            Price: <strike className='text-secondary'>${price}</strike> ${special_price}
                        </p> : 
                        <p className='Product-price-on-card m-0 p-0'> 
                            Price: ${price}
                        </p> }

                        <h6 className="mt-2">Category: <span style={{fontWeight: '300'}}>{category}</span></h6>

                        <h6 className="mt-2">Subcategory: <span style={{fontWeight: '300'}}>{subcategory}</span></h6>

                        <h6 className="mt-2">Brand: <span style={{fontWeight: '300'}}>{brand}</span></h6>

                        <h6 className="mt-2">Product Code: <span style={{fontWeight: '300'}}>{product_code}</span></h6>

                        {/* COLOR OPTION */}
                        {color !== 'na' ? 
                        <div>
                            <h6 className="mt-2">Choose Color</h6>
                            <select onChange={this.colorOnChange} className='form-control form-select'>
                                <option>Choose Color</option>
                                {color.split(',').map((colorOption, i) => {
                                    return <option key={i.toString()} value={colorOption}>{colorOption}</option>
                                })}
                            </select>
                        </div> : <div className='d-none'></div>}
                        
                        {/* SIZE OPTION */}
                        {size !== 'na' ? 
                        <div>
                            <h6 className="mt-2">Choose Size</h6>
                            <select onChange={this.sizeOnChange} className='form-control form-select'>
                                <option>Choose Size</option>
                                {size.split(',').map((sizeOption, i) => {
                                    return <option key={i.toString()} value={sizeOption}>{sizeOption}</option>
                                })}
                            </select>
                        </div> : <div className='d-none'></div>}

                        {/* QUANTITY */}
                            
                        <div>
                            <h6 className="mt-2">Choose Quantity</h6>
                            {soldout == 1 ?
                            <select className='form-control form-select' disabled>
                                <option>Sold Out</option>
                            </select>
                            : 
                            <select onChange={this.quantityOnChange} className='form-control form-select'>    
                                <option>Choose Quantity</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                                <option value='8'>8</option>
                                <option value='9'>9</option>
                                <option value='10'>10</option>
                            </select> }
                            
                        </div> 

                        <div className="input-group mt-3">
                            {soldout == 0 ? 
                            <button className="btn site-btn m-1 " onClick={this.addToCart}> <i className="fa fa-shopping-cart"></i> {this.state.addToCartButton} </button> :
                            <button className="btn site-btn m-1 " disabled> <i className="fa fa-shopping-cart"></i> {this.state.addToCartButton} </button>}
                            
                            {soldout == 0 ?
                            <button className="btn btn-primary m-1" onClick={this.orderNow}> <i className="fa fa-car"></i> {this.state.orderNowButton} </button> :
                            <button className="btn site-btn m-1" disabled> <i className="fa fa-car"></i> {this.state.orderNowButton} </button>}
                            
                            {this.state.isFavorite ? 
                            <button className="btn btn-danger m-1" disabled> <i className="fa fa-heart"></i> Liked </button> :
                            <button className="btn btn-danger m-1" onClick={this.addToFavourite}> <i className="fa fa-heart"></i> {this.state.addToFavButton} </button>}
                        </div>
                        </Col>
                    </Row>

                    <Row className='p-2'>
                        <Col className=""md={6} lg={6} sm={12} xs={12}>
                            <h6 className="mt-2">DETAILS</h6>
                            {parse(long_description)}
                        </Col>

                        <Col className="mt-3" md={6} lg={6} sm={12} xs={12}>
                            <h6 className="">REVIEWS &nbsp; {this.starsGenerate(star)} &nbsp; {star} out of 5 ({number_rate} {number_rate <= 1 ? 'rating' : 'ratings'})</h6>
                            {myReview}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>

        <SuggestedProduct product_code={product_code} subcategory={subcategory}/>

        {this.pageRefresh()}
        {this.pageRedirect()}
      </Fragment>
    )
  }
}

export default ProductDetails