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
import AprobacionJefeEquipoBanco from './components/AprobacionJefeEquipoBanco';
import ConceptoObligatorio from './components/ConceptoObligatorio';
import AprobacionFinal from './components/AprobacionFinal';
import ViewPlan from './components/ViewPlan';
import EditarDetallePlan from './components/EditarDetallePlan';
import axios from 'axios';
// #################################################################
// Item 
// #################################################################
import SubirDocumentosItem from './components/item/SubirDocumentos';
import AprobacionFinanciera from './components/item/AprobacionFinanciera';
import CertificacionTecnica from './components/item/CertificacionTecnica';
import AprobacionEspecialistaSectorial from './components/item/AprobacionEspecialistaSectorial';
import SubirDocumentosBase from './components/item/SubirDocumentosBase';
import AprobacionDirector from './components/item/AprobacionDirector';
import ValidacionJefeEquipo from './components/item/ValidacionJefeEquipo';
import ConceptoObligatorioItem from './components/item/ConceptoObligatorio';
import AprobacionFinalItem from './components/item/AprobacionFinal';
import LlamadoLicitacion from './components/item/LlamadoLicitacion';
import CertificacionDirector from './components/item/CertificacionDirector';
import CertificacionTecnicaLicitacion from './components/item/CertificacionTecnicaLicitacion';
import ConceptoObligatorioLicitacion from './components/item/ConceptoObligatorioLicitacion';
import AprobacionFinalLicitacion from './components/item/AprobacionFinalLicitacion';
import Enmiendas from './components/item/Enmiendas';
import LlamadoLicitacionEnmienda from './components/item/LlamadoLicitacionEnmienda';
import SolicitudEnmienda from './components/item/SolicitudEnmienda';
import RecepcionOfertas from './components/item/RecepcionOfertas';
import EvaluacionOfertas from './components/item/EvaluacionOfertas';
import ViewOfertas from './components/item/ViewOfertas';
import InicioEvaluacion from './components/item/InicioEvaluacion';
import EvaluacionDirector from './components/item/EvaluacionDirector';
import VerificacionEvaluacionJefeEquipo from './components/item/VerificacionEvaluacionJefeEquipo';
import ConceptoObligatorioEvaluacion from './components/item/ConceptoObligatorioEvaluacion';
import OtorgarNoObjecionEvaluacion from './components/item/OtorgarNoObjecionEvaluacion';
import RevisionNoObjecionEvaluacion from './components/item/RevisionNoObjecionEvaluacion';
import AprobacionInforme from './components/item/AprobacionInforme';
import VerificacionInformacionValuacion from './components/item/VerificacionInformacionValuacion';
import DarComentarioConformidad from './components/item/DarComentarioConformidad';
import RegistroContrato from './components/item/RegistroContrato';
import AprobacionContrato from './components/item/AprobacionContrato';
import CompletarProducto from './components/item/CompletarProducto';
import AprobarProducto from './components/item/AprobarProducto';
import AprobarProductoDirector from './components/item/AprobarProductoDirector';
import PagoProducto from './components/item/PagoProducto';
import LlamadoLicitacionListaCorta from './components/item/LlamadoLicitacionListaCorta';
import RecepcionOfertasListaCorta from './components/item/RecepcionOfertasListaCorta';
import EvaluacionOfertasListaCorta from './components/item/EvaluacionOfertasListaCorta';
import InicioEvaluacionListaCorta from './components/item/InicioEvaluacionListaCorta';
import EvaluacionDirectorListaCorta from './components/item/EvaluacionDirectorListaCorta';
import VerificacionInformacionValuacionListaCorta from './components/item/VerificacionInformacionValuacionListaCorta';
import DarComentarioConformidadListaCorta from './components/item/DarComentarioConformidadListaCorta';
import VerificacionEvaluacionJefeEquipoListaCorta from './components/item/VerificacionEvaluacionJefeEquipoListaCorta';

import './css/App.css';
// We import the css

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faHouse, faSignIn, faSignOut, faPlus, faSave, faFileUpload, faList, faDownload, faLongArrowLeft, faTimes, faTrash, faExclamationTriangle,faTools,faInfoSquare,faBandAid,faArrowToLeft,faClipboardListCheck,faPause,faEye,faCheck,faWrench,faMoneyCheck } from '@fortawesome/pro-solid-svg-icons';
import ConceptoObligatorioEvaluacionListaCorta from './components/item/ConceptoObligatorioEvaluacionListaCorta';
import OtorgarNoObjecionEvaluacionListaCorta from './components/item/OtorgarNoObjecionEvaluacionListaCorta';
import RevisionNoObjecionEvaluacionListaCorta from './components/item/RevisionNoObjecionEvaluacionListaCorta';
import AprobacionInformeListaCorta from './components/item/AprobacionInformeListaCorta';
import ComentariosAnalista from './components/item/ComentariosAnalista';
import RegistroContratoFinal from './components/item/RegistroContratoFinal';
import CompletarContrato from './components/item/CompletarContrato';
import CertificacionTecnicaLicitacionEnmienda from './components/item/CertificacionTecnicaLicitacionEnmienda';
import ConceptoObligatorioLicitacionEnmienda from './components/item/ConceptoObligatorioLicitacionEnmienda';
import AprobacionFinalLicitacionEnmienda from './components/item/AprobacionFinalLicitacionEnmienda';
import CertificacionContrato from './components/item/CertificacionContrato';
library.add(faBars, faHouse, faSignIn, faSignOut, faPlus, faSave, faFileUpload, faList, faDownload, faLongArrowLeft, faTimes, faTrash, faExclamationTriangle,faTools,faInfoSquare,faBandAid,faArrowToLeft,faClipboardListCheck,faPause,faEye,faCheck,faWrench,faMoneyCheck); 

let url = "https://eriw.bidropdigital.com/";
let urlDocs = "https://eriw.bidropdigital.com/storage/app/";

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
    localStorage.removeItem("bidProfile");
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
                        urlDocs={urlDocs}
                        getProcesses={this.getProcesses}
                        processes={this.state.processes}
                      />} />

                  <Route
                    path="/subir-plan/:id"
                    render={(props) =>
                      <UploadPlan
                        {...props}
                        url={url}
                        getProcesses={this.getProcesses}
                        processes={this.state.processes}
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

                  <Route
                    path="/aprobacion-jefe-equipo-banco/:id"
                    render={(props) =>
                      <AprobacionJefeEquipoBanco
                        {...props}
                        url={url}
                        urlDocs={urlDocs}
                        getProcesses={this.getProcesses}
                        processes={this.state.processes}
                      />} />

                  <Route
                    path="/concepto-obligatorio/:id"
                    render={(props) =>
                      <ConceptoObligatorio
                        {...props}
                        url={url}
                        urlDocs={urlDocs}
                        getProcesses={this.getProcesses}
                        processes={this.state.processes}
                      />}
                  />

                  <Route
                    path="/aprobacion-final/:id"
                    render={(props) =>
                      <AprobacionFinal
                        {...props}
                        url={url}
                        urlDocs={urlDocs}
                        getProcesses={this.getProcesses}
                        processes={this.state.processes}
                      />}
                  />

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

                    {/* Items routes */}
                      <Route path="/subir-documentos-item/:id/:parent"
                    render={(props) =>
                      <SubirDocumentosItem
                        {...props}
                        url={url}
                        urlDocs={urlDocs}
                        getProcesses={this.getProcesses}
                        processes={this.state.processes}
                      />} />

                      <Route
                      path="/item/aprobacion-presupuestaria/:id/:description"
                      render={(props) =>
                        <AprobacionFinanciera
                          {...props}
                          url={url}
                          urlDocs={urlDocs}
                          getProcesses={this.getProcesses}
                        />} />

                      <Route
                      path="/item/certificacion-tecnica/:id/:description"
                      render={(props) =>
                        <CertificacionTecnica
                          {...props}
                          url={url}
                          urlDocs={urlDocs}
                          getProcesses={this.getProcesses}
                        />} />

                      <Route
                      path="/item/certificacion-especialista-sectorial/:id/:description"
                      render={(props) =>
                        <AprobacionEspecialistaSectorial
                          {...props}
                          url={url}
                          urlDocs={urlDocs}
                          getProcesses={this.getProcesses}
                        />} />

                      <Route
                      path="/item/subir-documentos-base/:id/:description/:tipo/:parent"
                      render={(props) =>
                        <SubirDocumentosBase
                          {...props}
                          url={url}
                          urlDocs={urlDocs}
                          getProcesses={this.getProcesses}
                        />} />

                      <Route
                        path="/item/aprobacion-director/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <AprobacionDirector
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                          path="/item/validacion-jefe-equipo/:id/:description/:tipo/:parent"
                          render={(props) =>
                            <ValidacionJefeEquipo
                              {...props}
                              url={url}
                              urlDocs={urlDocs}
                              getProcesses={this.getProcesses}
                            />} />

                      <Route
                        path="/item/concepto-obligatorio/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <ConceptoObligatorioItem
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/aprobacion-final/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <AprobacionFinalItem
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/llamado-licitacion/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <LlamadoLicitacion
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                          path="/item/certificacion-director/:id/:description/:tipo/:parent"
                          render={(props) =>
                            <CertificacionDirector
                              {...props}
                              url={url}
                              urlDocs={urlDocs}
                              getProcesses={this.getProcesses}
                            />} />
                      
                      <Route
                        path="/item/certificacion-tecnica-licitacion/:id/:description"
                        render={(props) =>
                          <CertificacionTecnicaLicitacion
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                          path="/item/concepto-obligatorio-licitacion/:id/:description/:tipo/:parent"
                          render={(props) =>
                            <ConceptoObligatorioLicitacion
                              {...props}
                              url={url}
                              urlDocs={urlDocs}
                              getProcesses={this.getProcesses}
                            />} />

                      <Route
                        path="/item/aprobacion-final-licitacion/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <AprobacionFinalLicitacion
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />


                      <Route path="/enmiendas"
                          render={(props) =>
                            <Enmiendas
                              {...props}
                              url={url}
                              urlDocs={urlDocs}
                              getProcesses={this.getProcesses}
                              processes={this.state.processes}
                            />} />

                      <Route
                        path="/item/llamado-licitacion-enmienda/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <LlamadoLicitacionEnmienda
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                          path="/item/recepcion-ofertas/:id/:description/:tipo/:parent"
                          render={(props) =>
                            <RecepcionOfertas
                              {...props}
                              url={url}
                              urlDocs={urlDocs}
                              getProcesses={this.getProcesses}
                            />} />

                      <Route
                          path="/item/evaluacion-ofertas/:id/:description/:tipo/:parent"
                          render={(props) =>
                            <EvaluacionOfertas
                              {...props}
                              url={url}
                              urlDocs={urlDocs}
                              getProcesses={this.getProcesses}
                            />} />

                      <Route
                        path="/item/solicitud-enmienda/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <SolicitudEnmienda
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/ver-ofertas/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <ViewOfertas
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/inicio-valuacion/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <InicioEvaluacion
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/evaluacion-director-no-objecion/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <EvaluacionDirector
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                            op={1}
                          />} />

                      <Route
                        path="/item/evaluacion-director-verificacion/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <EvaluacionDirector
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                            op={2}
                          />} />

                      <Route
                        path="/item/solicitar-comentario-conformidad/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <EvaluacionDirector
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                            op={3}
                          />} />

                      <Route
                        path="/item/verificacion-evaluacion-jefe-equipo/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <VerificacionEvaluacionJefeEquipo
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/concepto-obligatorio-evaluacion/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <ConceptoObligatorioEvaluacion
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/otorgar-no-objecion-evaluacion/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <OtorgarNoObjecionEvaluacion
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/revision-no-objecion-evaluacion/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <RevisionNoObjecionEvaluacion
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/aprobacion-informe/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <AprobacionInforme
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/verificacion-informacion-evaluacion/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <VerificacionInformacionValuacion
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/dar-comentario-conformidad/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <DarComentarioConformidad
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/registro-del-contrato/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <RegistroContrato
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/aprobacion-contrato/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <AprobacionContrato
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />
                          
                      <Route
                        path="/item/certificacion-contrato-jefe-equipo/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <CertificacionContrato
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />
                          
                      <Route
                        path="/item/comentarios-analista/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <ComentariosAnalista
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />
                          
                      <Route
                        path="/item/registro-contrato/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <RegistroContratoFinal
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />
                          
                      <Route
                        path="/item/completar-contrato/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <CompletarContrato
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/completar-producto/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <CompletarProducto
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/aprobar-producto/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <AprobarProducto
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/aprobar-producto-director/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <AprobarProductoDirector
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/pago-producto/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <PagoProducto
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/llamado-licitacion-lista-corta/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <LlamadoLicitacionListaCorta
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/recepcion-expresion-interes-lista-corta/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <RecepcionOfertasListaCorta
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/evaluacion-ofertas-lista-corta/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <EvaluacionOfertasListaCorta
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />
                      
                      <Route
                        path="/item/inicio-valuacion-lista-corta/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <InicioEvaluacionListaCorta
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/evaluacion-director-verificacion-lista-corta/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <EvaluacionDirectorListaCorta
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                            op={2}
                          />} />

                      <Route
                        path="/item/verificacion-informacion-evaluacion-lista-corta/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <VerificacionInformacionValuacionListaCorta
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />
                      
                      <Route
                        path="/item/solicitar-comentario-conformidad-lista-corta/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <EvaluacionDirectorListaCorta
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                            op={3}
                          />} />

                      <Route
                        path="/item/dar-comentario-conformidad-lista-corta/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <DarComentarioConformidadListaCorta
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/evaluacion-director-no-objecion-lista-corta/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <EvaluacionDirectorListaCorta
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                            op={1}
                          />} />

                      <Route
                        path="/item/verificacion-evaluacion-jefe-equipo-lista-corta/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <VerificacionEvaluacionJefeEquipoListaCorta
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/concepto-obligatorio-evaluacion-lista-corta/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <ConceptoObligatorioEvaluacionListaCorta
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/otorgar-no-objecion-evaluacion-lista-corta/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <OtorgarNoObjecionEvaluacionListaCorta
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                        path="/item/revision-no-objecion-evaluacion-lista-corta/:id/:description/:tipo/:parent"
                        render={(props) =>
                          <RevisionNoObjecionEvaluacionListaCorta
                            {...props}
                            url={url}
                            urlDocs={urlDocs}
                            getProcesses={this.getProcesses}
                          />} />

                      <Route
                          path="/item/aprobacion-informe-lista-corta/:id/:description/:tipo/:parent"
                          render={(props) =>
                            <AprobacionInformeListaCorta
                              {...props}
                              url={url}
                              urlDocs={urlDocs}
                              getProcesses={this.getProcesses}
                            />} />

                      <Route
                          path="/item/certificacion-tecnica-licitacion-enmienda/:id/:description"
                          render={(props) =>
                            <CertificacionTecnicaLicitacionEnmienda
                              {...props}
                              url={url}
                              urlDocs={urlDocs}
                              getProcesses={this.getProcesses}
                            />} />

                      <Route
                          path="/item/concepto-obligatorio-licitacion-enmienda/:id/:description"
                          render={(props) =>
                            <ConceptoObligatorioLicitacionEnmienda
                              {...props}
                              url={url}
                              urlDocs={urlDocs}
                              getProcesses={this.getProcesses}
                            />} />

                      <Route
                          path="/item/aprobacion-final-licitacion-enmienda/:id/:description"
                          render={(props) =>
                            <AprobacionFinalLicitacionEnmienda
                              {...props}
                              url={url}
                              urlDocs={urlDocs}
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
