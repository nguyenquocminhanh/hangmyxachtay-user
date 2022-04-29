import axios from 'axios'
import React, { Component, Fragment } from 'react'
import AppURL from '../api/AppURL'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import ProductDetailsLoading from '../components/placeholder/ProductDetailsLoading'
import ProductDetails from '../components/ProductDetails/ProductDetails';

class ProductDetailsPage extends Component {

    constructor({match}) {
      super();
      this.state = {
          code: match.params.code,
          productData: [],
          isLoading: '',
          // d-none là ko hiện
          mainDiv: "d-none",
      } 
    }
    componentDidMount = () => {
        // scroll to top
        window.scroll(0, 0);
        axios.get(AppURL.ProductDetails(this.state.code)).then(response => {
            if (response.status == 200) {
                this.setState({
                    productData: response.data,
                    isLoading: 'd-none',
                    // d-none là ko hiện
                    mainDiv: ""
                })
            }
        }).catch(error => {
    
        });

    } 

  render() {
    const user = this.props.user;
    const favData = this.props.favData;
    const setFavData = this.props.setFavData;
    const setCartData = this.props.setCartData;

    return (
        <Fragment>
            <div className='Desktop'>
                <NavMenuDesktop/>
                </div>

                <div className='Mobile'>
                <NavMenuMobile/>
                </div> 

                {this.state.mainDiv == 'd-none' ? 
                <ProductDetailsLoading isLoading={this.state.isLoading}/> :
                <div>
                    <ProductDetails 
                        productData={this.state.productData}
                        user={user}
                        favData={favData}
                        setFavData={setFavData}
                        setCartData={setCartData}/>
                </div> }

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

export default ProductDetailsPage