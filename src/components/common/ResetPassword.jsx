import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Forget from '../../assets/images/forget.jpg'
import { Link } from 'react-router-dom'
import AppURL from '../../api/AppURL';

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
        token: '',
        email: '',
        password: '',
        password_confirmation: '',
        message: '',

        isReseted: false,
        resetButton: 'Reset Password'
      }
  }

  formSubmit = (e) => {
    // page not loaded when submit
    e.preventDefault();
    const data = {
        token: this.state.token,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation
    }

    this.setState({
      resetButton: 'Sending Request...'
    })

    axios.post(AppURL.UserReset, data).then(res => {
        this.setState({
            message: res.data['message'],
        })
        toast.success(this.state.message);
        document.getElementById("formreset").reset();
        this.setState({
          isReseted: true,
          resetButton: 'Reset Password'
        })

    }).catch(err => {
      this.setState({
        message: err.response.data['message'],
        isReseted: false,
        resetButton: 'Reset Password'
      })
      toast.error(this.state.message);
    })
  }
  
  render() {
    if (this.state.isReseted) {
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
                            <Form className='onboardForm' onSubmit={this.formSubmit} id='formreset'>  
                                <h4 className='section-title-login'>RESET PASSWORD</h4>
                         
                                <input className='form-control m-2' 
                                  type="text" 
                                  placeholder='Enter Your Pin Code'
                                  onChange={(e) => {this.setState({token: e.target.value})}}/>

                                <input className='form-control m-2' 
                                  type="email" 
                                  placeholder='Enter Your Email'
                                  onChange={(e) => {this.setState({email: e.target.value})}}/>

                                <input className='form-control m-2' 
                                  type="password" 
                                  placeholder='Enter Your New Password'
                                  onChange={(e) => {this.setState({password: e.target.value})}}/>

                                <input className='form-control m-2' 
                                  type="password" 
                                  placeholder='Confirm Your New Password'
                                  onChange={(e) => {this.setState({password_confirmation: e.target.value})}}/>

                                <Button className='site-btn-login btn btn-block m-2' type='submit'> {this.state.resetButton} </Button>
                            </Form>
                        </Col>

                        {/* Hình ảnh */}
                        <Col className='p-0 m-0 Desktop' md={6} lg={6} sm={12} xs={12}>
                            <img className='onboardBanner' src={Forget}/>
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

          <ToastContainer/>
      </Fragment>
    )
  }
}

export default ResetPassword