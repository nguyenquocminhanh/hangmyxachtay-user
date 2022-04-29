import React, { Component, Fragment } from 'react'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import Favorite from '../components/Favorite/Favorite';
// redux
import { connect } from "react-redux"

class FavoritePage extends Component {
  // scroll to top
  componentDidMount = () => {
    window.scroll(0, 0);
  }

  render() {
    const favData = this.props.favData;
    const setFavData = this.props.setFavData;

    return (
      <Fragment>
        <div className='Desktop'>
            <NavMenuDesktop/>
            </div>

            <div className='Mobile'>
            <NavMenuMobile/>
            </div>

            <Favorite
              user={this.props.user}
              favData={favData}
              setFavData={setFavData}
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

export default connect(mapStateToProps, null)(FavoritePage)