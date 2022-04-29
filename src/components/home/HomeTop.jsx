import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AppURL from '../../api/AppURL';
import SliderLoading from '../placeholder/SliderLoading';
import HomeSlider from './HomeSlider'

import MegaMenu from './MegaMenu'

class HomeTop extends Component {
  constructor() {
    super();
    this.state = { 
      menuData: [],
      sliderData: [],

      isLoading: '',
      // d-none là ko hiện
      mainDiv: "d-none"
    }
  }

  componentDidMount = () => {
    axios.get(AppURL.AllCategory).then(response => {
      this.setState({
        menuData: response.data
      })
    }).catch(error => {

    })

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
          <SliderLoading 
            isLoading = {this.state.isLoading}
          />

          <div className={this.state.mainDiv}>
            <Container className='p-0 m-0 overflow-hidden' fluid={"true"}>
                <Row>
                    <Col lg={3} md={3} sm={12}>
                      <MegaMenu data={this.state.menuData}/>
                    </Col>

                    <Col lg={9} md={9} sm={12} className='p-0'>
                      <HomeSlider data={this.state.sliderData}/>
                    </Col>
                </Row>
            </Container>
          </div>
      </Fragment>
    )
  }
}

export default HomeTop