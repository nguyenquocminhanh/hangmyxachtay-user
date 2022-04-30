import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Login from '../../assets/images/login.png'
import AppURL from '../../api/AppURL';

import { Redirect } from 'react-router-dom'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      message: '',
      
      isRegisterd: false,
      registerButton: 'Sign Up'
    }
  }

  formSubmit = (e) => {
    // page not loaded when submit
    e.preventDefault();
    const data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation
    }

    this.setState({
        registerButton: 'Sending request...'
    })

    axios.post(AppURL.UserRegister, data).then(res => {
        this.setState({
            isRegisterd: true,
            registerButton: 'Sign Up'
        })
        toast.success(res.data['message']);
    }).catch(err => {
        this.setState({
            registerButton: 'Sign Up'
        })
        toast.error(err.response.data['message']);
    })
  }

  render() {
    ///////////// PROTECT ROUTE //////////////////
    if (localStorage.getItem('token')) {
        toast.warning("You Can't Access This Page");
        return <Redirect to='/profile'/>
    }

    if (this.state.isRegisterd === true) {
        return <Redirect to='/login'/>
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
                                <h4 className='section-title-login'>USER REGISTER</h4>
                                <input className='form-control m-2' 
                                    ype="text" 
                                    placeholder='Enter Your Name'
                                    onChange={(e) => {this.setState({name: e.target.value})}}/>

                                <input className='form-control m-2' 
                                    type="email" 
                                    placeholder='Enter Your Email'
                                    onChange={(e) => {this.setState({email: e.target.value})}}/>

                                <input className='form-control m-2' 
                                    type="password" 
                                    placeholder='Enter Your Password'
                                    onChange={(e) => {this.setState({password: e.target.value})}}/>

                                <input className='form-control m-2' 
                                    type="password" 
                                    placeholder='Confirm Your Password'
                                    onChange={(e) => {this.setState({password_confirmation: e.target.value})}}/>
                                
                                <Button className='site-btn-login btn btn-block m-2' type='submit'> {this.state.registerButton} </Button>

                                <br></br> <br></br>
                                <hr/>
                                <p> 
                                    <b>Forget My Password?</b> 
                                    <b> <Link to="/forget">Forget Password?</Link> </b>
                                </p>

                                <p> 
                                    <b>Already Have An Account?</b> 
                                    <b> <Link to="/login">Login</Link> </b>
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

export default Register