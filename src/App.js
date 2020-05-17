import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";

// Custom Components
import Landing from './components/Landing';
import Header from './components/Header';
import Home from './components/Home';
import CrearOperacion from './components/CrearOperacion';
import List from './components/List';
import UploadDocuments from './components/UploadDocuments';
import ViewPlan from './components/ViewPlan';
import axios from 'axios';
// We import the css
import './css/App.css';

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faHouse, faSignIn, faSignOut, faPlus, faSave, faFileUpload, faList } from '@fortawesome/pro-solid-svg-icons';
library.add(faBars, faHouse, faSignIn, faSignOut, faPlus, faSave, faFileUpload, faList);

let url = "http://192.241.219.113/bid/public/";

class App extends Component {
  constructor(props) {
    super(props);
    this.changeLogged = this.changeLogged.bind(this);
    this.changeCurrent = this.changeCurrent.bind(this);
    this.logOff = this.logOff.bind(this);
    this.getProcesses = this.getProcesses.bind(this);

    this.state = {
      logged: false,
      windowTitle: "Bienvenido",
      userData: null,
      types: null,
      processes: null,
      current: "home"
    };
  }

  componentDidMount() {
    // We set the logged in
    let id = localStorage.getItem("bidID");
    if (id) {
      this.changeLogged(true);
    }
    // Get the empresas
    let t = this;
    axios.post(url + "api/get-process-type")
      .then(function (response) {
        t.setState({ types: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });

    // get processes
    this.getProcesses();
  }

  //Function to change the logged state
  changeLogged(logged) {
    this.setState({ logged });
  }

  changeCurrent(current) {
    this.setState({ current });
  }


  getUserData(id) {
    let t = this;
    let deviceID = localStorage.getItem("bidID");
    // Get the user data
    axios.post(url + "api/get-user-info", {
      user: id,
      deviceID
    })
      .then(function (response) {
        t.setState({ userData: response.data[0] });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  logOff() {
    localStorage.removeItem("bidID");
    this.changeLogged(false);
  }

  getProcesses() {
    let t = this;
    // Get the process list
    axios.post(url + "api/get-processes")
      .then(function (response) {
        t.setState({ processes: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Router>
        <div id="main">
          <Header
            isLoggedIn={this.state.logged}
            title={this.state.windowTitle}
            changetitle={this.changetitle}
            changeLogged={this.changeLogged}
            setUserInfo={this.setUserInfo}
            guest={this.state.guest}
            changeGuest={this.changeGuest}
            current={this.state.current}
            changeCurrent={this.changeCurrent}
            logOff={this.logOff}
          />
          {
            !this.state.logged ?
              (
                <div className="routes-container">
                  <Route path="/"
                    render={(props) =>
                      <Landing
                        {...props}
                        url={url}
                        logged={this.state.logged}
                        changeLogged={this.changeLogged}
                        setUserInfo={this.setUserInfo}
                        changeGuest={this.changeGuest}
                      />} />
                </div>

              )
              :
              (
                <div className="routes-container">
                  <Route exact path="/"
                    render={(props) => <Landing {...props} url={url} logged={this.state.logged} changeLogged={this.changeLogged} setUserInfo={this.setUserInfo} />} />

                  <Route path="/landing"
                    render={(props) =>
                      <Landing
                        {...props}
                        url={url}
                        logged={this.state.logged}
                        changeLogged={this.changeLogged}
                        setUserInfo={this.setUserInfo}
                        changeGuest={this.changeGuest}
                      />} />

                  <Route path="/home"
                    render={(props) =>
                      <Home
                        {...props}
                        url={url}
                      />} />

                  <Route path="/crear-operacion"
                    render={(props) =>
                      <CrearOperacion
                        {...props}
                        url={url}
                        types={this.state.types}
                        getProcesses={this.getProcesses}
                      />} />

                  <Route path="/lista"
                    render={(props) =>
                      <List
                        {...props}
                        url={url}
                        processes={this.state.processes}
                      />} />

                  <Route path="/subir-documentos/:id"
                    render={(props) =>
                      <UploadDocuments
                        {...props}
                        url={url}
                        getProcesses={this.getProcesses}
                      />} />

                  <Route path="/ver-plan/:id"
                    render={(props) =>
                      <ViewPlan
                        {...props}
                        url={url}
                        getProcesses={this.getProcesses}
                      />} />


                </div>
              )}
        </div>
      </Router>
    );
  }
}

export default App;
