import axios from 'axios'
import React, { Component, Fragment } from 'react'
import AppURL from '../api/AppURL'

import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import Categories from '../components/home/Categories'
import Collection from '../components/home/Collection'
import FeaturedProducts from '../components/home/FeaturedProducts'
import HomeTop from '../components/home/HomeTop'
import HomeTopMobile from '../components/home/HomeTopMobile'
import NewArrival from '../components/home/NewArrival'

export class HomePage extends Component {

  // scroll to top
  componentDidMount = () => {
    window.scroll(0, 0);
    this.GetVisitorDetails();
  }

  // call the api whenver access HomePage
  GetVisitorDetails = () => {
    axios.get(AppURL.VisitorDetails).then().catch();
  }

  render() {
    
    return (
      <Fragment>
          <div className='Desktop'>
            <NavMenuDesktop/>
            <HomeTop/>
          </div>

          <div className='Mobile'>
            <NavMenuMobile/>
            <HomeTopMobile/>
          </div>
 
          
          
          <NewArrival/>
          <FeaturedProducts/>
          <Categories/>
          <Collection/>


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

export default HomePage