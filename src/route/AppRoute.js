import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Switch, Route } from 'react-router'
import AppURL from '../api/AppURL'

import AboutPage from '../pages/AboutPage'
import CartPage from '../pages/CartPage'
import ContactPage from '../pages/ContactPage'
import FavoritePage from '../pages/FavoritePage'
import ForgetPasswordPage from '../pages/ForgetPasswordPage'

import HomePage from '../pages/HomePage'
import NotificationPage from '../pages/NotificationPage'
import PrivacyPage from '../pages/PrivacyPage'
import ProductCategoryPage from '../pages/ProductCategoryPage'
import ProductDetailsPage from '../pages/ProductDetailsPage'
import ProductSubcategoryPage from '../pages/ProductSubcategoryPage'
import ProfilePage from '../pages/ProfilePage'
import PurchasePage from '../pages/PurchasePage'
import RefundPage from '../pages/RefundPage'
import RegisterPage from '../pages/RegisterPage'
import ResetPasswordPage from '../pages/ResetPasswordPage'
import SearchResultPage from '../pages/SearchResultPage'
import UserLoginPage from '../pages/UserLoginPage'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import OrderListPage from '../pages/OrderListPage'

// redux
import { connect } from "react-redux"
import {
  getUserData,
  setUserData,
  setFavData,
  setCartData,
} from "../redux/User/user.actions"

class AppRoute extends Component {
  constructor(props) {
    super(props);
  }

  // mỗi lần refresh bất kì page nào sẽ từ động get userprofile
  // nếu có token trong localstorage và truyền xuống các page con
  // thay redux
  componentDidMount = () => {
    this.props.getUserData();
  }

  render() {
    return (
        <Fragment>
            {/* <NavMenuDesktop/> */}

            <Switch>
                {/* <Route exact path="/" component={HomePage}/> */}
                <Route exact path="/" render={(props) => <HomePage {...props} key={Date.now()}/>}/>
                <Route exact path="/login" render={(props) => <UserLoginPage user={this.props.user} setUser={this.props.setUser} setCartData={this.props.setCartData} setFavData={this.props.setFavData} {...props} key={Date.now()}/>}/>
                <Route exact path="/register" render={(props) => <RegisterPage {...props} key={Date.now()}/>}/>
                <Route exact path="/forget" render={(props) => <ForgetPasswordPage {...props} key={Date.now()}/>}/>
                <Route exact path="/reset/:id" render={(props) => <ResetPasswordPage {...props} key={Date.now()}/>}/>
                {/* ******* */}
                <Route exact path="/profile" render={(props) => <ProfilePage user={this.props.user} setUser={this.props.setUser} {...props} key={Date.now()}/>}/>

                <Route exact path="/contact" render={(props) => <ContactPage {...props} key={Date.now()}/>}/>

                <Route exact path="/purchase" render={(props) => <PurchasePage user={this.props.user} {...props} key={Date.now()}/>}/>
                <Route exact path="/privacy" render={(props) => <PrivacyPage {...props} key={Date.now()}/>}/>
                <Route exact path="/refund" render={(props) => <RefundPage {...props} key={Date.now()}/>}/>
                <Route exact path="/about" render={(props) => <AboutPage {...props} key={Date.now()}/>}/>

                <Route exact path="/productdetails/:code" render={(props) => <ProductDetailsPage user={this.props.user} favData={this.props.favData} setFavData={this.props.setFavData} setCartData={this.props.setCartData} {...props} key={Date.now()}/>}/>

                <Route exact path="/notification" render={(props) => <NotificationPage {...props} key={Date.now()}/>}/>

                <Route exact path="/favourite" render={(props) => <FavoritePage user={this.props.user} favData={this.props.favData} setFavData={this.props.setFavData} {...props} key={Date.now()}/>}/>
                <Route exact path="/cart" render={(props) => <CartPage user={this.props.user} cart={this.props.cart} setCartData={this.props.setCartData} {...props} key={Date.now()}/>}/>
                <Route exact path="/orderlist" render={(props) => <OrderListPage user={this.props.user} {...props} key={Date.now()}/>}/>

                <Route exact path="/productcategory/:category" render={(props) => <ProductCategoryPage {...props} key={Date.now()}/>}/>
                <Route exact path="/productsubcategory/:category/:subcategory" render={(props) => <ProductSubcategoryPage {...props} key={Date.now()}/>}/>
                <Route exact path="/productbysearch/:key" render={(props) => <SearchResultPage {...props} key={Date.now()}/>}/>
            </Switch>
        </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    favData: state.user.fav,
    cart: state.user.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserData: () => {getUserData()(dispatch)},
    setUser: (user) => dispatch(setUserData(user)),
    setFavData: (favData) => dispatch(setFavData(favData)),
    setCartData: (cart) => dispatch(setCartData(cart)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoute)