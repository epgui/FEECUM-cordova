import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './Store.js';
import ContainerApplication from './ContainerApplication.jsx';

window.onload = function() {
  document.addEventListener("deviceready", onDeviceReady, false);
};

function onDeviceReady() {

  // FastClick is a simple, easy-to-use library for eliminating the 300ms delay
  // between a physical tap and the firing of a click event on mobile browsers.
  // The aim is to make your application feel less laggy and more responsive
  // while avoiding any interference with your current logic.
  //
  // According to Google:
  //   "...mobile browsers will wait approximately 300ms from the time that you
  //   tap the button to fire the click event. The reason for this is that the
  //   browser is waiting to see if you are actually performing a double tap."
  var FastClick = require('fastclick');

  // The script must be loaded prior to instantiating FastClick on any element of the page.
  FastClick.attach(document.body);

  render(
    <Provider store={store}>
      <ContainerApplication />
    </Provider>,
    document.getElementById('app')
  );

}
