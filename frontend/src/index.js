import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducer'
import ErrorBoundary from './ErrorBoundary'

const localStorageMiddleware = store => next => action => {
  let result = next(action)
  localStorage.setItem('session', JSON.stringify(store.getState().user))
  return result
}

const saved = localStorage.getItem('session')
const initialStore = { user: saved ? JSON.parse(saved) : undefined }
const store = createStore(rootReducer, initialStore, applyMiddleware(localStorageMiddleware))

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
