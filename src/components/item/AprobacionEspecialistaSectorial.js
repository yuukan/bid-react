import React, { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ListadoDocumentos from './ListadoDocumentos';

import Switch from '@material-ui/core/Switch';

export default function AprobacionEspecialistaSectorial(props) {

    const [state, setState] = useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
        checkedD: false,
        checkedE: false,
        checkedF: false,
        checkedG: false,
        checkedH: false,
        checkedI: false,
        checkedJ: false,
        checkedK: false,
        checkedL: false,
        checkedM: false,
        checkedN: false
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

     // Approve this plan
     const approve = () => {
        let user = localStorage.getItem("bidID");
        if (state.checkedA && state.checkedB && state.checkedC && state.checkedD && state.checkedE && state.checkedF && state.checkedG && state.checkedH && state.checkedI && state.checkedJ && state.checkedK && state.checkedL && state.checkedM && state.checkedN) {
            axios.post(props.url + "api/aprobacion-especialista-sectorial",
                {
                    id: props.match.params.id,
                    user
                }
            )
                .then(function () {
                    swal("Información", "Certificación completa", "info")
                        .then(() => {
                            props.getProcesses();
                            props.history.goBack();
                        });
                })
                .catch(function (error) {
                    console.log(error);
                });

        } else {
            swal("Alerta", "Debe de marcar las 14 preguntas.", "error");
        }
    }

    const reject = () => {
        let user = localStorage.getItem("bidID");
        swal({
            text: '¿Cuál es la razón para el rechazo?',
            content: {
                element: "input",
            },
            button: {
                text: "Rechazar"
            },
            icon: "error",
        }).then((razon => {
            if (razon) {
                axios.post(props.url + "api/rechazo-especialista-sectorial",
                    {
                        id: props.match.params.id,
                        user,
                        razon
                    }
                )
                    .then(function () {
                        swal("Información", "Se ha enviado el rechazo.", "info")
                            .then(() => {
                                props.getProcesses();
                                props.history.goBack();
                            });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                swal("Información", "Debe de ingresar una razón para el rechazo.", "error")
            }
        }));
    }


    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container">
                <h1>
                    Aprobación especialista sectorial
                </h1>
                <h2>
                    {props.match.params.description}
                </h2>

                <ListadoDocumentos
                    id={props.match.params.id}
                    url={props.url}
                    urlDocs={props.urlDocs}
                />

                <div className="row">
                    <h2>
                        Completar Información
                    </h2>
                    <div className="full">
                        <label htmlFor="checkedA" className="switch">
                            <Switch
                                checked={state.checkedA}
                                onChange={handleChange}
                                color="primary"
                                name="checkedA"
                                id="checkedA"
                                inputProps={{ 'aria-label': 'El proyecto es pertinente al programa, responde a un indicador de MR y está incluido en el PEP y plan de adquisiciones aprobados?' }}
                            />
                            El proyecto es pertinente al programa, responde a un indicador de MR y está incluido en el PEP y plan de adquisiciones aprobados?
                        </label>
                    </div>
                    <div className="full">
                        <label htmlFor="checkedB" className="switch">
                            <Switch
                                checked={state.checkedB}
                                onChange={handleChange}
                                color="primary"
                                name="checkedB"
                                id="checkedB"
                                inputProps={{ 'aria-label': 'El diseño del proyecto fue revisado por el ejecutor, está completo: alcance, tiempo y costo?.' }}
                            />
                            El diseño del proyecto fue revisado por el ejecutor, está completo: alcance, tiempo y costo?
                        </label>
                    </div>
                    <div className="full">
                        <label htmlFor="checkedC" className="switch">
                            <Switch
                                checked={state.checkedC}
                                onChange={handleChange}
                                color="primary"
                                name="checkedC"
                                id="checkedC"
                                inputProps={{ 'aria-label': ' La tecnología propuesta es adecuada y no contraviene los principios y/o políticas sectoriales del Banco.' }}
                            />
                            La tecnología propuesta es adecuada y no contraviene los principios y/o políticas sectoriales del Banco.
                        </label>
                    </div>
                    <div className="full">
                        <label htmlFor="checkedD" className="switch">
                            <Switch
                                checked={state.checkedD}
                                onChange={handleChange}
                                color="primary"
                                name="checkedD"
                                id="checkedD"
                                inputProps={{ 'aria-label': 'Se presenta los planos completos de todoas loas áreas de trabajo que demanda el proyecto.' }}
                            />
                            Se presenta los planos completos de todoas loas áreas de trabajo que demanda el proyecto.
                        </label>
                    </div>
                    <div className="full">
                        <label htmlFor="checkedE" className="switch">
                            <Switch
                                checked={state.checkedE}
                                onChange={handleChange}
                                color="primary"
                                name="checkedE"
                                id="checkedE"
                                inputProps={{ 'aria-label': 'El ejecutor revisó y actualizó los cálculos unitarios y globales de los trabajos a realizar en cada actividad, están completos y no hayn comisiones de calculo.' }}
                            />
                            El ejecutor revisó y actualizó los cálculos unitarios y globales de los trabajos a realizar en cada actividad, están completos y no hayn comisiones de calculo.
                        </label>
                    </div>
                    <div className="full">
                        <label htmlFor="checkedF" className="switch">
                            <Switch
                                checked={state.checkedF}
                                onChange={handleChange}
                                color="primary"
                                name="checkedF"
                                id="checkedF"
                                inputProps={{ 'aria-label': 'Los costos están completos, son razonables y fueron actualizados por el ejecutor.' }}
                            />
                            Los costos están completos, son razonables y fueron actualizados por el ejecutor.
                        </label>
                    </div>
                    <div className="full">
                        <label htmlFor="checkedG" className="switch">
                            <Switch
                                checked={state.checkedG}
                                onChange={handleChange}
                                color="primary"
                                name="checkedG"
                                id="checkedG"
                                inputProps={{ 'aria-label': 'Las especificaciones técnicas están completas y responden a las necesidades actuales del proyecto' }}
                            />
                            Las especificaciones técnicas están completas y responden a las necesidades actuales del proyecto
                        </label>
                    </div>
                    <div className="full">
                        <label htmlFor="checkedH" className="switch">
                            <Switch
                                checked={state.checkedH}
                                onChange={handleChange}
                                color="primary"
                                name="checkedH"
                                id="checkedH"
                                inputProps={{ 'aria-label': 'El cronograma tentativo de implementación es razonable y se ejecuta dentro del plazo de desembolso vigente.' }}
                            />
                            El cronograma tentativo de implementación es razonable y se ejecuta dentro del plazo de desembolso vigente.
                        </label>
                    </div>
                    <div className="full">
                        <label htmlFor="checkedI" className="switch">
                            <Switch
                                checked={state.checkedI}
                                onChange={handleChange}
                                color="primary"
                                name="checkedI"
                                id="checkedI"
                                inputProps={{ 'aria-label': 'El mercado ha sido evaluado por el ejecutor y existen potenciales oferentes.' }}
                            />
                            El mercado ha sido evaluado por el ejecutor y existen potenciales oferentes.
                        </label>
                    </div>
                    <div className="full">
                        <label htmlFor="checkedJ" className="switch">
                            <Switch
                                checked={state.checkedJ}
                                onChange={handleChange}
                                color="primary"
                                name="checkedJ"
                                id="checkedJ"
                                inputProps={{ 'aria-label': 'El ejecutor cuenta con las licencias y permisos ambientales debidamente autorizados' }}
                            />
                            El ejecutor cuenta con las licencias y permisos ambientales debidamente autorizados
                        </label>
                    </div>
                    <div className="full">
                        <label htmlFor="checkedK" className="switch">
                            <Switch
                                checked={state.checkedK}
                                onChange={handleChange}
                                color="primary"
                                name="checkedK"
                                id="checkedK"
                                inputProps={{ 'aria-label': ' La propiedad de los terrenos/inmuebles, si aplica, esta liberada/saneada' }}
                            />
                            La propiedad de los terrenos/inmuebles, si aplica, esta liberada/saneada
                        </label>
                    </div>
                    <div className="full">
                        <label htmlFor="checkedL" className="switch">
                            <Switch
                                checked={state.checkedL}
                                onChange={handleChange}
                                color="primary"
                                name="checkedL"
                                id="checkedL"
                                inputProps={{ 'aria-label': 'El ejecutor demuestra contar con los derechos de paso saneados.' }}
                            />
                            El ejecutor demuestra contar con los derechos de paso saneados.
                        </label>
                    </div>
                    <div className="full">
                        <label htmlFor="checkedM" className="switch">
                            <Switch
                                checked={state.checkedM}
                                onChange={handleChange}
                                color="primary"
                                name="checkedM"
                                id="checkedM"
                                inputProps={{ 'aria-label': 'El ejecutor coordinó con las autoridades locales la ejecución del proyecto' }}
                            />
                            El ejecutor coordinó con las autoridades locales la ejecución del proyecto
                        </label>
                    </div>
                    <div className="full">
                        <label htmlFor="checkedN" className="switch">
                            <Switch
                                checked={state.checkedN}
                                onChange={handleChange}
                                color="primary"
                                name="checkedN"
                                id="checkedN"
                                inputProps={{ 'aria-label': 'La supervisión está contratada o estará contratada antes del inicio del proyecto' }}
                            />
                            La supervisión está contratada o estará contratada antes del inicio del proyecto
                        </label>
                    </div>

                    
                    <div className="full">
                        <button type="button" className="save" onClick={approve}>
                            <FontAwesomeIcon icon="save" /> Aprobar
                        </button>
                        <button type="button" className="cancel" onClick={reject}>
                            <FontAwesomeIcon icon="times" /> Rechazar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}