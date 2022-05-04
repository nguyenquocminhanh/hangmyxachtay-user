import React, { Component, Fragment } from 'react'
import { Card, Col, Container, Row, Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class SearchResult extends Component {
  constructor(props) {
      super();
  }

  render() {
    const searchProductList = this.props.searchData;
    const searchKey = this.props.searchKey;
    const myView = searchProductList.map((searchProduct, i) => {
      return (
        <Col key={i.toString()} className='p-1' xl={3} lg={4} md={4} sm={6} xs={6}>
          <Link className='text-link' to={"/productdetails/" + searchProduct['id']}>
            <Card className='image-box card'>
              <img className='center' src={searchProduct['image']}/>
              <Card.Body>
                <p className='product-name-on-card'>{searchProduct['title']}</p>
                {searchProduct['special_price'] == null ? <p className='product-price-on-card'>Price: ${searchProduct['price']}</p> : <p className='product-price-on-card'>Price: <strike className='text-secondary'>${searchProduct['price']}</strike>&nbsp; ${searchProduct['special_price']}</p>}
              </Card.Body>
            </Card>
          </Link>
        </Col>
      )
    })

    return (
      <Fragment>
          <Container className='text-center' fluid={"true"}>
            <div className='Breadbody'>
                  <Breadcrumb>
                      <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
                      <Breadcrumb.Item>
                          <Link to={'/productbysearch/' + searchKey}>Search For: "{searchKey}"</Link>
                      </Breadcrumb.Item>
                  </Breadcrumb>
            </div>

            <div className='section-title text-center mb-40 mt-2'>
                <h2 className='BigH2'> Search Results for Keyword: "{searchKey}"</h2>
            </div>
            <Row className='p-1'>
                {myView}
            </Row>
          </Container>
      </Fragment>
    )
  }
}

export default SearchResult;