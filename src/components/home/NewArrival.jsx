import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { Container, Row, Card } from 'react-bootstrap'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import AppURL from '../../api/AppURL';
import NewArrivalLoading from '../placeholder/NewArrivalLoading';
import { Link } from 'react-router-dom';

class NewArrival extends Component {
  constructor(props) {
      super(props);
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
      this.state = {
        newProducts : [],

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
    axios.get(AppURL.ProductListByRemark('NEW')).then(response => {
      if (response.status == 200) {
        this.setState({
            newProducts: response.data,

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
          // Tablet
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
          // phone
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    const newList = this.state.newProducts;
    const myView = newList.map((newProduct, i) => {
      return (
        <div key={i.toString()}>
          <Link className='text-link' to={"/productdetails/" + newProduct['id']}>
            <Card className='image-box card'>
                <div class="position-absolute top-0 start-0 m-2 product-discount">
                  <span class="badge alert-warning">NEW</span>
                </div>

                <div class="">
                  { newProduct['special_price'] == 'na' ? 
                  null : 
                  <div class="position-absolute top-0 end-0 m-2 product-discount"><span class="badge alert-success">-{((100 * (newProduct['price'] - newProduct['special_price'])) / newProduct['price']).toFixed(0)}%</span></div>}
                </div>

                <img className='center' src={newProduct['image']}/>
                <Card.Body>
                <p className='product-name-on-card'>{newProduct['title']}</p>
                {newProduct['special_price'] == 'na' ? <p className='product-price-on-card'>Price: ${newProduct['price']}</p> : <p className='product-price-on-card'>Price: <strike className='text-secondary'>${newProduct['price']}</strike>&nbsp; ${newProduct['special_price']}</p>}
                </Card.Body>
            </Card>
          </Link>
        </div>
      )
    })
     
    return (
      <Fragment>
          <NewArrivalLoading isLoading={this.state.isLoading}/>

          <div className={this.state.mainDiv}>
          <Container fluid={"true"} className='text-center'>
              <div className='section-title text-center mb-55' style={{maxWidth: '100%'}}>
                <h2>NEW ARRIVAL
                    <a className='btn btn-dark btn-sm ml-2 Btn-slider' onClick={this.previous}><i className='fa fa-angle-left'></i></a>
           
                    <a className='btn btn-dark btn-sm ml-2 Btn-slider' onClick={this.next}><i className='fa fa-angle-right'></i></a>
                </h2>
                <p>Some Of Our New Products Just Arrived</p>
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

export default NewArrival