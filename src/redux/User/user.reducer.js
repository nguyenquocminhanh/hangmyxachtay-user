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

const INITIAL_STATE = {
    user: {},
    fav: [],
    // for navmenu
    cart: [],

    error: '',
    loading: true
};

const reducer = (state = INITIAL_STATE, action) => {  
  switch (action.type) {
    case GET_USER_DATA_START:
      return {
        ...state, 
        loading: true,
        cartCount: 'Loading...'
      };

    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        // loading: false,
        user: action.user,
        error: ''
      }

    case GET_FAV_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        fav: action.favData,
        error: ''
      }

    case GET_CART_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.cart,
        error: ''
      }
      
    case GET_USER_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case SET_USER_DATA:
      return {
        ...state,
        user: action.user
      }

    case SET_FAV_DATA:
      return {
        ...state,
        fav: action.favData
      }

    case SET_CART_DATA:
      return {
        ...state,
        cart: action.cart
      }

    case CLEAR_USER_DATA:
      return {
        ...state,
        user: {}
      }

    case CLEAR_FAV_DATA:
      return {
        ...state,
        fav: []
      }

    case CLEAR_CART_DATA:
      return {
        ...state,
        cart: []
      }
    

    default: 
      return state
  }

};

export default reducer;