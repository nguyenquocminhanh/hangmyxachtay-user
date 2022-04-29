import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

export class CartLoading extends Component {
  render() {
    let isLoading = this.props.isLoading;

    return (
      <div>

        {/* Desktop View */}
        <div className='Desktop'>
            <div class="ph-item">
                <div class="ph-col-4">
                    <div class="ph-picture"></div>
                </div>

                <div>
                    <div class="ph-row">
                        <div class="ph-col-12 empty"></div>
                        <div class="ph-col-12"></div>
                        {/* <div class="ph-col-6 empty"></div> */}
                        <div class="ph-col-8"></div>
                        <div class="ph-col-4 empty"></div>
                        <div class="ph-col-10"></div>
                        <div class="ph-col-2 empty"></div>
                        <div class="ph-col-12"></div>
                    </div>
                </div>
            </div>

            <div class="ph-item">
                <div class="ph-col-4">
                    <div class="ph-picture"></div>
                </div>

                <div>
                    <div class="ph-row">
                        <div class="ph-col-12 empty"></div>
                        <div class="ph-col-12"></div>
                        {/* <div class="ph-col-6 empty"></div> */}
                        <div class="ph-col-8"></div>
                        <div class="ph-col-4 empty"></div>
                        <div class="ph-col-10"></div>
                        <div class="ph-col-2 empty"></div>
                        <div class="ph-col-12"></div>
                    </div>
                </div>
            </div>

            <div class="ph-item">
                <div class="ph-col-4">
                    <div class="ph-picture"></div>
                </div>

                <div>
                    <div class="ph-row">
                        <div class="ph-col-12 empty"></div>
                        <div class="ph-col-12"></div>
                        {/* <div class="ph-col-6 empty"></div> */}
                        <div class="ph-col-8"></div>
                        <div class="ph-col-4 empty"></div>
                        <div class="ph-col-10"></div>
                        <div class="ph-col-2 empty"></div>
                        <div class="ph-col-12"></div>
                    </div>
                </div>
            </div>

            <div class="ph-item">
                <div class="ph-col-4">
                    <div class="ph-picture"></div>
                </div>

                <div>
                    <div class="ph-row">
                        <div class="ph-col-12 empty"></div>
                        <div class="ph-col-12"></div>
                        {/* <div class="ph-col-6 empty"></div> */}
                        <div class="ph-col-8"></div>
                        <div class="ph-col-4 empty"></div>
                        <div class="ph-col-10"></div>
                        <div class="ph-col-2 empty"></div>
                        <div class="ph-col-12"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Mobile View */}
        <div className='Mobile'>
            <div class="ph-item">
                <div class="ph-col-3">
                    <div class="ph-picture"></div>
                </div>

                <div>
                    <div class="ph-row">
                        <div class="ph-col-12 empty"></div>
                        <div class="ph-col-12"></div>
                        {/* <div class="ph-col-6 empty"></div> */}
                        <div class="ph-col-8"></div>
                        <div class="ph-col-4 empty"></div>
                        <div class="ph-col-10"></div>
                        <div class="ph-col-2 empty"></div>
                        <div class="ph-col-12"></div>
                    </div>
                </div>
            </div>

            <div class="ph-item">
                <div class="ph-col-3">
                    <div class="ph-picture"></div>
                </div>

                <div>
                    <div class="ph-row">
                        <div class="ph-col-12 empty"></div>
                        <div class="ph-col-12"></div>
                        {/* <div class="ph-col-6 empty"></div> */}
                        <div class="ph-col-8"></div>
                        <div class="ph-col-4 empty"></div>
                        <div class="ph-col-10"></div>
                        <div class="ph-col-2 empty"></div>
                        <div class="ph-col-12"></div>
                    </div>
                </div>
            </div>

            <div class="ph-item">
                <div class="ph-col-3">
                    <div class="ph-picture"></div>
                </div>

                <div>
                    <div class="ph-row">
                        <div class="ph-col-12 empty"></div>
                        <div class="ph-col-12"></div>
                        {/* <div class="ph-col-6 empty"></div> */}
                        <div class="ph-col-8"></div>
                        <div class="ph-col-4 empty"></div>
                        <div class="ph-col-10"></div>
                        <div class="ph-col-2 empty"></div>
                        <div class="ph-col-12"></div>
                    </div>
                </div>
            </div>

            <div class="ph-item">
                <div class="ph-col-3">
                    <div class="ph-picture"></div>
                </div>

                <div>
                    <div class="ph-row">
                        <div class="ph-col-12 empty"></div>
                        <div class="ph-col-12"></div>
                        {/* <div class="ph-col-6 empty"></div> */}
                        <div class="ph-col-8"></div>
                        <div class="ph-col-4 empty"></div>
                        <div class="ph-col-10"></div>
                        <div class="ph-col-2 empty"></div>
                        <div class="ph-col-12"></div>
                    </div>
                </div>
            </div>
    
        </div>
      </div>
    )
  }
}

export default CartLoading