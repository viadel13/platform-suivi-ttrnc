import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const initialState = {
    datasEnvoi: [],
    toggleSidebar: '',
    modalEtat: true,
    datasDoc: [],
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
        datasDoc: (state, action) => {
            state.datasDoc = [...state.datasDoc, action.payload]
        }

    }
})

export const { datasEnvoi, toggleSide, modalEtat, datasDoc } = platformeSuiviSlice.actions;

export const addDocument = (link) => async (dispacth) => {
    try {

        await addDoc(collection(db, "Documents"), {
            NumeroSuivi: '',
            ConnaissementBL: '',
            numeroFacture: '',
            listeColissage: link[0] || '',
            certificatOrigine: link[1] || '',
            certificatPhytoSanitaire: link[2] || '',
            RCV: '',
            fichierRCV: link[3] || '',  // Assurez-vous que link[3] n'est pas undefined
            PAD: '',
            FichierPAD: link[4] || '',
            autorisationEnlevement: link[5] || '',
            bonSortie: link[6] || '',
            Autres: link[7] || '',
        });

    } catch (error) {
        console.log(error);
    }
}

export default platformeSuiviSlice.reducer;