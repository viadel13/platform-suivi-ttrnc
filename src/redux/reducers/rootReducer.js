import { createSlice } from "@reduxjs/toolkit";

const localStorageDatas = JSON.parse(localStorage.getItem('datasEnvoi')) || [];

const initialState = {
    datasEnvoi: localStorageDatas,
}

const platformeSuiviSlice = createSlice({
    name: 'platformeSuivi',
    initialState,

    reducers:{
        
        datasEnvoi: (state, action)=>{
            state.datasEnvoi = [...state.datasEnvoi, action.payload];
            localStorage.setItem("datasEnvoi", JSON.stringify(state.datasEnvoi));
        },

    }
})

export const {datasEnvoi} = platformeSuiviSlice.actions;


export default platformeSuiviSlice.reducer;