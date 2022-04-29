import React, { Component, Fragment } from 'react'
import {Container, Row, Col, Card, ListGroup, ListGroupItem, Modal, Button, Form} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Portrait from '../../assets/images/no_image.jpg'
import cogoToast from 'cogo-toast';
import axios from 'axios'
import AppURL from '../../api/AppURL';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // user: {},
      name: '',
      email: '',
      phone: '',
      address: '',
      country: '',
      // image - submit
      image: null,
      // file - temporary
      file: null,

      errorMsg: "",

      pageRefreshStatus: false,
      profileModal: false,
      passwordModal: false,

      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      message: "",
      isReseted: false,

      updateProfileButton: 'Update',
      changePasswordButton: 'Change'
    }
  }

  profileModalClose = () => {
    this.setState({
      profileModal: false
    })
  }

  profileModalOpen = () => {
      this.setState({
        profileModal: true,
        name: this.props.user['name'],
        email: this.props.user['email'],
        phone: this.props.user['phone'],
        address: this.props.user['address'],
        country: this.props.user['country'],
      })
  }

  passwordModalClose = () => {
    this.setState({
      passwordModal: false
    })
  }

  passwordModalOpen = () => {
    this.setState({
      passwordModal: true,
      email: this.props.user['email'],
    })
}

  updateProfile = () => {
    let name = this.state.name;
    let email = this.state.email;
    let phone = this.state.phone;
    let address = this.state.address;
    let country = this.state.country;

     // validation
    if (name.length == 0) {
    cogoToast.error('Plase Enter Your Name', {position: 'top-right'});
    } else if (email.length === 0) {
        cogoToast.error('Plase Enter Your Email', {position: 'top-right'});
    } else {            // validate OK

    let myFormData = new FormData();
    myFormData.append('name', name);
    // KEYWORD PHẢI GIO61NG TRONG DATABASE
    myFormData.append('email', email);
    myFormData.append('phone', phone);
    myFormData.append('address', address);
    myFormData.append('country', country);
    myFormData.append('id', this.props.user['id']);

    this.setState({
      updateProfileButton: 'Sending Request...',
    })
    
    axios.post(AppURL.UserProfileUpdate, myFormData).then(response => {
      this.setState({
        profileModal: false,
        updateProfileButton: 'Update',
      })
      // cogoToast.success('Profile Updated Successfully', {position: 'bottom-right'})

      this.props.setUser(response.data);

      // update user 

    }).catch(error => {
        this.setState({
          updateProfileButton: 'Update',
        })
        cogoToast.error('Your Request Is Not Done Yet! Try Again', {position: 'top-right'});
    })}
  }


  changePassword = () => {
    let oldPassword = this.state.oldPassword;
    let newPassword = this.state.newPassword;
    let confirmPassword = this.state.confirmPassword;
    let email = this.state.email;

     // validation
     if (oldPassword.length === 0) {
        cogoToast.error('Please Enter Your Current Password', {position: 'top-right'});
     } else if (newPassword.length < 6) {
        cogoToast.error('Password Must Be At Least 6 Characters', {position: 'top-right'});
    } else if (confirmPassword !== newPassword) {
        cogoToast.error('Confirm Password Does Not Match', {position: 'top-right'});
    } else if (oldPassword === newPassword) {
        cogoToast.error('You Cannot Use The Old Password', {position: 'top-right'});
    } else {            // validate OK

    let myFormData = new FormData();
    myFormData.append('oldpassword', oldPassword);
    myFormData.append('password', newPassword);
    // KEYWORD PHẢI GIO61NG TRONG DATABASE
    myFormData.append('email', email);

    this.setState({
      changePasswordButton: 'Sending Request...'
    })
    
    axios.post(AppURL.UserChange, myFormData).then(response => {
      this.setState({
        passwordModal: false,
        message: response.data['message'],
        changePasswordButton: 'Change'
      })
      cogoToast.success(this.state.message, {position: 'top-right'});

      this.setState({
        isReseted: true
      })
    }).catch(error => {
      this.setState({
        message: error.response.data['message'],
        isReseted: false,
        changePasswordButton: 'Change'
      })
      cogoToast.error(this.state.message, {position: 'top-right'});
    })}
  }

  pageRefresh = () => {
    if (this.state.pageRefreshStatus) {
        let URL = window.location;
        return (
            <Redirect to={URL}/>
        )
    }
  }

  handleImageInputChange = (e) => {
    let isValid = "";
    // validate file type
    isValid = this.fileValidate(e.target.files[0]);

    if (isValid) {
      this.setState({
        image: e.target.files[0],
        file: URL.createObjectURL(e.target.files[0]),
        errorMsg: ""
      })
    } else {
      this.setState({
        errorMsg: "File type allowed only jpg, png, jpeg",
        file: null,
        image: null
      })
    }
  }

  // validate file type 
  fileValidate = (file) => {
    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg"
    ) {
      return true;
    } else {
      return false;
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    let profileImageForm = document.getElementById('profileImageForm');

    if (this.state.image === null) {
      cogoToast.error('No Image Found', {position: 'top-right'});
    } else {
      let myFormData = new FormData();

      myFormData.append('image', this.state.image);
      myFormData.append('id', this.props.user['id']);

      axios.post(AppURL.UserImageUpload, myFormData)
        .then(response => {
          profileImageForm.reset();
          cogoToast.success('Image Upload Successfully!!', {position: 'top-right'});
        }) 
        .catch(error => {
          console.log(error);
          cogoToast.error('Your Request Was Not Done Yet!', {position: 'top-right'});
        })
    }
  }

  componentDidMount = () => {
    // set user profile when reload the page
    if (this.props.user['profile_photo_path'] !== null) {
      this.setState({
        file: this.props.user['profile_photo_path']
      })
    }
  }


  render() {
    ///////////// PROTECT ROUTE //////////////////
    if (!localStorage.getItem('token')) {
      cogoToast.warn('You Should Log In First', {position: 'top-right'});
      return <Redirect to='login'/>
    }

    if (this.state.isReseted) {
      return <Redirect to='/login'/>
    }

    let user = this.props.user;

    return (
      <Fragment>
        <Container>
          <div className="section-title text-center mb-55">
            <h2>User Profile</h2>
          </div>

          <Row>
            <Col lg={6} md={6} sm={12}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={this.state.file !== null ? this.state.file : Portrait} className='userprofile mx-auto border'/>
  
                <ListGroup className="list-group-flush">

                  <ListGroupItem> 
                    <Link className='text-link'>
                      <p className='product-name-on-card text-center fs-5 m-0'>Hello, {user['name']}!</p>
                    </Link>
                  </ListGroupItem>

                  <ListGroupItem className='Listgroupitem'> 
                    <Link className='text-link' to='/orderlist'>
                      <p className='product-name-on-card text-center fs-6 m-0'>Order History</p>
                    </Link>
                  </ListGroupItem>
                  
                  <ListGroupItem className='Listgroupitem'> 
                      <p onClick={this.profileModalOpen} className='product-name-on-card text-center fs-6 m-0'>Edit Your Profile</p>
                  </ListGroupItem>

                  <ListGroupItem className='Listgroupitem'> 
                      <p onClick={this.passwordModalOpen} className='product-name-on-card text-center fs-6 m-0'>Change Password</p>
                  </ListGroupItem>

                </ListGroup>
              </Card>
            </Col>

            <Col lg={6} md={6} sm={12}>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <ul className='list-group'>
                    <li className='list-group-item'>Name: {user['name']}</li>
                    <li className='list-group-item'>Email: {user['email']}</li>
                    <li className='list-group-item'>Phone: {user['phone']}</li>
                    <li className='list-group-item'>Address: {user['address']}</li>
                    <li className='list-group-item'>Country: {user['country']}</li>
                  </ul>
                </Col>

                {/* Image Input */}
                <Col lg={12} md={12} sm={12} className='d-flex justify-content-center shadow-sm bg-white'>
                  <Form id="profileImageForm" onSubmit={this.submitHandler} className='onboardForm' encType='multipart/form-data'> 
                    <label for="formFile" class="form-label m-2">Profile Image Upload</label>
                    <input class="form-control m-2" type="file" name="image" onChange={this.handleImageInputChange} id="formFile"></input>
                    <span className='text-danger'>{this.state.errorMsg}</span>
                    <Button id="sendBtn" className='site-btn-login btn btn-block m-2' type='submit'> Upload Profile Image</Button>
                  </Form>
                </Col>
              </Row>
      
            </Col>
          </Row>

        </Container>

        <Modal show={this.state.profileModal} onHide={this.profileModalClose}>
          <Modal.Header closeButton>
          <h6><i className="fa fa-bell"></i> Edit Your Profile</h6>
          </Modal.Header>
          <Modal.Body id='formreset'>
              <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                  <label className="form-label">Your Name</label>
                  <input className="form-control" 
                   onChange={(e) => {this.setState({name: e.target.value})}} 
                   type="text" 
                   value={this.state.name}/>
              </div>

              <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                  <label className="form-label">Your Email</label>
                  <input readOnly className="form-control" 
                  onChange={(e) => {this.setState({email: e.target.value})}} 
                  type="text" 
                  value={this.state.email}/>
              </div>
              
              <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                  <label className="form-label">Your Phone Number (optional)</label>
                  <input className="form-control" 
                  type="text"
                  onChange={(e) => {this.setState({phone: e.target.value})}}  
                  value={this.state.phone}/>
              </div>

              <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                  <label className="form-label">Your Address (optional)</label>
                  <input className="form-control"
                  onChange={(e) => {this.setState({address: e.target.value})}} 
                  type="text" 
                  value={this.state.address}/>
              </div>

              <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                  <label className="form-label">Your Country (optional)</label>
                  <select onChange={(e) => {this.setState({country: e.target.value})}} className="form-control">
                    <option value="">Select Your Country</option>
                    <option value="Vietnam" selected = {this.state.country === "Vietnam" ? true : false}>Vietnam</option>
                    <option value="United States Of America" selected = {this.state.country === "United States Of America" ? true : false}>The United States Of America</option>
                  </select>
              </div>

          </Modal.Body>
          <Modal.Footer>
          <Button variant="success" className='mx-auto' onClick={this.updateProfile}>
              {this.state.updateProfileButton}
          </Button>

          </Modal.Footer>
        </Modal>

        <Modal show={this.state.passwordModal} onHide={this.passwordModalClose}>
          <Modal.Header closeButton>
          <h6><i className="fa fa-bell"></i> Change Password</h6>
          </Modal.Header>
          <Modal.Body>
              <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                  <label className="form-label">Current Password</label>
                  <input className="form-control" 
                   placeholder='Enter Your Current Password'
                   onChange={(e) => {this.setState({oldPassword: e.target.value})}} 
                   type="password" />
              </div>

              <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                  <label className="form-label">New Password</label>
                  <input className="form-control" 
                  placeholder='Enter Your New Password'
                  onChange={(e) => {this.setState({newPassword: e.target.value})}} 
                  type="password" />
              </div>
              
              <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                  <label className="form-label">Confirm Password</label>
                  <input className="form-control" 
                  type="password"
                  placeholder='Confirm Your New Password'
                  onChange={(e) => {this.setState({confirmPassword: e.target.value})}}  />
              </div>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="success" className='mx-auto' onClick={this.changePassword}>
              {this.state.changePasswordButton}
          </Button>

          </Modal.Footer>
        </Modal>

        {this.pageRefresh()}

      </Fragment>
    )
  }
}

export default Profile