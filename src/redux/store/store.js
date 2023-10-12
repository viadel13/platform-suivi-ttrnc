import {configureStore} from '@reduxjs/toolkit';
import platformeSuiviReducer from '../reducers/rootReducer';


const store = configureStore({
    reducer:{
        platformeSuivi: platformeSuiviReducer,
    }
    
});
  
export default store;