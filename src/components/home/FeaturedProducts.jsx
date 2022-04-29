import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AppURL from '../../api/AppURL';
import FeaturedLoading from '../placeholder/FeaturedLoading';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

class FeaturedProducts extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.state = {
      featuredProducts : [],


      isLoading: '',
      // d-none là ko hiện
      mainDiv: "d-none"
    }
  }

  next() {
    this.slider.slickNext();
  }

  previous() {
    this.slider.slickPrev();
  }

  componentDidMount = () => {
    axios.get(AppURL.ProductListByRemark('BEST SELLER')).then(response => {
      if (response.status == 200) {
        this.setState({
          featuredProducts: response.data,
          // placeholder
          isLoading: "d-none",
          // d-none là ko hiện
          mainDiv: ""
        })
      }
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      arrows: false,
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
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    const featuredList = this.state.featuredProducts;
    const myView = featuredList.map((featuredProduct, i) => {
      return (
        <div key={i.toString()}>
          <Link className='text-link' to={"/productdetails/" + featuredProduct['id']}>
            <Card className='image-box card'>
              <div class="position-absolute top-0 start-0 m-2 product-discount"><span className="badge alert-warning">Best Seller</span></div>

              <div class="">
                  { featuredProduct['special_price'] == null ? 
                  null : 
                  <div class="position-absolute top-0 end-0 m-2 product-discount"><span class="badge alert-success">-{((100 * (featuredProduct['price'] - featuredProduct['special_price'])) / featuredProduct['price']).toFixed(0)}%</span></div>}
              </div>

              <img className='center' src={featuredProduct['image']}/>
              <Card.Body>
                <p className='product-name-on-card'>{featuredProduct['title']}</p>
                {featuredProduct['special_price'] == null ? <p className='text-secondary'>Price: ${featuredProduct['price']}</p> : <p className='product-price-on-card'>Price: <strike className='text-secondary'>${featuredProduct['price']}</strike>&nbsp; ${featuredProduct['special_price']}</p>}
              </Card.Body>
            </Card>
          </Link>
        </div>
      )
    })


    return (
      <Fragment>
        <FeaturedLoading isLoading={this.state.isLoading}/>

        <div className={this.state.mainDiv}>
          <Container className='text-center' fluid={"true"}>
            <div className='section-title text-center mb-55'>
              <h2>BEST SELLER
                <a className='btn btn-dark btn-sm ml-2 Btn-slider' onClick={this.previous}><i className='fa fa-angle-left'></i></a>
                <a className='btn btn-dark btn-sm ml-2 Btn-slider' onClick={this.next}><i className='fa fa-angle-right'></i></a>
              </h2>
              <p>Some Of Our Best Sellers, You May Like</p>
            </div>


            <Row>
                <Slider ref={c=>(this.slider=c)} {...settings}>
                    {myView}
                </Slider>              
            </Row>
          </Container>
        </div>
      </Fragment>
    )
  }
}

export default FeaturedProducts