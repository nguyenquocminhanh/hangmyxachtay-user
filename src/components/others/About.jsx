import axios from 'axios';
import React, { Component, Fragment } from 'react'
import { Button, Col, Container, Form, Row, Breadcrumb } from 'react-bootstrap'
import AppURL from '../../api/AppURL';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

class About extends Component {
  constructor() {
      super();
      this.state = {
          about: '',
          loaderDiv: '',
          // d-none là ko hiện
          mainDiv: "d-none"
      }
  }

  componentDidMount = () => {
    //   let siteInfoAbout = sessionStorage.getItem("SiteInfoAbout");

        axios.get(AppURL.AllSiteInfo).then(response => {
            let statusCode = response.status;
            if (statusCode == 200) {        // success
                let jsonData = (response.data)[0]['about'];

                // if (siteInfoAbout === null) { // no data yet!! 
                    this.setState({
                        about: jsonData,
                        loaderDiv: "d-none",
                        mainDiv: ""
                    })
            }
        }).catch(error => {

        })
  }

  render() {
    return (
      <Fragment>
        <Container>
            <div className='Breadbody'>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to='/about'>About</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            
            <Row className='p-2'>
				<Col className='shadow-sm bg-white px-4 pb-3' md={12} lg={12} sm={12} xs={12}>
					<h4 className='section-title-login text-center'>About Us</h4>
					<p>Welcome to H&agrave;ng Mỹ X&aacute;ch Tay, your number one source for all products. We&#39;re dedicated to giving you the very best of&nbsp; American Products, with a focus on dependability, customer service and uniqueness.</p>

					<p>Founded in 2020 by Minh Nguyen and Cam Thuyen, H&agrave;ng Mỹ X&aacute;ch Tay has come a long way from its beginnings in a Boston, MA. When Minh Nguyen first started out, his passion for sharing American accessories for his fellow drove him to do intense research, quit her day job, and gave him the impetus to turn hard work and inspiration into to a booming online store. We now serve customers all over&nbsp; the US, Vietnam, and are thrilled to be a part of the quirky, eco-friendly, fair trade wing of the fashion industry.</p>

					<p>We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don&#39;t hesitate to contact us.</p>

					<p>Sincerely,<br />
					Minh Nguyen, <br/>
                    Founder &amp; Develper.</p>
				</Col>
            </Row>
        </Container>      
      </Fragment>
    )
  }
}

export default About