import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { Button, Col, Container, Form, Row, Breadcrumb } from 'react-bootstrap'
import AppURL from '../../api/AppURL';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom'

class Privacy extends Component {
  constructor() {
    super();
    this.state = {
        privacy: '',
        loaderDiv: '',
        // d-none là ko hiện
        mainDiv: "d-none"
    }
  }

  componentDidMount = () => {
    let siteInfoPrivacy = sessionStorage.getItem("SiteInfoPrivacy");

    if (siteInfoPrivacy === null) { // no data yet!!
      axios.get(AppURL.AllSiteInfo).then(response => {
          let statusCode = response.status;
          if (statusCode == 200) {        // success
              let jsonData = (response.data)[0]['privacy'];
              this.setState({
                  privacy: jsonData,
                  loaderDiv: "d-none",
                  mainDiv: ""
              })

              // store to session storage
              sessionStorage.setItem("SiteInfoPrivacy", jsonData);
          }
      }).catch(error => {

      })
    } else { // already has data in session storage !!
      this.setState({
        privacy: siteInfoPrivacy,
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
                          <Link to='/privacy'>Privacy</Link>
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
                        <h4 className='section-title-login text-center'>Privacy Page</h4>
                                                   
                        <h2>Why we process your information</h2>

                        <p>We generally process your information when we need to do so to fulfill a contractual obligation (for example, to process your subscription payments to use out platform), or where we or someone we work with needs to use your personal information for a reason related to their business (for example, to provide you with a service). European law calls these reasons &ldquo;legitimate interests.&rdquo; These &ldquo;legitimate interests&rdquo; include:</p>

                        <ul>
                          <li>preventing risk and fraud</li>
                          <li>answering questions or providing other types of support</li>
                          <li>helping merchants find and use apps through our app store</li>
                          <li>providing and improving our products and services</li>
                          <li>providing reporting and analytics</li>
                          <li>testing out features or additional services</li>
                          <li>assisting with marketing, advertising, or other communications</li>
                        </ul>

                        <p>We only process personal information for these &ldquo;legitimate interests&rdquo; after considering the potential risks to your privacy&mdash;for example, by providing clear transparency into our privacy practices, offering you control over your personal information where appropriate, limiting the information we keep, limiting what we do with your information, who we send your information to, how long we keep your information, or the technical measures we use to protect your information.</p>

                        <p>One of the ways in which we are able to help merchants using our website is by using techniques like &ldquo;<a href="https://en.wikipedia.org/wiki/Machine_learning">machine learning</a>&rdquo; (European law refers to this as &ldquo;automated decision-making&rdquo;) to help us improve our services. When we use machine learning, we either: (1) still have a human being involved in the process (and so are not fully automated); or (2) use machine learning in ways that don&rsquo;t have significant privacy implications (for example, reordering how apps might appear when you visit the app store).</p>

                        <p>We may process your personal information where you have provided your consent. In particular, where we cannot rely on an alternative legal basis for processing, where your data is sourced and it already comes with consent or where we are required by law to ask for your consent in the context of some of our sales and marketing activities. At any time, you have a right to withdraw your consent by changing your communication choices, opting out from our communications or by contacting us.</p>

                        <h2>Your rights over your information</h2>

                        <p>We believe you should be able to access and control your personal information no matter where you live. Depending on how you use our app, you may have the right to request access to, correct, amend, delete, port to another service provider, restrict, or object to certain uses of your personal information (for example, direct marketing). We will not charge you more or provide you with a different level of service if you exercise any of these rights.</p>

                        <p>If you buy something from a website-powered store and wish to exercise these rights over information about your purchase, you need to directly contact the merchant you interacted with. We are only a processor on their behalf, and cannot decide how to process their information. We will of course help our merchants to fulfill these requests by giving them the tools to do so and by answering their questions.</p>

                        <p>If you are a merchant, partner, Shop user, Shopify employee, or other individual that Shopify has a direct relationship with, please submit your data subject request through our online portal. Please note that if you send us a request relating to your personal information, we have to make sure that it is you before we can respond. In order to do so, we may use a third party to collect and verify identification documents.</p>

                        <p>If you are not happy with our response to a request, you can contact us to resolve the issue. You also have the right to contact your local data protection or privacy authority at any time.</p>

                        <p>Finally, because there is no common understanding about what signal is supposed to mean, we don&rsquo;t respond to those signals in any particular way.</p>

                        <h2>How we protect your information</h2>

                        <p>Our teams work tirelessly to protect your information, and to ensure the security and integrity of our platform. We also have independent auditors assess the security of our data storage and systems that process financial information. However, we all know that no method of transmission over the Internet, and method of electronic storage, can be 100% secure. This means we cannot guarantee the absolute security of your personal information.</p>

                        <h2>How we use &ldquo;cookies&rdquo; and other tracking technologies</h2>

                        <p>We use&nbsp;cookies&nbsp;and similar tracking technologies on our website and when providing our services. For more information about how we use these technologies, including a list of other companies that place cookies on our sites, a list of cookies that we place when we power a merchant&rsquo;s store, and an explanation of how you can opt out of certain types of cookies, please see our&nbsp;Cookie Policy.</p>

                      </div>
                    </Col>
                </Row>
            </Container>
      </Fragment>
    )
  }
}

export default Privacy