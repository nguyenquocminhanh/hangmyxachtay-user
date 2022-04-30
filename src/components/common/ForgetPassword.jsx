import React, { Component, Fragment } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Forget from '../../assets/images/forget.jpg'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import AppURL from '../../api/AppURL'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


class ForgetPassword extends Component {
  constructor() {
    super();
    this.state = {
        email: '',
        message: '',

        forgetButton: 'Reset Password'
    }
  }

  formSubmit = (e) => {
    // page not loaded when submit
    e.preventDefault();
    const data = {
        email: this.state.email,
    }

    this.setState({
      forgetButton: 'Sending Request...'
    })

    axios.post(AppURL.UserForget, data).then(res => {
      this.setState({
        message: res.data['message'],
        forgetButton: 'Reset Password'
      })
      toast.success(this.state.message);
    }).catch(err => {
      this.setState({
        message: err.response.data['message'],
        forgetButton: 'Reset Password'
      })
      toast.error(this.state.message);
    })
  }

  render() {
    ///////////// PROTECT ROUTE //////////////////
    if (localStorage.getItem('token')) {
      toast.warning("You Can't Access This Page");
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
                                <h4 className='section-title-login'>RESET PASSWORD</h4>
                         
                                <input className='form-control m-2'
                                  type="email" 
                                  placeholder='Enter Your Email'
                                  onChange={(e) => {this.setState({email: e.target.value})}}/>

                                <Button className='site-btn-login btn btn-block m-2' type='submit'> {this.state.forgetButton} </Button>
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
      </Fragment>
    )
  }
}

export default ForgetPassword