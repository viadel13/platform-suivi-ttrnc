import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";


const initialState = {
    datasEnvoi: [],
}

const platformeSuiviSlice = createSlice({
    name: 'platformeSuivi',
    initialState,

    reducers:{
        
        datasEnvoi: (state, action)=>{
            state.datasEnvoi = [...state.datasEnvoi, action.payload];
        },

    }
})

export const {datasEnvoi} = platformeSuiviSlice.actions;


export default platformeSuiviSlice.reducer;