import React, { Component, Fragment } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Login from '../../assets/images/login.png'
import { Link } from 'react-router-dom'
import axios from 'axios';
import AppURL from '../../api/AppURL';
import { Redirect } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

class UserLogin extends Component {
  constructor() {
      super();
      this.state = {
          email: '',
          password: '',
          message: '',
          loggedIn: false,

          loginButton: 'Login'
      }
  }

  formSubmit = (e) => {
    // page not loaded when submit
    e.preventDefault();
    const data = {
        email: this.state.email,
        password: this.state.password
    }

    this.setState({
        loginButton: 'Sending Request...'
    })

    axios.post(AppURL.UserLogin, data).then(res => {
        localStorage.setItem('token', res.data['token']);
        // set user data in redux store
        this.props.setUser(res.data['user']);

        // get cart data
        axios.get(AppURL.CartList(res.data.user['email']))
            .then(resp => {
                this.props.setCartData(resp.data);
            })
            .catch(err => {
                console.log(err)
            }) 
        // get fav Data
        axios.get(AppURL.FavouriteList(res.data.user['email']))
            .then(response => {
                this.props.setFavData(response.data);
            })
            .catch(e => {
                console.log(e)
            })
        
        // redirect page
        this.setState({
            loggedIn: true,
            loginButton: 'Login'
        })

    }).catch(err => {
        this.setState({
            loginButton: 'Login'
        })
        toast.error(err.response.data['message'])
    })
  }

  render() {
    // after loggedIn -> Redirect to Profile Page
    ///////////// PROTECT ROUTE //////////////////
    if (this.state.loggedIn === true || localStorage.getItem('token')) {

        return <Redirect to='/profile'/>
    }


    return (
      <Fragment>
          <Container>
              <Row className='p-2'>
                  {/* div bao ngoài */}
                  <Col className='shadow-sm bg-white mt-2' md={12} lg={12} sm={12} xs={12}>

                    {/* Login Form */}
                    <Row className='text-center'>
                        <Col className='d-flex justify-content-center' md={6} lg={6} sm={12} xs={12}>
                            <Form className='onboardForm' onSubmit={this.formSubmit}> 
                                <h4 className='section-title-login'>USER SIGN IN</h4>
                         
                                <input className='form-control m-2' 
                                    type="email" 
                                    placeholder='Enter Your Email' 
                                    onChange={(e) => {this.setState({email: e.target.value})}}/>
                                    
                                <input className='form-control m-2' 
                                    type="password" 
                                    placeholder='Enter Your Password'
                                    onChange={(e) => {this.setState({password: e.target.value})}}/>

                                <Button className='site-btn-login btn btn-block m-2' type='submit'> {this.state.loginButton} </Button>

                                <br></br> <br></br>
                                <hr/>

                                <p> 
                                    <b>Forget My Password?</b> 
                                    <b> <Link to="/forget">Forget Password?</Link> </b>
                                </p>

                                <p> 
                                    <b>Don't Have An Account?</b> 
                                    <b> <Link to="/register">Register?</Link> </b>
                                </p>
                            </Form>
                        </Col>

                        {/* Hình ảnh */}
                        <Col className='p-0 m-0 Desktop' md={6} lg={6} sm={12} xs={12}>
                            <img className='onboardBanner' src={Login}/>
                        </Col>
                    </Row>

                  </Col>
              </Row>
          </Container>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />

      </Fragment>
    )
  }
}

export default UserLogin