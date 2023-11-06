import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    datasEnvoi: [],
    toggleSidebar: '',
    modalEtat: true,
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
        modalEtat: (state, action)=>{
            state.modalEtat = action.payload;
        },

    }
})

export const {datasEnvoi, toggleSide, modalEtat} = platformeSuiviSlice.actions;


export default platformeSuiviSlice.reducer;