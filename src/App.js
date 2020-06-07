import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";

// Custom Components
import Landing from './components/Landing';
import Header from './components/Header';
import Home from './components/Home';
import CrearOperacion from './components/CrearOperacion';
import List from './components/List';
import UploadDocuments from './components/UploadDocuments';
import UploadPlan from './components/UploadPlan';
import AprobacionJefeUnidadEjecutora from './components/AprobacionJefeUnidadEjecutora';
import ViewPlan from './components/ViewPlan';
import EditarDetallePlan from './components/EditarDetallePlan';
import axios from 'axios';
// We import the css
import './css/App.css';

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faHouse, faSignIn, faSignOut, faPlus, faSave, faFileUpload, faList, faDownload, faLongArrowLeft, faTimes } from '@fortawesome/pro-solid-svg-icons';
library.add(faBars, faHouse, faSignIn, faSignOut, faPlus, faSave, faFileUpload, faList, faDownload, faLongArrowLeft, faTimes);

let url = "http://192.241.219.113/bid/public/";
let urlDocs = "http://192.241.219.113/bid/storage/app/";

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
      current: "home",
      tipo_plan: null,
      metodo_seleccion: null,
      componente_asociado: null,
      metodo_revision: null,
      ejecutor: null,
      tipo_operacion: null
    };
  }

  componentDidMount() {
    // We set the logged in
    let id = localStorage.getItem("bidID");
    if (id) {
      this.changeLogged(true);
    }
    // Get the tipos de proceso
    let t = this;
    axios.post(url + "api/get-process-type")
      .then(function (response) {
        t.setState({ types: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    // Get Tipo Plan
    axios.post(url + "api/get-tipo-plan")
      .then(function (response) {
        t.setState({ tipo_plan: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    // Get Metodo Selección
    axios.post(url + "api/get-metodo-seleccion")
      .then(function (response) {
        t.setState({ metodo_seleccion: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    // Get Componente Asociado
    axios.post(url + "api/get-componente-asociado")
      .then(function (response) {
        t.setState({ componente_asociado: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    // Get Metodo de Revisión
    axios.post(url + "api/get-metodo-revision")
      .then(function (response) {
        t.setState({ metodo_revision: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    // Get Ejecutor
    axios.post(url + "api/get-ejecutor")
      .then(function (response) {
        t.setState({ ejecutor: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    // Get Tipo  Operacion
    axios.post(url + "api/get-tipo-operacion")
      .then(function (response) {
        t.setState({ tipo_operacion: response.data });
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
                        tipo_operacion={this.state.tipo_operacion}
                        ejecutor={this.state.ejecutor}
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

                  <Route
                    path="/subir-plan/:id"
                    render={(props) =>
                      <UploadPlan
                        {...props}
                        url={url}
                        getProcesses={this.getProcesses}
                      />} />

                  <Route
                    path="/aprobacion-jefe-unidad-ejecutora/:id"
                    render={(props) =>
                      <AprobacionJefeUnidadEjecutora
                        {...props}
                        url={url}
                        urlDocs={urlDocs}
                        getProcesses={this.getProcesses}
                        processes={this.state.processes}
                      />} />

                  <Route path="/ver-plan/:id"
                    render={(props) =>
                      <ViewPlan
                        {...props}
                        url={url}
                        urlDocs={urlDocs}
                        getProcesses={this.getProcesses}
                        processes={this.state.processes}
                      />} />

                  <Route path="/editar-detalle-plan/:id"
                    render={(props) =>
                      <EditarDetallePlan
                        {...props}
                        url={url}
                        types={this.state.types}
                        tipo_plan={this.state.tipo_plan}
                        metodo_seleccion={this.state.metodo_seleccion}
                        componente_asociado={this.state.componente_asociado}
                        metodo_revision={this.state.metodo_revision}
                      />} />


                </div>
              )}
        </div>
      </Router>
    );
  }
}

export default App;
