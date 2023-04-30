import React from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProtectedRoutes from './components/ProtectedRoutes';
import Pokedex from './pages/Pokedex';
import PokedexInfo from './pages/PokedexInfo';
import Loader from './components/shared/Loader';

function App() {

  const nameTrainer = useSelector(state => state.trainer)
console.log(nameTrainer);
  return (
      <div className='App'>
        
      <Routes>
        <Route path='/' element={<Home />}/>
        {/* Rutas Protegidas */}
        <Route element= {<ProtectedRoutes/>}>
          <Route path='/pokedex' element={<Pokedex />}/>
          <Route path='/pokedex/:id' element={<PokedexInfo />}/>
        </Route>
      </Routes>
      </div>
      
  )
}

export default App
