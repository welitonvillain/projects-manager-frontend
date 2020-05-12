import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

import GlobalStyle from './styles/global';

import { store, persistor } from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Router history={history}>
              <Routes />
              <GlobalStyle />
              <ToastContainer />
            </Router>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
