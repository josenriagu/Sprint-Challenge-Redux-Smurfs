import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import rootreducer from './reducers';
import { loadState, saveState } from './localStorage';
import App from './App';
import './index.css';

const persistedState = loadState();

const store = createStore(
  rootreducer,
  persistedState,
  applyMiddleware(thunk, logger)
);

// save only smurf slice of state
store.subscribe(() => {
  saveState({
    smurfs: store.getState().smurfs
  });
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
