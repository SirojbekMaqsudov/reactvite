import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "react-auth-kit";
import refreshApiCallback from "./utils/refreshApiCallback.js";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider authType={'localstorage'} authName={'_auth'} refresh={refreshApiCallback}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </AuthProvider>
  </React.StrictMode>,
)