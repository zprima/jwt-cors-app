import React from 'react';
import Link from 'next/link.js';
import axios from 'axios';
import Router from 'next/router';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();
import { getToken } from '../utils/auth';

// const axios = require('axios');

function LoginStatus() {
  const token = getToken();

  return (
    <div>Token: {token}</div>
  )
}

class Index extends React.Component {

  handleLoginClick = async (e) => {
    e.preventDefault();

    const response = await axios.get('http://localhost:3001/api/login')

    const token = response.data.token;
    cookies.set('token', token)
    // Router.push('/secret')
  }

  loginStatus = () => {
    const token = "no token"
    return <div>Token: {token}</div>
  }

  render() {
    return (
      <div>
        <h1>Home page</h1>
        <Link href="/secret"><a>Go to secret page</a></Link>
        <br></br>
        <br></br>
        <a href="" onClick={(e) => this.handleLoginClick(e)}>Login</a>
        <br></br>
        <LoginStatus />
      </div >
    )
  }
}

export default Index;
