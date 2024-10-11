import './App.css'
import React from 'react'

interface AppProps {
  message: string
}

const App: React.FC<AppProps> = ({ message }) => {
  return <div className="App">{message}</div>
}

export default App
