import Root from '../../routes/route';
import store from '../../redux/store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'animate.css';


function App() {

  return (
    <Provider store={store}>
      <>
        <Root />
        <ToastContainer />
      </>
    </Provider>
  );
}

export default App;
