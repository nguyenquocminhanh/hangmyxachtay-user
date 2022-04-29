import React, { Component, Fragment } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import HomeSlider from './HomeSlider';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import SliderLoading from '../placeholder/SliderLoading';

class HomeTopMobile extends Component {
  constructor() {
    super();
    this.state = {
      sliderData: [],
      isLoading: '',
      // d-none là ko hiện
      mainDiv: "d-none"
    }
  }

  componentDidMount = () => {
    axios.get(AppURL.AllHomeSlider).then(response => {
      this.setState({
        sliderData: response.data,
        // placeholder
        isLoading: "d-none",
        // d-none là ko hiện
        mainDiv: ""
      })
    }).catch(error => {

    })
  } 

  render() {
    return (
        <Fragment>
          <div className={this.state.isLoading}>      {/* Placeholder loading */}
            <div class="ph-col-12">
                <div class="ph-picture"></div>
                <div class="ph-picture m-0"></div>
            </div>
          </div>

           <div className={this.state.mainDiv}>
            <Container className='p-0 m-0 overflow-hidden' fluid={"true"}>
                <Row className='p-0 m-0 overflow-hidden'>
                    <Col lg={12} md={12} smsm={12} className='p-0'>
                      <HomeSlider data={this.state.sliderData}/>
                    </Col>
                </Row>
            </Container>
          </div>
    </Fragment>
    )
  }
}

export default HomeTopMobile