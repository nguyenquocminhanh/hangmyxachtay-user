import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AppURL from '../../api/AppURL';

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

class SuggestedProduct extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.state = {
      productData: []

    }
  }
  
  next() {
    this.slider.slickNext();
  }

  previous() {
    this.slider.slickPrev();
  }

  componentDidMount = () => {
    let subcategory = this.props.subcategory;

    axios.get(AppURL.SimilarProductList(subcategory)).then(response => {
      this.setState({
        productData: response.data
      })
    }).catch(error => {

    })
  }

  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 2000,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      arrows: false,
      dots: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    };

    const similarProducts = this.state.productData;
    const myView = similarProducts.map((similarProduct, i) => {
      return (  
       <Col className='p-1'key={i.toString()} xl={2} lg={2} md={2} sm={4} xs={6}>
          <Link className='text-link' to={ "/productdetails/" + similarProduct['id']}>
            <Card className='image-box card'>
              <img className='center' src={similarProduct['image']}/>
              <Card.Body>
                <p className='product-name-on-card'>{similarProduct['title']}</p>
                {similarProduct['special_price'] != null?
                <p className='Product-price-on-card'> 
                  Price: <strike className='text-secondary'>${similarProduct['price']}</strike> $${similarProduct['special_price']}
                </p> : 
                <p className='Product-price-on-card'> 
                  Price: ${similarProduct['price']}
                </p> }
              </Card.Body>
            </Card>
          </Link>
        </Col>)
    })

    return (
      <Fragment>
          <Container className='text-center' fluid={"true"}>
          <div className='section-title text-center mb-55'>
            <h2>YOU MAY LIKE
              <a className='btn btn-dark btn-sm ml-2 Btn-slider' onClick={this.previous}><i className='fa fa-angle-left'></i></a>
              <a className='btn btn-dark btn-sm ml-2 Btn-slider' onClick={this.next}><i className='fa fa-angle-right'></i></a>
            </h2>
            <p>Some Of Our Exclusive Collection, You May Like</p>
          </div>

          <Row>

            <Slider ref={c=>(this.slider=c)} {...settings}>
                {myView}
            </Slider> 
            
          </Row>
        </Container>
      </Fragment>
    )
  }
}

export default SuggestedProduct