import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    datasEnvoi: [],
    toggleSidebar: '',
    modalEtat: true,
    modalEtatFournisseur: true,
    datasDoc: [],
    theme: 'light',
    isRegistering: false
}

const platformeSuiviSlice = createSlice({
    name: 'platformeSuivi',
    initialState,

    reducers: {

        datasEnvoi: (state, action) => {
            state.datasEnvoi = [...state.datasEnvoi, action.payload];
        },
        toggleSide: (state, action) => {
            state.toggleSidebar = action.payload;
        },
        modalEtat: (state, action) => {
            state.modalEtat = action.payload;
        },
        modalEtatFournisseur: (state, action) => {
            state.modalEtatFournisseur = action.payload;
        },
        theme: (state, action) =>{
            state.theme = action.payload;
        },
        isRegistering: (state, action) =>{
            state.isRegistering = action.payload;
        },

    }
})

export const { datasEnvoi, toggleSide, modalEtat, modalEtatFournisseur, datasDoc, theme, isRegistering } = platformeSuiviSlice.actions;


export default platformeSuiviSlice.reducer;