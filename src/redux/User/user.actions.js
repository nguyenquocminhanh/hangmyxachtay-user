import {
    GET_USER_DATA_START, 
    GET_USER_DATA_FAIL, 
    GET_USER_DATA_SUCCESS, 
    
    SET_USER_DATA, 
    SET_FAV_DATA, 
    SET_CART_DATA, 
    
    GET_FAV_DATA_SUCCESS, 
    GET_CART_DATA_SUCCESS,

    CLEAR_USER_DATA,
    CLEAR_CART_DATA,
    CLEAR_FAV_DATA}  from './user.types';

import axios from 'axios';
import AppURL from '../../api/AppURL';

export const getUserDataStart = () => {
    return {
        type: GET_USER_DATA_START
    }
}

export const getUserDataSuccess = (user) => {
    return {
        type: GET_USER_DATA_SUCCESS,
        // --------------------- // action.user
        user: user,
    }
}

export const getFavDataSuccess = (favData) => {
    return {
        type: GET_FAV_DATA_SUCCESS,
        // --------------------- // action.user
        favData: favData,
    }
}

export const getCartDataSuccess = (cart) => {
    return {
        type: GET_CART_DATA_SUCCESS,
        // --------------------- // action.user
        cart: cart,
    }
}

export const getUserDataFail = (error) => {
    return {
        type: GET_USER_DATA_FAIL,
        // --------------------- // action.error
        error: error
    }
}

export const getUserData = () => {
    return dispatch => {
        dispatch(getUserDataStart());

        axios.get(AppURL.UserData)
            .then(response => {     // get user data success
                dispatch(getUserDataSuccess(response.data));
                // get favorite data
                axios.get(AppURL.FavouriteList(response.data['email']))
                    .then(res => {
                        dispatch(getFavDataSuccess(res.data));
                    })
                    .catch(e => {
                        console.log(e)
                    })

                // get cart data
                axios.get(AppURL.CartList(response.data['email']))
                    .then(resp => {
                        dispatch(getCartDataSuccess(resp.data))
                    })
                    .catch(err => {
                        console.log(err)
                    }) 
            })
            .catch(error => {
                dispatch(getUserDataFail(error.response.message))
            })
    }
};

export const setUserData = (userData) => {
    return {
        type: SET_USER_DATA,
        user: userData
    }
}

export const setFavData = (favData) => {
    return {
        type: SET_FAV_DATA,
        favData: favData
    }
}

export const setCartData = (cart) => {
    return {
        type: SET_CART_DATA,
        cart: cart
    }
}

export const clearUserData = () => {
    return {
        type: CLEAR_USER_DATA,
    }
}

export const clearFavData = () => {
    return {
        type: CLEAR_FAV_DATA,
    }
}

export const clearCartData = () => {
    return {
        type: CLEAR_CART_DATA,
    }
}

export const clearAllData = () => {
    return dispatch => {
        dispatch(clearUserData());
        dispatch(clearFavData());
        dispatch(clearCartData());
    }
}
