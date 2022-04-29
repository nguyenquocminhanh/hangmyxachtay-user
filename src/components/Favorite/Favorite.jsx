import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import AppURL from '../../api/AppURL';
import { Link } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import { Redirect } from 'react-router-dom';
import FavouriteLoading from '../placeholder/FavouriteLoading'

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageRefreshStatus: false,
    }
  }

  removeFavourite = (event) => {
    let productCode = event.target.getAttribute('data-code');
    let email = this.props.user['email'];

    axios.get(AppURL.RemoveFavourite(productCode, email)).then(response => {
        this.props.setFavData(response.data)
        cogoToast.success('Product Removed Successfully', {position: 'top-right'});
        
        }).catch(error => {
            cogoToast.error('Your Request Is Not Done Yet! Try Again', {position: 'top-right'});
        })
  }

  pageRefresh = () => {
    if (this.state.pageRefreshStatus) {
        let URL = window.location;
        return (
            <Redirect to={URL}/>
        )
    }
  }

  render() {
    ///////////// PROTECT ROUTE //////////////////
    if (!localStorage.getItem('token')) {
      cogoToast.warn('You Should Log In First', {position: 'top-right'});
      return <Redirect to='login'/>
    }

    // get data tu AppRoute
    const favList = this.props.favData;
    const myView = favList.map((fav, i) => {

      return (
        <Col key={i.toString()} className='p-1'key={1} xl={3} lg={6} md={6} sm={12} xs={12}>
            <Card className='image-box card'>
              <Link className='text-link' to={"/productdetails/" + fav['product_id']}>
                <img className='center' src={fav['image']}/>
              </Link>
              <Card.Body>
                <p className='product-name-on-card'>{fav['product_name']}</p>
                <Button data-code={fav['product_code']} className='btn btn-sm' onClick={this.removeFavourite}>
                    <i className='fa fa-trash-alt'></i>
                    &nbsp; Remove
                </Button>
              </Card.Body>
            </Card>
            {/* </Link> */}
        </Col>
      )
    })

    return (
      <Fragment>
          <Container className='text-center' fluid={"true"}>
            <div className='section-title text-center mb-55'>
                <h2> MY FAVOURITE </h2>
            </div>
            <Row>
                {this.props.loading ?
                <FavouriteLoading/> :
                myView}
            </Row>
          </Container>
          {this.pageRefresh()}
      </Fragment>
    )
  }
}

export default Favorite