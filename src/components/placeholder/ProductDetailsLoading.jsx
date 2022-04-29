import React, { Component } from 'react'

export class ProductDetailsLoading extends Component {
  render() {
    let isLoading = this.props.isLoading;

    return (
      <div className={isLoading}>
        <div className='Desktop'>
            <div className='ph-row px-2'>
                <div className='ph-col-6 big'></div>
                <div className='ph-col-6 empty big'></div>
            </div>
            <br/>
            <div className='row'>
                <div className='col-6 px-1'>
                    <div class="ph-picture"></div>
                    <div class="ph-picture"></div>
                    <div class="ph-picture"></div>
                    <br/>
                    <div className='row'>
                        <div className='col-3 px-1'>
                            <div class="ph-picture"></div>
                        </div>
                        <div className='col-3 px-1'>
                            <div class="ph-picture"></div>
                        </div>
                        <div className='col-3 px-1'>
                            <div class="ph-picture"></div>
                        </div>
                        <div className='col-3 px-1'>
                            <div class="ph-picture"></div>
                        </div>
                    </div>
                </div>

                <div className='col-6 px-2'>
                    <div className="ph-row">
                        <div className="ph-col-6 big"></div>
                        <div className="ph-col-6 empty big"></div>
                        <div className="ph-col-10"></div>
                        <div className="ph-col-2 empty"></div>
    
                        <div className="ph-col-2" ></div>
                        <div className="ph-col-10 empty"></div>
                        <div className="ph-col-4" ></div>
                        <div className="ph-col-8 empty"></div>
                        <div className="ph-col-6" ></div>
                        <div className="ph-col-6 empty"></div>
                        <div className="ph-col-4" ></div>
                        <div className="ph-col-8 empty"></div>
                        <div className="ph-col-2" ></div>
                        <div className="ph-col-10 empty"></div>
                        <div className="ph-col-6" ></div>
                        <div className="ph-col-6 empty"></div>
                        <div className="ph-col-8 big"></div>
                        <div className="ph-col-4 empty big"></div>
                        <div className="ph-col-2" ></div>
                        <div className="ph-col-10 empty"></div>
                        <div className="ph-col-8 big"></div>
                        <div className="ph-col-4 empty big"></div>
                        <div className="ph-col-2" ></div>
                        <div className="ph-col-10 empty"></div>
                        <div className="ph-col-8 big"></div>
                        <div className="ph-col-4 empty big"></div>
                    </div>
                    <br/>
                    <div className="ph-row">
                        <div className="ph-col-2 big"></div>
                        <div className="ph-col-2 empty big"></div>
                        <div className="ph-col-2 big"></div>
                        <div className="ph-col-2 empty big"></div>
                        <div className="ph-col-2 big"></div>
                        <div className="ph-col-2 empty big"></div>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div className='ph-row'>
                        <div className="ph-col-4 big" ></div>
                        <div className="ph-col-8 empty big"></div>
                        <div className="ph-col-2 big" ></div>
                        <div className="ph-col-10 empty big"></div>
                        <div className="ph-col-8"></div>
                        <div className="ph-col-4 empty"></div>
                        <div className="ph-col-8"></div>
                        <div className="ph-col-4 empty"></div>
                        <div className="ph-col-2 big" ></div>
                        <div className="ph-col-10 empty big"></div>
                        <div className="ph-col-8"></div>
                        <div className="ph-col-4 empty"></div>
                        <div className="ph-col-8"></div>
                        <div className="ph-col-4 empty"></div>
                        <div className="ph-col-2 big" ></div>
                        <div className="ph-col-10 empty big"></div>
                        <div className="ph-col-8"></div>
                        <div className="ph-col-4 empty"></div>
                        <div className="ph-col-8"></div>
                        <div className="ph-col-4 empty"></div>
                    </div>
                </div>
                
            </div>
        </div>

        <div className='Mobile'>
            <div className='row'>
                <div className='col-12'>
                    <div class="ph-picture"></div>
                    <div class="ph-picture"></div>
                    <br/>
                    <div className='row'>
                        <div className='col-3 px-1'>
                            <div class="ph-picture"></div>
                        </div>
                        <div className='col-3 px-1'>
                            <div class="ph-picture"></div>
                        </div>
                        <div className='col-3 px-1'>
                            <div class="ph-picture"></div>
                        </div>
                        <div className='col-3 px-1'>
                            <div class="ph-picture"></div>
                        </div>
                    </div>
                </div>
                
       
                <div className='col-12 mt-3 px-1'>
                    <div class="ph-row">
                        <div class="ph-col-10"></div>
                        <div class="ph-col-2 empty"></div>

                        <div class="ph-col-4"></div>
                        <div class="ph-col-8 empty"></div>

                        <div class="ph-col-10"></div>
                        <div class="ph-col-2 empty"></div>

                        <div class="ph-col-4"></div>
                        <div class="ph-col-8 empty"></div>

                        <div class="ph-col-6"></div>
                        <div class="ph-col-6 empty"></div>

                        <div class="ph-col-2"></div>
                        <div class="ph-col-10 empty"></div>

                        <div class="ph-col-4"></div>
                        <div class="ph-col-8 empty"></div>

                        <div class="ph-col-6"></div>
                        <div class="ph-col-6 empty"></div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default ProductDetailsLoading