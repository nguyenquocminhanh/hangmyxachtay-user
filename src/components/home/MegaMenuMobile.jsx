import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';

class MegaMenuMobile extends Component {
    constructor(props) {
    super(props);
    this.MegaMenu = this.MegaMenu.bind(this);
  }

  componentDidMount = () => {
    this.MegaMenu();
  }


  MegaMenu() {
    var acc = document.getElementsByClassName('accordionMobile');
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
    const categoryList = this.props.data;
    const myView = categoryList.map((category, i) => {
      return (
        <div key={i.toString()}>
          <button className='accordion' onClick={this.menuItemClick}>
            <img className='accordionMenuIcon' src={category['category_image']}/>
            &nbsp;{category['category_name']}
          </button>

          <div className='panel'>
            <ul>
              {
                category['subcategories'].map((subcategory, j) => {
                  return <li><Link to={'/productsubcategory/' + category['category_name'] + '/' + subcategory['subcategory_name']}  className='accordionItem'>{subcategory['subcategory_name']}</Link></li>
                })
              }
            </ul>
          </div>
        </div>
      )
    })

    return (
      <div className='accordionMenuDivMobile'>
        <div className='accordionMenuDivInsideMobile'>
          {myView}
        </div>
      </div>
    )
  }
}

export default MegaMenuMobile