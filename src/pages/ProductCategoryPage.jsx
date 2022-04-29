import axios from 'axios'
import React, { Component, Fragment } from 'react'
import AppURL from '../api/AppURL'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import ProductCategoryLoading from '../components/placeholder/ProductCategoryLoading'
import Category from '../components/ProductDetails/Category'

class ProductCategoryPage extends Component {
  // ************************** //
  constructor({match}) {
      super();
      this.state = {
          category: match.params.category,
          productData: [],

          // placeholder
          isLoading: '',
          mainDiv: 'd-none'
      }
  }


  // scroll to top
  componentDidMount = () => {
    window.scroll(0, 0);
    axios.get(AppURL.ProductListByCategory(this.state.category)).then(response => {
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
                <ProductCategoryLoading isLoading={this.state.isLoading} category={this.state.category}/> :
                

                <Category 
                    category={this.state.category}
                    productData={this.state.productData}/>
                }

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

export default ProductCategoryPage