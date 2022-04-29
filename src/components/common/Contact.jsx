import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import AppURL from '../../api/AppURL';
import validation from '../../validation/validation';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

class Contact extends Component {
  constructor() {
      super();
      this.state = {
          name: '',
          email: '',
          message: ''
      }
  }

  nameOnChange = (event) => {
    let name = event.target.value;
    this.setState({
        name: name
    })
  }

  emailOnChange = (event) => {
    let email = event.target.value;
    this.setState({
        email: email
    })
  }

  messageOnChange = (event) => {
    let message = event.target.value;
    this.setState({
        message: message
    })
  }

  onFormSubmit = (event) => {
    // not reload the page
    event.preventDefault();

    let name = this.state.name;
    let email = this.state.email;
    let message = this.state.message;

    let sendBtn = document.getElementById("sendBtn");

    if (message.length === 0) {
        toast.error('Please write your message');
    } else if (name.length === 0) {
        toast.error('Please write your name');
    } else if (email.length === 0) {
        toast.error('Please write your email');
    } else if (!(validation.NameRegx).test(name)) {
        toast.error('Invalid Name');
    } else { // correct data -> submit
        // loading Btn - change content of Button
        sendBtn.innerHTML="Sending...";
        // Form
        let contactForm = document.getElementById('contactForm');


        let myFormData = new FormData();
        // name of fields should match with name of input field of Controller
        myFormData.append("name", name);
        myFormData.append("email", email);
        myFormData.append("message", message);

        axios.post(AppURL.PostContact, myFormData)
            .then(response => {
                if (response.status == 200 && response.data == 1) {
                    toast.success('Message Sent Successfully!!');
                    sendBtn.innerHTML="Send";
                    // delete all form input fields
                    contactForm.reset();
                } else {
                    toast.error("Error!!");
                    sendBtn.innerHTML="Send"
                }
            }) 
            .catch(error => {
                toast.error(error);
                sendBtn.innerHTML="Send"
            })
    }

  }


  render() {
    return (
        <Fragment>
            <Container>
                <Row className='p-2'>
                    {/* div bao ngoài */}
                    <Col className='shadow-sm bg-white mt-2' md={12} lg={12} sm={12} xs={12}>

                    {/* Contact Form */}
                    <Row className='text-center'>
                        <Col className='d-flex justify-content-center' md={6} lg={6} sm={12} xs={12}>
                            <Form id="contactForm" onSubmit={this.onFormSubmit} className='onboardForm'> 
                                <h4 className='section-title-login'>CONTACT WITH US</h4>
                                <h6 className='section-sub-title'>Please Contact With Us</h6>
                                <input onChange={this.nameOnChange} className='form-control m-2' type="text" placeholder='Enter Your Name'/>
                                <input onChange={this.emailOnChange} className='form-control m-2' type="email" placeholder='Enter Email'/>
                                <Form.Control onChange={this.messageOnChange} as="textarea" rows={3} className='form-control m-2' placeholder='Enter Your Message'/>
                                <Button id="sendBtn" className='site-btn-login btn btn-block m-2' type='submit'> Send </Button>
                            </Form>
                        </Col>

                        {/*  Map */}
                        <Col className='p-0 m-0 Desktop' md={6} lg={6} sm={12} xs={12}>
                           <br></br><br></br>
                           <p className='section-title-contact'>
                                9 Lonsdale St, Apt 3, Dorchester, MA 02124
                           </p>

                           {/* from Google Maps */}
                           <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2951.4663262418703!2d-71.06481098496094!3d42.28991414752184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37b9096fbd909%3A0x253ff4f9e46eb365!2s9%20Lonsdale%20St%20%233%2C%20Boston%2C%20MA%2002124!5e0!3m2!1sen!2sus!4v1647986267555!5m2!1sen!2sus" width="600" height="450" styles="border:0;" allowfullscreen="" loading="lazy"></iframe>
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

export default Contact