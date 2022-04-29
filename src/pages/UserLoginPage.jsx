import React, { Component, Fragment } from 'react'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import UserLogin from '../components/common/UserLogin'

class UserLoginPage extends Component {
  // scroll to top
  componentDidMount = () => {
    window.scroll(0, 0);
  }


  render() {
    const setUser = this.props.setUser;
    // for navigation
    const setCartData = this.props.setCartData;
    const setFavData = this.props.setFavData
    const user = this.props.user;

    return (
        <Fragment> 
            <div className='Desktop'>
            <NavMenuDesktop/>
            </div>

            <div className='Mobile'>
            <NavMenuMobile/>
            </div>


            <UserLogin
              user = {user}
              setCartData = {setCartData}
              setFavData = {setFavData}
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

export default UserLoginPage