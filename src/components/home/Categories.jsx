import React, { Component, Fragment } from 'react'
import { Col, Container, Row, Card } from 'react-bootstrap'
import axios from 'axios';
import AppURL from '../../api/AppURL';
import { Link } from 'react-router-dom';
import CategoryLoading from '../placeholder/CategoryLoading';

class Categories extends Component {
    constructor() {
    super();
    this.state = {
      menuData: [],

      isLoading: '',
      // d-none là ko hiện
      mainDiv: "d-none"
    }
  }

  componentDidMount = () => {
    axios.get(AppURL.AllCategory).then(response => {
      this.setState({
        menuData: response.data,
        // placeholder
        isLoading: "d-none",
        // d-none là ko hiện
        mainDiv: ""
      })
    }).catch(error => {

    })
  }
  render() {
    const categoryList = this.state.menuData;
    const myView = categoryList.map((category, i) => {
        return (
            <Col key={i.toString()} className='p-2' key={1} xl={2} lg={2} md={3} sm={6} xs={12}>
              <Link className='text-link' to={'/productcategory/' + category['category_name']}>
                <Card className='h-100 w-100 text-center hover-effect'>
                    <Card.Body>
                        <img src={category['category_image']}/>
                        <h5 className='category-name'>{category['category_name']}</h5>
                    </Card.Body>
                </Card>
              </Link> 
            </Col>
        )
    })

    return (
      <Fragment>
          <CategoryLoading isLoading={this.state.isLoading}/>

          <div className={this.state.mainDiv}>
            <Container className='text-center' fluid={"true"}>
              <div className='section-title text-center mb-55'>
                  <h2>CATEGORIES</h2>
                  <p>Shop By Categories</p>
              </div>

              <Row>
                <Col key={1} xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Row>
                      {myView}
                  </Row>
                </Col>
              </Row>
            </Container>
          </div>
      </Fragment>
    )
  }
}

export default Categories