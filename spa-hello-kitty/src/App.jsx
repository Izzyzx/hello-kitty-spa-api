import React from 'react'
import Home from './pages/Home'

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16, fontFamily: 'system-ui, Arial' }}>
      <header>
        <h1>Hello Kitty & Friends — SPA</h1>
      </header>
      <main>
        <Home />
      </main>
    </div>
  )
}
