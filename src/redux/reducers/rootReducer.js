import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";




const fetchDataFromFirestore = async () =>{
    const querySnapshot = await getDocs(collection(db, "DatasEnvoi"));
    const data = [];
    querySnapshot.forEach((doc)=>{
        data.push(doc.data());
    })

    localStorage.setItem("datasEnvoi", JSON.stringify(data));
}

fetchDataFromFirestore();

const localStorageDatas = JSON.parse(localStorage.getItem('datasEnvoi')) || [] ;

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