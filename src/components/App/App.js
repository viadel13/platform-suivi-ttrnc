import Root from '../../routes/route';
import store from '../../redux/store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from 'react';


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    // Vérifie le readyState actuel de la page
    if (document.readyState === 'complete') {
      // Si la page est déjà complètement chargée, masquez le preloader immédiatement
      setLoading(false);
    } else {
      // Si la page n'est pas complètement chargée, ajoutez un gestionnaire d'événements pour l'événement load
      window.addEventListener('load', handleLoad);
    }

    // Nettoie le gestionnaire d'événements lorsque le composant est démonté
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <Provider store={store}>
      {loading ? <p>Chargement</p> : (
        <>
          <Root />
          <ToastContainer />
        </>
      )}

    </Provider>
  );
}

export default App;
