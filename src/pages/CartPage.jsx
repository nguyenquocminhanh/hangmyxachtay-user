import React, { Component, Fragment } from 'react'
import Cart from '../components/Cart/Cart'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
// redux
import { connect } from "react-redux"

class CartPage extends Component {
  // scroll to top
  componentDidMount = () => {
    window.scroll(0, 0);
  }
  
  render() {
    const user = this.props.user;
    const setCartData = this.props.setCartData;
    const cart = this.props.cart

    return (
      <Fragment>
          <div className='Desktop'>
            <NavMenuDesktop/>
            </div>

            <div className='Mobile'>
            <NavMenuMobile/>
            </div>

            <Cart user={user}
            // set cart on cart redux
              setCartData={setCartData}
              cart={cart}
              loading={this.props.loading}/> 

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

const mapStateToProps = state => {
  return {
    loading: state.user.loading,
  }
}

export default connect(mapStateToProps, null)(CartPage)