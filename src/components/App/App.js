import Root from '../../routes/route';
import store from '../../redux/store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'animate.css';


function App() {
  console.log("%c Welcome to TTNRC", "color:white; background:#0d6dfda4; font-size: 25px; text-align: center; text-transform: uppercase;padding: 3px;");
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
