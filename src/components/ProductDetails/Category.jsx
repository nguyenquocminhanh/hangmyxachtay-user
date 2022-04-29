import React, { Component, Fragment } from 'react'
import { Card, Col, Container, Row, Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import Pagination from 'react-responsive-pagination';

class Category extends Component {
  constructor(props) {
      super(props);

      this.state = {
        totalPages: 0,
        currentPage: 1,
      }
  }

  componentDidMount = () => {
    this.setState({
      totalPages: Math.ceil(this.props.productData.length / 12)
    })
  }

  handlePageChange(page) {
    this.setState({ currentPage: page });
    // ... do something with `page`
    window.scroll(0, 0);
  }

  render() {
    const categoryProductList = this.props.productData;
    // for breadcrumb
    const category = this.props.category;

    let paginationProductList = [];
    for (var i = 12 * (this.state.currentPage - 1); i <= (12 * this.state.currentPage) - 1; i++) {
      if (categoryProductList[i] !== undefined) {
        paginationProductList.push(categoryProductList[i]);
      }
    }

    const myView = paginationProductList.map((categoryProduct, i) => {
      return (
        <Col key={i.toString()} className='p-1'xl={3} lg={4} md={4} sm={6} xs={6}>
          <Link className='text-link' to={"/productdetails/" + categoryProduct['id']}>
            <Card className='image-box card'>
              <img className='center' src={categoryProduct['image']}/>
              {/* Sale Off */}
              <div class="">
                 { categoryProduct['special_price'] == null ? 
                 null : 
                 <div class="position-absolute top-0 end-0 m-2 product-discount"><span className="badge alert-success">-{((100 * (categoryProduct['price'] - categoryProduct['special_price'])) / categoryProduct['price']).toFixed(0)}%</span></div>}
              </div>
              <Card.Body>
                <p className='product-name-on-card'>{categoryProduct['title']}</p>
                <div class="clearfix">
                  <div className='position-absolute top-0 start-0 m-2 product-discount'>
                    {categoryProduct['special_price'] == null ? 
                    <span className="badge alert-warning"><strong>{categoryProduct['remark']}</strong></span> :
                    <span className="badge alert-warning"><strong>SALE</strong></span>}
                  </div>
       
                {/* Price */}
                {categoryProduct['special_price'] == null ? <p className='product-price-on-card'>Price: ${categoryProduct['price']}</p> : <p className='product-price-on-card'>Price: <strike className='text-secondary'>${categoryProduct['price']}</strike>&nbsp; ${categoryProduct['special_price']}</p>}
                    
                </div>
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
                          <Link to={'/productcategory/' + category}>{category}</Link>
                      </Breadcrumb.Item>
                  </Breadcrumb>
            </div>

            <div className='section-title text-center mb-40 mt-4'>
                <h3> {category} </h3>
            </div>

            <Row className='p-1'>
              
                {myView}
  
            </Row>

            {/* Pagination */}
            { this.props.productData.length !== 0 ?
            <Pagination
              total={this.state.totalPages}
              current={this.state.currentPage}
              onPageChange={page => this.handlePageChange(page)}
              previousLabel="Previous" 
              nextLabel="Next"
            /> : null }
          </Container>
      </Fragment>
    )
  }
}

export default Category