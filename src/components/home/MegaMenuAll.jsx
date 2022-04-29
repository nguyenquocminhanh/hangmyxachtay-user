import axios from 'axios';
import React, { Component } from 'react'
import AppURL from '../../api/AppURL';
import { Link } from 'react-router-dom';

class MegaMenuAll extends Component {
    constructor() {
    super();
    this.MegaMenu = this.MegaMenu.bind(this);
    this.state = {
      menuData: []
    }
  }

  componentDidMount = () => {
    this.MegaMenu();
    axios.get(AppURL.AllCategory).then(response => {
      this.setState({
        menuData: response.data
      })
    }).catch(error => {

    })
  }


  MegaMenu() {
    var acc = document.getElementsByClassName('accordionAll');
    var accNum = acc.length;
    var i;
    for (i = 0; i < accNum; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active-menu");
        var panel = this.nextElementSibling;
        if(panel.style.maxHeight) {
          // hide sub menu
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px"; 
        }
      }) 
    }
  }

  menuItemClick=(event)=>{
    event.target.classList.toggle("active-menu");
    var panel = event.target.nextElementSibling;
    if(panel.style.maxHeight){
         panel.style.maxHeight = null;
    }else{
         panel.style.maxHeight= panel.scrollHeight+ "px"
    }
 }

  render() {
    const categoryList = this.state.menuData;
    const myView = categoryList.map((category, i) => {
      return (
        <div key={i.toString()}>
          <button className='accordionAll' onClick={this.menuItemClick}>
            <img className='accordionMenuIconAll' src={category['category_image']}/>
            &nbsp;{category['category_name']}
          </button>

          <div className='panelAll'>
            <ul>
              {category['subcategories'].map((subcategory, j) => {
                return <li><Link to={'/productsubcategory/' + category['category_name'] + '/' + subcategory['subcategory_name']}  className='accordionItem'>{subcategory['subcategory_name']}</Link></li>
              })}
            </ul>
          </div>
        </div>
      )
    })

    return (
        <div className='accordionMenuDivAll'>
          <div className='accordionMenuDivInsideAll'>
            {myView}
          </div>
      </div>
    )
  }
}

export default MegaMenuAll