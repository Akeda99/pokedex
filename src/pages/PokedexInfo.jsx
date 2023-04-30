import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Barra from '../components/shared/Barra'
import './styles/pokedexInfo.css'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const PokedexInfo = () => {

    const {id}= useParams()
    const navigate = useNavigate()
    const {trainer} = useSelector(state=>state)
    const [pokemon, setPokemon] = useState()
    useEffect(() => {
    const URL =`https://pokeapi.co/api/v2/pokemon/${id}`
    axios.get(URL)
    .then(res=> setPokemon(res.data))
    .catch(err=> console.log(err))
    }, [id])

    console.log(pokemon);
    
    const handleClick = () => {
      navigate('/pokedex')
    }

  return (
    <div className={`containerprincipal `}>
    <header className='header1'>
        <div className='header__black1'>
        <div className="header__circle1">
        </div>
        </div>
        <div className="arrow">
        <a onClick={handleClick} >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
        
        </svg>
        
        </a>
        <h2 onClick={handleClick}>Ir al Pokedex</h2>
        </div>
    </header>
       <h3 className='informacion'>{trainer}, Aqui tienes más informacion de {pokemon?.name}:</h3>
    <div className={`container background-${pokemon?.types[0].type.name}`}>
      <div className="container_order">
      <h2>#{pokemon?.order}</h2>
      </div>
        <div className="container_photo">
          <h2>Version Normal:</h2>
        <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="" className=''/>
        <ul className='poke-card__types-container'>
        {
          pokemon?.types.map(type => (
            <li className={`poke-card__type`} key={type.type.name}>{type.type.name}</li>
          ))
        }
      </ul>
          <h2>Version Shiny:</h2>
          <img src={pokemon?.sprites.other['official-artwork'].front_shiny} alt="" />
          <ul className='poke-card__types-container'>
        {
          pokemon?.types.map(type => (
            <li className={`poke-card__type`} key={type.type.name}>{type.type.name}</li>
          ))
        }
      </ul>
        </div>
        <div className="container_stats_moves">
          <h2>Stats:</h2>
          <ul>
            {
              pokemon?.stats.map( stat=> (
                <li key={stat.stat.name}>
                  <span className='name_stats'>{stat.stat.name}: {stat.base_stat}</span>
                  {/* <span className='number_stats'>{stat.base_stat}</span> */}
                  <Barra valor={stat.base_stat}/>
                </li>
              ))
            }
          </ul>
          <h2>Moves:</h2>
          <ul className='list_moves'>
            {
              pokemon?.moves.slice(0,30).map(move => (
                <li key={move.move.name} className={`name_moves bg-${pokemon?.types[0].type.name}`}>
                  <span>{move.move.name}</span>
                  
                </li>
              ))
            }
          </ul>
        </div>
    </div>
    </div>
  )
}

export default PokedexInfo