import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export class CollectionLoading extends Component {
  render() {
    let isLoading = this.props.isLoading;

    return (
      <div className={isLoading}>
        <Container className="text-center" fluid={true}>
            <div className='Desktop'>
                <div className="section-title text-center mb-55"><h2>HOT DEALS </h2>
                    <p>Great Shop With Great Price Ever</p>
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
            </div>

            {/* Mobile Size */}
            <div className='Mobile'>
                <div className="section-title text-center mb-55">
                    <h2 className="section-title text-center mb-55">HOT DEALS &nbsp;</h2>
                    <p>Great Shop With Great Price Ever</p>
                </div>
                
                <div className='row'>
                    {/* 6 cards => 6 placeholder column */}
                    <div className="col-lg-3 col-md-6 col-sm-12 p-1">
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
            </div>
        </Container>
      </div>
    )
  }
}

export default CollectionLoading