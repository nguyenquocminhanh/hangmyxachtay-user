import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export class CategoryLoading extends Component {
  render() {
    let isLoading = this.props.isLoading;

    return (
      <div className={isLoading}>
        <Container className="text-center" fluid={true}>
            <div className='section-title text-center mb-55'>
                  <h2>CATEGORIES</h2>
                  <p>Shop By Categories</p>
              </div>
            
            <div className='row'>
                {/* 6 cards => 6 placeholder column */}
                <div className="col-lg-2 col-md-2 col-sm-6 col-6 p-1">
                    <a href="" className="card image-box h-100  w-100">
                        <div class="ph-picture"></div>
                        <div className="ph-item">
                            <div className="ph-col-12">
                                <div className="ph-row">
                                    <div className="ph-col-12 small"/>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="col-lg-2 col-md-2 col-sm-6 col-6 p-1">
                    <a href="" className="card image-box h-100  w-100">
                        <div class="ph-picture"></div>
                        <div className="ph-item">
                            <div className="ph-col-12">
                                <div className="ph-row">
                                    <div className="ph-col-12 small"/>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="col-lg-2 col-md-2 col-sm-6 col-6 p-1">
                    <a href="" className="card image-box h-100  w-100">
                        <div class="ph-picture"></div>
                        <div className="ph-item">
                            <div className="ph-col-12">
                                <div className="ph-row">
                                    <div className="ph-col-12 small"/>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="col-lg-2 col-md-2 col-sm-4 col-6 p-1">
                    <a href="" className="card image-box h-100  w-100">
                        <div class="ph-picture"></div>
                        <div className="ph-item">
                            <div className="ph-col-12">
                                <div className="ph-row">
                                    <div className="ph-col-12 small"/>
                                 
                                </div>
                            </div>
                        </div>
                    </a>
                </div>



                <div className="col-lg-2 col-md-2 col-sm-4 col-6 p-1">
                    <a href="" className="card image-box h-100  w-100">
                        <div class="ph-picture"></div>
                        <div className="ph-item">
                            <div className="ph-col-12">
                                <div className="ph-row">
                                    <div className="ph-col-12 small"/>
                                  
                                </div>
                            </div>
                        </div>
                    </a>
                </div>



                <div className="col-lg-2 col-md-2 col-sm-4 col-6 p-1">
                    <a href="" className="card image-box h-100  w-100">
                        <div class="ph-picture"></div>
                        <div className="ph-item">
                            <div className="ph-col-12">
                                <div className="ph-row">
                                    <div className="ph-col-12 small"/>
                                    
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

 
            </div>
        </Container>
      </div>
    )
  }
}

export default CategoryLoading