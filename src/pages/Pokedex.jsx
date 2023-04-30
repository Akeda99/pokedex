import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pokedex/Pagination'
import PokeCard from '../components/Pokedex/PokeCard'
import './styles/pokedex.css'
import Loader from '../components/shared/Loader'

const Pokedex = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }, []);


   const {trainer} = useSelector(state=>state)

   const [pokemons, setPokemons] = useState()
   const [types, setTypes] = useState()
   const [typeSelected, setTypeSelected] = useState('All pokemons')

   const navigate=useNavigate()

useEffect(() => {
if(typeSelected!=="All pokemons"){
    //hacer la peticion de los pokemons por tipo
    axios.get(typeSelected)
    .then(res=>setPokemons(res.data.pokemon.map(e=>e.pokemon)))
    .catch(err=>console.log(err))
}else{
    //hacer la peticion de todos los pokemons
    const URL=`https://pokeapi.co/api/v2/pokemon?offset=0&limit=100000`
    axios.get(URL)
    .then(res=>setPokemons(res.data.results))
    .catch(err=>console.log(err))
}
    }, [typeSelected])

useEffect(() => {
const URL=`https://pokeapi.co/api/v2/type`
axios.get(URL)
.then(res=>setTypes(res.data.results))
.catch(err=>console.log(err))
}, [])



const handleSubmit=e=>{
    e.preventDefault()
    const input=e.target.search.value.trim().toLowerCase()
    navigate(`/pokedex/${input}`)
}
const handleChange=(e)=>{
    setTypeSelected(e.target.value);
    setPage(1)
}

// Logica de paginacion
const [page, setPage] = useState(1)
const [pokePerPage, setPokePerPage] = useState(8)
const initalPoke=(page-1)* pokePerPage
const finalPoke=  page * pokePerPage
const maxPage= pokemons && Math.ceil(pokemons.length / pokePerPage)

  return (

    <div>
      {isLoading ? (
        <div className="loader">
          {/* Aquí iría el componente de carga */}
          <Loader/>
        </div>
      ) : (
        <div>
                <div className='container_pokedex'>
        <div className="container_header_pokedex">
        <h2><span className='welcome_pokedex'>Bienvenido {trainer},</span> Aqui podras encontrar tu pokemon favorito.</h2>
        <div className="selectors_div">
        <form onSubmit={handleSubmit}>
            <input id='search' type="text" placeholder='Busca un pokemon'/>
            <button>Buscar</button>
        </form>
        <select onChange={handleChange}>
            <option value='All pokemons'>All pokemons</option>
           {
            types?.map(type=>(
                <option key={type.url} value={type.url}>{type.name}</option>
            ))
           }
        </select>
        
        </div>
        <div className="pagination_pokedex">

        
<Pagination page={page} maxPage={maxPage} setPage={setPage}/>
</div>
        </div>
      
        
        <div className="poke-container">
            {
                pokemons?.slice(initalPoke,finalPoke).map(poke=>(
                    <PokeCard key={poke.url}
                    url={poke.url}
                    />
                ))
            }
        </div>

    </div>
        </div>
      )}
    </div>
    



  )
}

export default Pokedex