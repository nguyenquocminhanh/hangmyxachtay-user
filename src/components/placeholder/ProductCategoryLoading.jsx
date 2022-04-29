import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export class ProductCategoryLoading extends Component {
  render() {
    let category = this.props.category;
    let isLoading = this.props.isLoading;

    return (
      <div className={isLoading}>
        <Container className="text-center" fluid={true}>
            <div className='section-title text-center mb-40 mt-2'>
                <h2> {category} </h2>
            </div>
              
            
            <div className='row'>
                {/* 6 cards => 6 placeholder column */}
                <div className="col-lg-3 col-md-6 col-sm-12 col-6 p-1">
                    <a href="" className="card image-box h-100  w-100">
                        <div class="ph-picture"></div>
                        <div className="ph-item">
                            <div className="ph-col-12">
                                <div className="ph-row">
                                    <div className="ph-col-12 small"/>
                                    <div className="ph-col-12 small"/>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>



                <div className="col-lg-3 col-md-6 col-sm-12 col-6 p-1">
                    <a href="" className="card image-box h-100  w-100">
                        <div class="ph-picture"></div>
                        <div className="ph-item">
                            <div className="ph-col-12">
                                <div className="ph-row">
                                    <div className="ph-col-12 small"/>
                                    <div className="ph-col-12 small"/>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12 col-6 p-1">
                    <a href="" className="card image-box h-100  w-100">
                        <div class="ph-picture"></div>
                        <div className="ph-item">
                            <div className="ph-col-12">
                                <div className="ph-row">
                                    <div className="ph-col-12 small"/>
                                    <div className="ph-col-12 small"/>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12 col-6 p-1">
                    <a href="" className="card image-box h-100  w-100">
                        <div class="ph-picture"></div>
                        <div className="ph-item">
                            <div className="ph-col-12">
                                <div className="ph-row">
                                    <div className="ph-col-12 small"/>
                                    <div className="ph-col-12 small"/>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12 col-6 p-1">
                    <a href="" className="card image-box h-100  w-100">
                        <div class="ph-picture"></div>
                        <div className="ph-item">
                            <div className="ph-col-12">
                                <div className="ph-row">
                                    <div className="ph-col-12 small"/>
                                    <div className="ph-col-12 small"/>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12 col-6 p-1">
                    <a href="" className="card image-box h-100  w-100">
                        <div class="ph-picture"></div>
                        <div className="ph-item">
                            <div className="ph-col-12">
                                <div className="ph-row">
                                    <div className="ph-col-12 small"/>
                                    <div className="ph-col-12 small"/>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                
                <div className="col-lg-3 col-md-6 col-sm-12 col-6 p-1">
                    <a href="" className="card image-box h-100  w-100">
                        <div class="ph-picture"></div>
                        <div className="ph-item">
                            <div className="ph-col-12">
                                <div className="ph-row">
                                    <div className="ph-col-12 small"/>
                                    <div className="ph-col-12 small"/>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12 col-6 p-1">
                    <a href="" className="card image-box h-100  w-100">
                        <div class="ph-picture"></div>
                        <div className="ph-item">
                            <div className="ph-col-12">
                                <div className="ph-row">
                                    <div className="ph-col-12 small"/>
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

export default ProductCategoryLoading