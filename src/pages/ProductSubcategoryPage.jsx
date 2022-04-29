import axios from 'axios'
import React, { Component, Fragment } from 'react'
import AppURL from '../api/AppURL'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import ProductSubcategoryLoading from '../components/placeholder/ProductSubcategoryLoading'
import Subcategory from '../components/ProductDetails/Subcategory'

class ProductSubcategoryPage extends Component {
 // ************************** //
 constructor({match}) {
    super();
    this.state = {
        category: match.params.category,
        subcategory: match.params.subcategory,
        productData: [],

        // placeholder
        isLoading: '',
        mainDiv: 'd-none'
    }
 }


  // scroll to top
  componentDidMount = () => {
    window.scroll(0, 0);
    axios.get(AppURL.ProductListBySubCategory(this.state.category, this.state.subcategory)).then(response => {
        if (response.status == 200) {
            this.setState({
                productData: response.data,
                isLoading: 'd-none',
                mainDiv: ''
            }) 
        }
    }).catch(error => {

    });
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
            <ProductSubcategoryLoading 
              isLoading={this.state.isLoading} 
              category={this.state.category} subcategory={this.state.subcategory}/>
            :
            <Subcategory
                category={this.state.category}
                subcategory={this.state.subcategory}
                productData={this.state.productData}/>}

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

export default ProductSubcategoryPage