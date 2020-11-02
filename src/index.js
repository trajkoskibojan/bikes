import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import App from 'App';
import homeReducer from 'store/reducers/home';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
 
const composeEnhancers = 
  process.env.NODE_ENV === 'development' 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducers = combineReducers({
  home: homeReducer,
});

const store = createStore(
  rootReducers, 
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
