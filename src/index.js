import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './components/Root';

const renderApp = () => {
  render(
    <AppContainer>
      <Root />
    </AppContainer>,
    document.getElementById('app'),
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    render();
  });
}

