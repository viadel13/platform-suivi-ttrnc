import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login/Index";
import Accueil from "../components/Sidebar/menus/Accueil";
import Dashboard from "../components/Dashboard/Index";
import AjouterEnvoi from "../components/Sidebar/menus/AjouterEnvoi";
import ListeEnvois from "../components/Sidebar/menus/ListeEnvois";
import AjoutClient from "../components/Sidebar/menus/AjoutClient";
import AjoutDocument from "../components/Sidebar/menus/AjoutDocument";
import AjouterMarchandise from "../components/Sidebar/menus/AjouterMarchandise";
import ListeMarchandises from "../components/Sidebar/menus/ListeMarchandises";
import ListeClients from "../components/Sidebar/menus/ListeClients";

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} >
          <Route index element={<Accueil />} />
          <Route path="listeEnvois" element={<ListeEnvois />} />
          <Route path="ajouterEnvoi" element={<AjouterEnvoi />} />
          <Route path="listMarchandises" element={<ListeMarchandises />} />
          <Route path="addMarchandise" element={<AjouterMarchandise />} />
          <Route path="ajoutClient" element={<AjoutClient />} />
          <Route path="listeClients" element={<ListeClients />} />
          <Route path="ajoutDocument" element={<AjoutDocument />} />
        </Route>
      </Routes>
   
    </Router>
  );
};

export default Root;
