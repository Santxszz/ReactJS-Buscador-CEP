import { useState } from 'react';
import './styles.css';
import { FiSearch } from 'react-icons/fi'

import api from './services/api'

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert("Preencha algum cep")
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")
    } catch {
      alert("Ops erro ao buscar");
      setInput("")
    }

  }

  return (
    <div className='container'>
      <h1 className='title'> Buscador CEP </h1>
      <div className='container-input'>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Digite seu CEP...'></input>
        <button className='buttonSearch' onClick={handleSearch}> <FiSearch size={25} color="#FFF"></FiSearch> </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2> CEP: {cep.cep} </h2>
          <span> Logradouro: {cep.logradouro} </span>
          <span> Complemento: {cep.complemento} </span>
          <span> Bairro: {cep.bairro} </span>
          <span> Localidade: {cep.localidade}  </span>
          <span> Estado: {cep.uf}  </span>
        </main>
      )}
    </div>
  );
}

export default App;
