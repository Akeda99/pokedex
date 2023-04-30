import React, { useEffect, useState } from 'react';
import pokemon from './styles/poke1.gif'
import "./styles/loader.css";


const Loader = () => {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
      setTimeout(() => setShowLoader(false), 2000);
    }, []);

  return (
    <div className="loader-container">
      <img
        src={pokemon}
        alt="loader"
        className= "imgloader"
      />
    </div>
  );
};

export default Loader;
