import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './site.css'
import logoPng from './assets/Logo.png'

function setFavicon(href: string) {
  // Garante que o ícone da aba do navegador seja a logo.
  let link = document.querySelector<HTMLLinkElement>("link[rel='icon']")
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.href = href
  link.type = 'image/png'
}

setFavicon(logoPng)

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

