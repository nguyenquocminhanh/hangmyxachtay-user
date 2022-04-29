import axios from 'axios';
import React, { Component, Fragment } from 'react'
import AppURL from '../../src/api/AppURL';
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import Notification from '../components/Notification/Notification'
import NotificationLoading from '../components/placeholder/NotificationLoading';

class NotificationPage extends Component {
  constructor() {
    super();
    this.state = {
      notificationData : [],

      isLoading: '',
      // d-none là ko hiện
      mainDiv: "d-none"
    }
  }

  // scroll to top
  componentDidMount = () => {
    window.scroll(0, 0);

    axios.get(AppURL.NotificationHistory).then(response => {
      if (response.status == 200) {
        this.setState({
          notificationData: response.data,
          // placeholder
          isLoading: "d-none",
          // d-none là ko hiện
          mainDiv: ""
        })
      }
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <Fragment>
        <div className='Desktop'>
            <NavMenuDesktop/>
            </div>

            <div className='Mobile'>
            <NavMenuMobile/>
            </div>

            {this.state.isLoading == '' ? 
            <NotificationLoading isLoading={this.state.isLoading}/> :
            <Notification notificationData={this.state.notificationData}/>}
            

            <div className='Desktop'>
            <FooterDesktop/>
            </div>

            <div className='Mobile'>
            <FooterMobile/>
        </div>
      </Fragment>
    )
  }
}

export default NotificationPage