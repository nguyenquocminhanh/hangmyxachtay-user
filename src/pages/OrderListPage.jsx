import React, { Component, Fragment } from 'react'
import OrderList from '../components/Cart/OrderList'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'

class OrderListPage extends Component {
  render() {
    const user = this.props.user;

    return (
        <Fragment>
        <div className='Desktop'>
            <NavMenuDesktop/>
            </div>

            <div className='Mobile'>
            <NavMenuMobile/>
            </div>

            <OrderList user={user}/>

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

export default OrderListPage