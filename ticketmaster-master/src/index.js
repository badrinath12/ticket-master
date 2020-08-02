import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style.css'
import App from './App';
import {Provider} from 'react-redux'
import configureStore from './store/configuresStore'

 
const store = configureStore() 
store.subscribe(() => {
  console.log(store.getState())
})

const ele = (
  <Provider store = {store}>
      <App/>
  </Provider>
)

ReactDOM.render(ele, document.getElementById('root') )