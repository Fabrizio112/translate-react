import React from 'react'
import ReactDOM from 'react-dom/client'
import TranslateApp from './Components/TranslateApp'
import "./assets/css/styles.css"
import { TranslateProvider } from './Context/TranslateContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TranslateProvider>
      <TranslateApp />
    </TranslateProvider>
  </React.StrictMode>,
)
