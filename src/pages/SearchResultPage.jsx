import axios from 'axios'
import React, { Component, Fragment } from 'react'
import AppURL from '../api/AppURL'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import SearchResultLoading from '../components/placeholder/SearchResultLoading'
import SearchResult from '../components/ProductDetails/SearchResult'

class SearchResultPage extends Component {
  // ************************** //
  constructor({match}) {
    super();
    this.state = {
        searchKey: match.params.key,
        searchData: [],

        // placeholder
        isLoading: '',
        mainDiv: 'd-none'
    }
  }

    // scroll to top
    componentDidMount = () => {
        window.scroll(0, 0);
        axios.get(AppURL.ProductListBySearch(this.state.searchKey)).then(response => {
            if (response.status == 200) {
                this.setState({
                    searchData: response.data,
    
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
                <SearchResultLoading isLoading={this.state.isLoading} searchKey={this.state.searchKey}/>:
                <SearchResult 
                    searchKey={this.state.searchKey}
                    searchData={this.state.searchData}/>
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

export default SearchResultPage