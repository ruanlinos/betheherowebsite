import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';
import './styles.css'

export default function Profile() {
  const [incidents, setIncidents] = useState([])

  const ongName = localStorage.getItem('ongName');
  const ongID = localStorage.getItem('ongId');
  const history = useHistory();

  useEffect(()=>{
    api.get('profile', {
      headers: {
        Authorization: ongID,
      },
    }).then(response => {
      setIncidents(response.data);
    })
  },[ongID])

  async function handleDeleteIncident(id) {
    try {
      await api
        .delete(`incidents/${id}`, {
          headers: {
            Authorization: ongID,
          },
        })
        .then(() => setIncidents(incidents.filter(incident => incident.id !== id)));
    } catch (error) {
      alert('Erro ao deletar caso! Tente novamente')
    }
  }

  function handleLogout() {
    localStorage.clear()
    history.push('/')
  }

  return (
    <div className='profile-container'>
      <header>
        <img src={logoImg} alt='be the hero' />
        <span>Bem vindo, {ongName}</span>
        <Link className='button' to='/incidents/new'>
          Cadastrar novo caso
        </Link>
        <button type='button' onClick={() => handleLogout()}>
          <FiPower size={18} color='#E02041' />
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        {incidents &&
          incidents.map(incident => (
            <li key={incident.id}>
              <strong>CASO: </strong>
              <p>{incident.title}</p>

              <strong>DESCRIÇÃO: </strong>
              <p>{incident.description}</p>

              <strong>VALOR: </strong>
              <p>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(incident.value)}
              </p>

              <button
                type='button'
                onClick={() => handleDeleteIncident(incident.id)}
              >
                <FiTrash2 size={20} color='#a8a8b3' />
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
