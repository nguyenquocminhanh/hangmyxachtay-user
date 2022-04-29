import React, { Component, Fragment } from 'react'
import {Navbar, Container, Row, Col, Button} from 'react-bootstrap'
import Logo from '../../assets/images/logo.png'
import {Link} from 'react-router-dom'
import MegaMenuAll from '../home/MegaMenuAll';

import Bars from '../../assets/images/bars.png';
import { Redirect } from 'react-router-dom';

// redux
import { connect } from "react-redux"
import {
  clearAllData
} from "../../redux/User/user.actions"

class NavMenuDesktop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SideNavState: 'sideNavClose',
      ContentOverState: 'ContentOverlayClose',
      
      searchKey: '',
      searchRedirectStatus: false,
    }

    this.MenuBarClickHandler = this.MenuBarClickHandler.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);
    this.searchOnClick = this.searchOnClick.bind(this);
    this.searchRedirect = this.searchRedirect.bind(this);
  }

  MenuBarClickHandler = () => {
    this.SideNavOpenClose();
  }

  ContentOverlayClickHandler = () => {
    this.SideNavOpenClose();
  }

  SideNavOpenClose = () => {
    let SideNavState = this.state.SideNavState;
    // let ContentOverState = this.state.ContentOverState;
    if (SideNavState === 'sideNavOpen') {
      this.setState({
        SideNavState: 'sideNavClose',
        ContentOverState: 'ContentOverlayClose'
      })
    } else {
      this.setState({
        SideNavState: 'sideNavOpen',
        ContentOverState: 'ContentOverlayOpen'
      })
    }
  }

  searchOnChange = (event) => {
    this.setState({
      searchKey: event.target.value
    })
  }

  searchOnClick = () => {
    if (this.state.searchKey.length >= 2) {
      this.setState({
        searchRedirectStatus: true
      })
    }
  } 

  searchRedirect = () => {
    if (this.state.searchRedirectStatus === true) {
      return <Redirect to={"/productbysearch/" + this.state.searchKey}/>
    }
  }

  logout = () => {
    localStorage.removeItem('token');

    // clear all data in redux
    this.props.clearAllData();
  }

  onKeyDownHandler = (event) => {
    if (event.key === 'Enter') {
      this.searchOnClick();
    }
  }
  
  render() {
 
    const cart = this.props.cart;
    let cartCount = 0;

    cart.forEach(item => {
      cartCount = cartCount + parseInt(item['quantity']);
    })

    return (
      <Fragment>
        <div className='TopSectionDown'>
          <Navbar fixed={"top"} className='navbar' bg="light">
            <Container fluid={"true"} className='fixed-top shadow-sm p-2 mb-0 bg-white'>
              <Row>
                {/* Logo */}
                <Col lg={4} md={3} sm={12} xs={12}>

                  <img src={Bars} onClick={this.MenuBarClickHandler} className='bar-img'/>
                 
                  <Link to="/"><img className='nav-logo' src={Logo}/></Link>
                </Col>


                {/* Search field */}
                <Col className='p-1 mt-1' lg={4} md={4} sm={12} xs={12}>
                  <div className='input-group w-100'> 
                    <input
                      type="text" 
                      onChange={this.searchOnChange} 
                      className='form-control'
                      onKeyDown={this.onKeyDownHandler}
                      placeholder='Search By Product/ Brand Name or Product Code'/>
                    <Button type='button' 
                      className='btn site-btn' 
                      onClick={this.searchOnClick}>
                        <i className='fa fa-search'></i>
                    </Button>
                  </div>
                </Col>

                {/* Right Items */}
                <Col className='p-1 mt-1' lg={4} md={5} sm={12} xs={12}>
                  <div className='d-flex justify-content-center'>
               
                    <Link to="/favourite" className='btn'><i className='fa h4 fa-heart'><sup><span className='badge text-white bg-danger'>{this.props.favData.length}</span></sup></i></Link>
                    <Link to="/cart" className='btn'><i className='fa h4 fa-shopping-cart'><sup><span className='badge text-white bg-danger'>{cartCount}</span></sup></i></Link>
              
                    {localStorage.getItem('token') ? 
                    <Link to="/profile" className='h4 btn'>PROFILE</Link> :
                    <Link to="/register" className='h4 btn'>REGISTER</Link>}

                    {localStorage.getItem('token') ? 
                      <Link to="/login" onClick={this.logout} className='h4 btn'>LOGOUT</Link> :
                      <Link to="/login" className='h4 btn'>LOGIN</Link>}
                
                  </div>
                </Col>  
              </Row>
              {this.searchRedirect()}
            </Container>
          </Navbar>
        </div>

        <div className={this.state.SideNavState}>
              <MegaMenuAll/>
            </div>

            <div onClick={this.ContentOverlayClickHandler} className={this.state.ContentOverState}>

        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    favData: state.user.fav,
    cart: state.user.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearAllData: () => {clearAllData()(dispatch)},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavMenuDesktop)