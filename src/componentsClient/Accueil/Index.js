import Navbar from '../Navbar/Index'
import SearchSuivi from '../SearchSuivi/Index';
import LineChartClient from '../Line/Index'
import { auth } from '../../firebase/firebaseConfig';
import { useEffect, useState } from 'react';
import { collection, query, onSnapshot, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { numeroSuiviSearch } from '../../redux/reducers/rootReducer';
import { toast } from 'react-toastify';

const Accueil = () => {
  const [displayName, setDisplayName] = useState("");
  const [donneesEnvoi, setDonneesEnvoi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [numeroSuivi, setNumeroSuivi] = useState("")
  const [searchActif, setSearchActif] = useState(false);

  const dispacth = useDispatch();

  useEffect(() => {
    const user = auth.currentUser;
    user && setDisplayName(user.displayName);
  }, []);


  async function search(numero) {
    setLoading(true);
    const q = query(collection(db, "DatasEnvoi"), where("numeroSuivi", "==", `${numero}`));
    const querySnapshot = await getDocs(q);

    try {
      if (querySnapshot.docs.length > 0) {
        querySnapshot.forEach((doc) => {
          dispacth(numeroSuiviSearch(doc.data()))
        });
        setSearchActif(true);
        setLoading(false);
      }else{
        setSearchActif(false);
        setLoading(false);
        toast.error("Numero de suivi incorrect ! ", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error)
    }


  
  }

  return (
    <>
      <Navbar displayName={displayName} />
      <div className='container'>
        <SearchSuivi search={search} loading={loading} />
        <LineChartClient searchActif={searchActif} setSearchActif={setSearchActif} />
      </div>

    </>
  )
}

export default Accueil
