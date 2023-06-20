import React, { useState } from 'react'
import data from '../stations.json'
import '../src/assets/stylesheets/main.scss'
import Stations from './components/Stations'
import StationInformation from './components/StationInformation'
import './App.css'

function App() {
  const { stations } = data.septa
  const [selectedStation, setSelectedStation] = useState('')

  return (
    <div className="app-container">
      <header>
        <h1 id="header__title">SEPTA Frontend Application</h1>
      </header>
      <main className="main-container">
        <Stations stations={stations} setSelectedStation={setSelectedStation} />
        <StationInformation selectedStation={selectedStation} />
      </main>
    </div>
  )
}

export default App
