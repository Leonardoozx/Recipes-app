import React from 'react'
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from 'history';
import { legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react';

const renderWithRouterAndRedux = (
  component,
  { initialState, store = createStore(reducer, initialState) } = {}
) => {
  const history = createMemoryHistory();
  return {
    ...render(
    <Provider store={store}>
      <Router history={ history }>
        {component}
      </Router>
    </Provider>), store, history
  }
}

export default renderWithRouterAndRedux;
