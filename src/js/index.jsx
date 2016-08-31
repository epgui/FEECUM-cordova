import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './Store.js';
import ContainerApplication from './ContainerApplication.jsx';

$(function()
{
  render(
    <Provider store={store}>
      <ContainerApplication />
    </Provider>,
    document.getElementById('app')
  );
});
