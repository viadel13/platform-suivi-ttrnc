import Navbar from '../Navbar/Index'
import SearchSuivi from '../SearchSuivi/Index';
import LineChartClient from '../Line/Index'
import { auth } from '../../firebase/firebaseConfig';
import { useEffect, useState } from 'react';

const Accueil = () => {
  const[displayName, setDisplayName] = useState("");

  useEffect(()=>{
    const user = auth.currentUser;
    user && setDisplayName(user.displayName);
  }, []);

  return (
    <>
      <Navbar displayName={displayName} />
      <div className='container'>
        <SearchSuivi />
        <LineChartClient />
      </div>

    </>
  )
}

export default Accueil
