import React, { Component } from 'react';
import axios from 'axios';

const serverUrl = 'http://localhost:3001';

class Index extends Component {
  state = {
    token: null
  }

  axiosGetToken = async () => {
    const res = await axios.get(serverUrl + '/api/login');
    const t = res.data.token;

    this.setState({
      token: t
    })
  }

  axiosGetPing = async () => {
    try {
      const res = await axios.get(serverUrl + "/api/ping", {
        headers: {
          'Authorization': this.state.token
        }
      });
      console.log(res.data)
    }
    catch (err) {
      console.log("err", err)
    }
  }

  fetchGetToken = async () => {
    let response = await fetch(serverUrl + '/api/login', { method: 'GET' });
    let data = await response.json();
    this.setState({
      token: data.token
    })
  }

  fetchGetPing = async () => {
    let response = await fetch(serverUrl + '/api/ping', { method: 'GET', mode: 'cors', headers: { 'Authorization': this.state.token } });
    let data = await response.json();
    console.log(data);
  }

  render() {
    return (
      <div>
        <button onClick={this.axiosGetToken}>Axios get token</button>
        <br></br>
        <button onClick={this.axiosGetPing}>Axios get ping</button>
        <br></br>
        <button onClick={this.fetchGetToken}>Fetch get token</button>
        <br></br>
        <button onClick={this.fetchGetPing}>Fetch get ping</button>
        <br></br>
        <br></br>
        <span>Token: {this.state.token}</span>
      </div>
    );
  }
}

export default Index;