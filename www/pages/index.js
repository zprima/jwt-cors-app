import React, { Component } from 'react';
import axios from 'axios';

const serverUrl = 'http://localhost:3001';

// Just testing header calls with axios and the
// default fetch 
class Index extends Component {
  state = {
    token: null,
    msg: null
  }

  // Using Axios to get token
  axiosGetToken = async () => {
    const res = await axios.get(serverUrl + '/api/login');
    const t = res.data.token;

    this.setState({
      token: t,
      msg: "Got token"
    })
  }

  // Using Axios to get ping
  axiosGetPing = async () => {
    try {
      const res = await axios.get(serverUrl + "/api/ping", {
        headers: {
          'Authorization': this.state.token
        }
      });
      this.setState({
        msg: res.data.msg
      })
    }
    catch (err) {
      if (err.response.status == 401) {
        this.setState({
          token: null,
          msg: err.response.data.msg
        })
      }
    }
  }

  // Using Fetch to get token
  fetchGetToken = async () => {
    let response = await fetch(serverUrl + '/api/login', { method: 'GET' });
    let data = await response.json();
    this.setState({
      token: data.token,
      msg: "Got token"
    })
  }

  // Using Fetch to get ping
  fetchGetPing = async () => {
    let response = await fetch(serverUrl + '/api/ping', {
      method: 'GET',
      mode: 'cors',
      headers: { 'Authorization': this.state.token }
    });
    let data = await response.json();
    if (response.status == 401) {
      this.setState({
        token: null,
        msg: data.msg
      })
    }
    this.setState({
      msg: data.msg
    })
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
        <br></br>
        <span>Msg: {this.state.msg}</span>
        <br></br>
        <br></br>
        <p>For other responses check the console</p>
      </div>
    );
  }
}

export default Index;