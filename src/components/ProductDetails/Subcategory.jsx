import React, { Component, Fragment } from 'react'
import { Card, Col, Container, Row, Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Pagination from 'react-responsive-pagination';

class Subcategory extends Component {
  constructor(props) { 
      super(props);

      this.state = {
        totalPages: 0,
        currentPage: 1,
      }
  }

  handlePageChange(page) {
    this.setState({ currentPage: page });
    // ... do something with `page`
    window.scroll(0, 0);
  }

  componentDidMount = () => {
    this.setState({
      totalPages: Math.ceil(this.props.productData.length / 12)
    })
  }

  starsGenerate = (rate) => {
    let myStars; 
    if (rate < 1.5 && rate > 0.0) { 
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

  render() {
    const subcategoryProductList = this.props.productData;
    // for breadcrumb
    const category = this.props.category;
    const subcategory = this.props.subcategory;

    let paginationProductList = [];
    for (var i = 12 * (this.state.currentPage - 1); i <= (12 * this.state.currentPage) - 1; i++) {
      if (subcategoryProductList[i] !== undefined) {
        paginationProductList.push(subcategoryProductList[i]);
      }
    }

    const myView = paginationProductList.map((subcategoryProduct, i) => {
      return (
        <Col key={i.toString()} className='p-1'key={1} xl={3} lg={4} md={4} sm={6} xs={6}>
          <Link className='text-link' to={"/productdetails/" + subcategoryProduct['id']}>
            <Card className='image-box card'>
              <img className='center' src={subcategoryProduct['image']}/>
               {/* Sale Off */}
               <div class="">
                 { subcategoryProduct['special_price'] == null ? 
                 null : 
                 <div class="position-absolute top-0 end-0 m-2 product-discount"><span className="badge alert-success">-{((100 * (subcategoryProduct['price'] - subcategoryProduct['special_price'])) / subcategoryProduct['price']).toFixed(0)}%</span></div>}
              </div>

              <Card.Body>
                <p className='product-name-on-card'>{subcategoryProduct['title']}</p>
                <div class="clearfix">
                  <div className='position-absolute top-0 start-0 m-2 product-discount'>
                    {subcategoryProduct['special_price'] == null ? 
                    <span className="badge alert-warning"><strong>{subcategoryProduct['remark']}</strong></span> :
                    <span className="badge alert-warning"><strong>SALE</strong></span>}
                  </div>

                  {/* Price */}
                  {subcategoryProduct['special_price'] == null ? <p className='product-price-on-card'>Price: ${subcategoryProduct['price']}</p> : <p className='product-price-on-card'>Price: <strike className='text-secondary'>${subcategoryProduct['price']}</strike>&nbsp; ${subcategoryProduct['special_price']}</p>}

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
                      <Breadcrumb.Item>
                          <Link to={'/productsubcategory/' + category + '/' + subcategory}>{subcategory}</Link>
                      </Breadcrumb.Item>
                  </Breadcrumb>
            </div>

            <div className='section-title text-center mb-55'>
                <h3> {category} / {subcategory} </h3>
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

export default Subcategory