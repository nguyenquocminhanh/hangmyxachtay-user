import React, { Component, Fragment } from 'react'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import Profile from '../components/common/Profile'
import axios from 'axios';
import AppURL from '../api/AppURL';

class ProfilePage extends Component {
  // scroll to top
  componentDidMount = () => {
    window.scroll(0, 0);

  }


  render() {
    const setUser = this.props.setUser;
    const user = this.props.user;
    
    return (
        <Fragment> 
            <div className='Desktop'>
            <NavMenuDesktop/>
            </div>

            <div className='Mobile'>
            <NavMenuMobile/>
            </div>


            <Profile
              user = {user}
              setUser = {setUser}/>


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

export default ProfilePage