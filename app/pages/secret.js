import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { getToken } from '../utils/auth';
import Router from 'next/router'

class Secret extends React.Component {

  onCheckToken = (e) => {
    const x = getToken()
    console.log(x)
  }

  onPingCall = async (e) => {
    console.log("ping call")
    const x = getToken()
    console.log(x)
    const res = await axios({
      method: 'get', url: 'http://localhost:3001/api/ping',
      headers: {
        'Authorization': x,
        'content-type': 'application/json'
      }
    })
    console.log(res.data)
  }

  render() {
    return (
      <div>
        <h1>Secret page</h1>
        <Link href="/index">Home page</Link>
        <br></br>
        <span onClick={(e) => this.onCheckToken(e)}>Click and check console for token value</span>
        <br></br>
        <span onClick={(e) => this.onPingCall(e)}>Ping Call</span>
      </div>
    );
  }
}

Secret.getInitialProps = async (ctx) => {

  let x = undefined;
  if (ctx.req) {
    x = ctx.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  } else {
    x = getToken()
  }
  console.log("secret initial props token: ", x);

  // const redirectOnError = () => {
  //   if (process.browser) {
  //     Router.push('/login')
  //   } else {
  //     ctx.res.writeHead(301, { Location: '/' })
  //   }
  // }

  console.log("gpi", x)
  const response = await axios({
    method: 'get', url: 'http://localhost:3001/api/token/ping',
    headers: {
      'Authorization': x,
      'content-type': 'application/json'
    }
  })
  console.log(response)

  return {}
}

export default Secret;