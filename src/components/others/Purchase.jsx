import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { Button, Col, Container, Form, Row, Breadcrumb } from 'react-bootstrap'
import AppURL from '../../api/AppURL';
import parse from 'html-react-parser';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom'

class Purchase extends Component {
  constructor() {
    super();
    this.state = {
        purchase: '',
        loaderDiv: '',
        // d-none là ko hiện
        mainDiv: "d-none"
    }
  }

  componentDidMount = () => {
    let siteInfoPurchase = sessionStorage.getItem("SiteInfoPurchase");

    if (siteInfoPurchase === null) { // no data yet!!
      axios.get(AppURL.AllSiteInfo).then(response => {
        let statusCode = response.status;
        if (statusCode == 200) {        // success
            let jsonData = (response.data)[0]['purchase_guide'];
            this.setState({
                purchase: jsonData,
                loaderDiv: "d-none",
                mainDiv: ""
            })

            // store to session storage
            sessionStorage.setItem("SiteInfoPurchase", jsonData);
        } else { 
          toast.error("Something Went Wrong");
        }
      }).catch(error => {
        toast.error("Something Went Wrong");
      })
    } else { // already has data in session storage !!
      this.setState({
        purchase: siteInfoPurchase,
        loaderDiv: "d-none",
        mainDiv: ""
      })
    }
}

  render() {

    return (
      <Fragment>
            <Container>
              <div className='Breadbody'>
                  <Breadcrumb>
                      <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
                      <Breadcrumb.Item>
                          <Link to='/purchase'>Purchase</Link>
                      </Breadcrumb.Item>
                  </Breadcrumb>
              </div>

                <Row className='p-2'>
                    <Col className='shadow-sm bg-white mt-2 px-4 pb-3' md={12} lg={12} sm={12} xs={12}>
                      <div className={this.state.loaderDiv}>
                          {/* Placeholder loading */}
                          <div class="ph-item">
                              <div class="ph-col-12">
                                  <div class="ph-row">
                                      <div class="ph-col-4"></div>
                                      <div class="ph-col-8 empty"></div>
                                      <div class="ph-col-6"></div>
                                      <div class="ph-col-6 empty"></div>
                                      <div class="ph-col-12"></div>
                                      <div class="ph-col-12"></div>
                                      <div class="ph-col-12"></div>
                                      <div class="ph-col-12"></div>
                                  </div>
                              </div>
                          </div>

                          <div class="ph-item">
                              <div class="ph-col-12">
                                  <div class="ph-row">
                                      <div class="ph-col-4"></div>
                                      <div class="ph-col-8 empty"></div>
                                      <div class="ph-col-6"></div>
                                      <div class="ph-col-6 empty"></div>
                                      <div class="ph-col-12"></div>
                                      <div class="ph-col-12"></div>
                                      <div class="ph-col-12"></div>
                                      <div class="ph-col-12"></div>
                                  </div>
                              </div>
                          </div>

                          <div class="ph-item">
                              <div class="ph-col-12">
                                  <div class="ph-row">
                                      <div class="ph-col-4"></div>
                                      <div class="ph-col-8 empty"></div>
                                      <div class="ph-col-6"></div>
                                      <div class="ph-col-6 empty"></div>
                                      <div class="ph-col-12"></div>
                                      <div class="ph-col-12"></div>
                                      <div class="ph-col-12"></div>
                                      <div class="ph-col-12"></div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className={this.state.mainDiv}>
                        <h4 className='section-title-login text-center'>HoW To Purchase</h4>
                        <h2>Methods to Purchase:</h2>
                        <p>We are improving our website more and more to add more payment methods to reach a growing number of consumers. We are currently supporting the following methods
&rdquo; include:</p>

                        <ul>
                          <li>Cash when receive product</li>
                          <li>Momo Pay</li>
                          <li>VN Pay</li>
                          <li>Zelle</li>
                          <li>Venmo</li>
                        </ul>
                      </div>
                    </Col>
                </Row>
            </Container>

            <ToastContainer/>
      </Fragment>
    )
  }
}

export default Purchase