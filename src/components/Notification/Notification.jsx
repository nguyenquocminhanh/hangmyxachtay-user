import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import cogoToast from 'cogo-toast'

class Notification extends Component {
  constructor(props) {
      super();
      this.state = {
        show: false,

        notificationMsg: "",
        notificationTitle: "",
        notificationDate: ""
      }
  }

  handleClose = () => {
    this.setState({
        show: false
    })
  }

  handleShow = (event) => {
    this.setState({
        show: true
    })
    let notificationMsg = event.target.getAttribute('data-message');
    let notificationDate = event.target.getAttribute('data-date');
    let notificationTitle = event.target.getAttribute('data-title');

    this.setState({
        notificationMsg: notificationMsg,
        notificationTitle: notificationTitle,
        notificationDate: notificationDate
    })

  }

  render() {
    ///////////// PROTECT ROUTE //////////////////
    if (!localStorage.getItem('token')) {
      cogoToast.warn('You Should Log In First', {position: 'top-right'});
      return <Redirect to='login'/>
    }

    const notificationList = this.props.notificationData;
    const myView = notificationList.map((notification, i) => {
        return (
            <Col className=" p-1 " md={6} lg={6} sm={12} xs={12} key={i.toString()}>
                <Card className="notification-card">
                    <Card.Body>
                        <h6> {notification['title']} </h6>
                        <p className="py-1  px-0 text-primary m-0"><i className="fa  fa-bell"></i>   Date: {notification['date']} | Status: Unread</p>
                        <Button 
                            data-title={notification['title']} 
                            data-date={notification['date']}
                            data-message={notification['message']}
                            className='btn btn-danger'
                            onClick={this.handleShow}>
                                Details
                        </Button> 
                    </Card.Body>
                </Card>
             </Col>
        )
    })

    return (
      <Fragment>
        <Container className="TopSection">
            <Row>
                {myView}
            </Row>
        </Container>

        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
            <h6><i className="fa fa-bell"></i> Date: {this.state.notificationDate}</h6>
            </Modal.Header>
            <Modal.Body>
                <h6>{this.state.notificationTitle}</h6>
                <p>
                    {this.state.notificationMsg}
                </p>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
                Close
            </Button>

            </Modal.Footer>
        </Modal>

      </Fragment>
    )
  }
}

export default Notification