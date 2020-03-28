import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'
import {  FiLogIn } from 'react-icons/fi'

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Login() {
  return (
    <div className='login-container'>
      <section className='form'>
        <img src={logoImg} alt='be the hero' />
        <form>
          <h1>Faça seu Login</h1>
          <input placeholder='Seu ID' />
          <button className='button' type='submit'>
            Entrar
          </button>

          <Link className='back-link' to='/register'>
            <FiLogIn size={16} color='#E02041' />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt='heroes' />
    </div>
  );
}
