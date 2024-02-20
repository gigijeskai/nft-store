import { configureStore} from '@reduxjs/toolkit';
import apiReducer from './reducers/api-reducer';
import cartReducer from './reducers/cart-reducer';


export const store = configureStore({
    reducer:{
        photos: apiReducer,
        cart : cartReducer,
    },
});

export default store;