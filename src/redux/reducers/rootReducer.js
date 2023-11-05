import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    datasEnvoi: [],
    toggleSidebar: '',
}

const platformeSuiviSlice = createSlice({
    name: 'platformeSuivi',
    initialState,

    reducers:{
        
        datasEnvoi: (state, action)=>{
            state.datasEnvoi = [...state.datasEnvoi, action.payload];
        },
        toggleSide: (state, action)=>{
            state.toggleSidebar = action.payload;
        },

    }
})

export const {datasEnvoi, toggleSide} = platformeSuiviSlice.actions;


export default platformeSuiviSlice.reducer;