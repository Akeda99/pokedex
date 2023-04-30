import React from 'react';
import './styles/barra.css'
const Barra = ({ valor}) => {
    const maximo= 150
  const barraLlena = valor / maximo * 100;



  
  return (
    <div className="barra-container">
      <div className="barra" style={{ width: `${barraLlena}%` }}></div>
    </div>
  );
}

export default Barra;
