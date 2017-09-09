import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';

import CApp from '../containers/CApp';
import rootReducer from '../reducers';

const store = compose()(createStore)(rootReducer);

const Root = ({ routes }) => (
  <Provider store={store}>
    <CApp />
  </Provider>
);

export default Root;

