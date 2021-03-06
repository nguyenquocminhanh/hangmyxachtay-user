import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { Button, Col, Container, Form, Row, Breadcrumb } from 'react-bootstrap'
import AppURL from '../../api/AppURL';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom'

class Refund extends Component {
  constructor() {
    super();
    this.state = {
        refund: '',
        loaderDiv: '',
        // d-none là ko hiện
        mainDiv: "d-none"
    }
  }

  componentDidMount = () => {
    let siteInfoRefund = sessionStorage.getItem("SiteInfoRefund");

    if (siteInfoRefund === null) { // no data yet!!
      axios.get(AppURL.AllSiteInfo).then(response => {
          let statusCode = response.status;
          if (statusCode == 200) {        // success
              let jsonData = (response.data)[0]['refund'];
              this.setState({
                  refund: jsonData,
                  loaderDiv: "d-none",
                  mainDiv: ""
              })

              // store to session storage
              sessionStorage.setItem("SiteInfoRefund", jsonData);
          }
      }).catch(error => {

      })
    } else { // already has data in session storage !!
      this.setState({
        refund: siteInfoRefund,
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
                            <Link to='/refund'>Refund </Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <Row className='p-2'>
                    <Col className='shadow-sm bg-white px-4 pb-3' md={12} lg={12} sm={12} xs={12}>
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
                        <h4 className='section-title-login text-center'>Refund & Return Policy</h4>
                 
<h2>Refund & Return Policy</h2>
<p>Our Return and Refund Policy was last updated April 25, 2022</p>
<p>Thank you for shopping at Hàng Mỹ Xách Tay.</p>
<p>If, for any reason, You are not completely satisfied with a purchase We invite You to review our policy on refunds and returns. This Return and Refund Policy was generated by Minh Nguyen.</p>
<p>The following terms are applicable for any products that You purchased with Us.</p>
<h2>Interpretation and Definitions</h2>
<p><strong>Interpretation</strong></p>
<p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
<p><strong>Definitions</strong></p>
<p>For the purposes of this Return and Refund Policy:</p>
<ul>
<li>
<p><strong>"Company"</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Hàng Mỹ Xách Tay</p>
</li>
<li>
<p><strong>"Goods"</strong> refers to the items offered for sale on the Service.</p>
</li>
<li>
<p><strong>"Orders"</strong> means a request by You to purchase Goods from Us.</p>
</li>
<li>
<p><strong>"Service"</strong> refers to the Website.</p>
</li>
<li>
<p><strong>"You"</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
</li>
</ul>
<h2>Your Order Cancellation Rights</h2>
<p>You are entitled to cancel Your Order within 14 days without giving any reason for doing so.</p>
<p>The deadline for cancelling an Order is 14 days from the date on which You received the Goods or on which a third party you have appointed, who is not the carrier, takes possession of the product delivered.</p>
<p>In order to exercise Your right of cancellation, You must inform Us of your decision by means of a clear statement. You can inform us of your decision by:</p>
<ul>
<li>By visiting this page on our website: CONTACT US PAGE</li>
<li>By sending us an email: minhanh.nguyenquoc@gmail.com</li>
</ul>
<p>We will reimburse You no later than 14 days from the day on which We receive the returned Goods. We will use the same means of payment as You used for the Order, and You will not incur any fees for such reimbursement.</p>
<h2>Conditions for Returns</h2>
<p>In order for the Goods to be eligible for a return, please make sure that:</p>
<ul>
<li>The Goods were purchased in the last 14 days</li>
<li>The Goods are in the original packaging</li>
</ul>
<p>The following Goods cannot be returned:</p>
<ul>
<li>The supply of Goods made to Your specifications or clearly personalized.</li>
<li>The supply of Goods which according to their nature are not suitable to be returned, deteriorate rapidly or where the date of expiry is over.</li>
<li>The supply of Goods which are not suitable for return due to health protection or hygiene reasons and were unsealed after delivery.</li>
<li>The supply of Goods which are, after delivery, according to their nature, inseparably mixed with other items.</li>
</ul>
<p>We reserve the right to refuse returns of any merchandise that does not meet the above return conditions in our sole discretion.</p>
<h2>Returning Goods</h2>
<p>You are responsible for the cost and risk of returning the Goods to Us. You should send the Goods at the following address:</p>
<p>493A/77 CMT8, P.13, Q.10, TP.HCM, Vietnam</p>
<p>We cannot be held responsible for Goods damaged or lost in return shipment. Therefore, We recommend an insured and trackable mail service. We are unable to issue a refund without actual receipt of the Goods or proof of received return delivery.</p>
<h2>Gifts</h2>
<p>If the Goods were marked as a gift when purchased and then shipped directly to you, You'll receive a gift credit for the value of your return. Once the returned product is received, a gift certificate will be mailed to You.</p>
<p>If the Goods weren't marked as a gift when purchased, or the gift giver had the Order shipped to themselves to give it to You later, We will send the refund to the gift giver.</p>
<h2>Contact Us</h2>
<p>If you have any questions about our Returns and Refunds Policy, please contact us:</p>
<ul>
<li>By visiting this page on our website: Contact Us Page</li>
<li>By sending us an email: minhanh.nguyenquoc@gmail.com</li>
</ul>
<p></p>
                      </div>
                    </Col>
                </Row>
            </Container>
      </Fragment>
    )
  }
}

export default Refund