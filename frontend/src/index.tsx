import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux/es/exports'
import { store } from './redux/store'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'material-symbols'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
//reportWebVitals();
