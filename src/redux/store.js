import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';


const store = createStore(
    rootReducer,
    // chrome extension app support
    composeWithDevTools(),
);


export default store;