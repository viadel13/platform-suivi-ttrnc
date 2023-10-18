import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login/Index";
import Accueil from "../components/Sidebar/menus/Accueil";
import Register from '../components/Register/Index'
import Authentification from "../components/Authentification/Index";
import Dashboard from "../components/Dashboard/Index";
import AjouterEnvoi from "../components/Sidebar/menus/AjouterEnvoi";
import ListeEnvois from "../components/Sidebar/menus/ListeEnvois";
import ListMarchandise from "../components/Sidebar/menus/ListMarchandise";
import AddMarchandise from "../components/Sidebar/menus/AddMarchandise";

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentification />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/dashboard" element={<Dashboard />} >
          <Route index element={<Accueil />} />
          <Route path="listeEnvois" element={<ListeEnvois />} />
          <Route path="ajouterEnvoi" element={<AjouterEnvoi />} />
          <Route path="listMarchandises" element={<ListMarchandise />} />
          <Route path="addMarchandise" element={<AddMarchandise />} />
        </Route>
      </Routes>
   
    </Router>
  );
};

export default Root;
