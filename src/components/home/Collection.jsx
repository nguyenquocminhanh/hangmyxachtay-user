import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import AppURL from '../../api/AppURL';
import { Link } from 'react-router-dom'
import CollectionLoading from '../placeholder/CollectionLoading';

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

class Collection extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.state = {
      collectionProducts : [],

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
    axios.get(AppURL.ProductListByRemark('SALE')).then(response => {
      if (response.status == 200) {
        this.setState({
            collectionProducts: response.data,
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
      rows: 2,
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 2500,
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
            slidesToScroll: 1,
          }
        }
      ]
    };

    const collectionList = this.state.collectionProducts;
    const myView = collectionList.map((collectionProduct, i) => {
      return (
        <div key={i.toString()}>
          <Link className='text-link' to={"/productdetails/" + collectionProduct['id']}>
            <Card className='image-box card'>
              <div class="position-absolute top-0 start-0 m-2 product-discount"><span className="badge alert-warning">Sale</span></div>
              
              <div class="">
                 { collectionProduct['special_price'] == 'na' ? 
                 null : 
                 <div class="position-absolute top-0 end-0 m-2 product-discount"><span class="badge alert-success">-{((100 * (collectionProduct['price'] - collectionProduct['special_price'])) / collectionProduct['price']).toFixed(0)}%</span></div>}
              </div>

              <img className='center' src={collectionProduct['image']}/>
             
              <Card.Body>
                <p className='product-name-on-card'>{collectionProduct['title']}</p>
                {collectionProduct['special_price'] == 'na' ? <p className='product-price-on-card'>Price: ${collectionProduct['price']}</p> : <p className='product-price-on-card'>Price: <strike className='text-secondary'>${collectionProduct['price']}</strike>&nbsp; ${collectionProduct['special_price']}</p>}
              </Card.Body>
            </Card>
          </Link>
        </div>
      )
    })

    return (
      <Fragment>
          <CollectionLoading isLoading={this.state.isLoading}/>
          <div className={this.state.mainDiv}>
            <Container className='text-center' fluid={"true"}>
              <div className='section-title text-center mb-55'>
                  <h2>HOT DEALS
                    <a className='btn btn-dark btn-sm ml-2 Btn-slider' onClick={this.previous}><i className='fa fa-angle-left'></i></a>
                
                    <a className='btn btn-dark btn-sm ml-2 Btn-slider' onClick={this.next}><i className='fa fa-angle-right'></i></a>
                  </h2>
                  <p>Great Shop With Great Price Ever</p>
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

export default Collection