import { Form } from 'react-router-dom';
import Root from '../../routes/route';
import store from '../../redux/store/store';
import { Provider } from 'react-redux';

function App() {

  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;
