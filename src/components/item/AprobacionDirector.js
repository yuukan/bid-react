import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';
import ListadoDocumentosBaseSubidos from './ListadoDocumentosBaseSubidos';
import Switch from '@material-ui/core/Switch';

export default function AprobacionDirector(props) {
    const [state, setState] = useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
        checkedD: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    // Approve this plan
    const approve = () => {
        let user = localStorage.getItem("bidID");
        if (
            state.checkedA
            && state.checkedB
            && state.checkedC
            && state.checkedD
        ) {
            axios.post(props.url + "api/aprobacion-director",
                {
                    id: props.match.params.id,
                    user
                }
            )
                .then(function () {
                    swal("Información", "Se ha enviado la aprobación", "info")
                        .then(() => {
                            props.getProcesses();
                            props.history.goBack();
                        });
                })
                .catch(function (error) {
                    console.log(error);
                });

        } else {
            swal("Alerta", "Debe de marcar todas las preguntas", "error");
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
                axios.post(props.url + "api/rechazo-director",
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
            <div className="sub-container space-bellow">
                <h1>
                    Aprobación del Director
                </h1>
                <h2>
                    {props.match.params.description}
                </h2>
                <div className="hero space-bellow">
                    <ListadoDocumentosBaseSubidos
                            id={props.match.params.id}
                            url={props.url}
                            urlDocs={props.urlDocs}
                        />
                </div>
                <div className="row">
                    <h2>
                        Certificación
                    </h2>
                    <div className="full">
                        <label htmlFor="checkedA" className="switch">
                            <Switch
                                checked={state.checkedA}
                                onChange={handleChange}
                                color="primary"
                                name="checkedA"
                                id="checkedA"
                                inputProps={{ 'aria-label': '1. ¿El proceso está en plan de Adquisiciones aprobado?' }}
                            />
                            1. ¿El proceso está en plan de Adquisiciones aprobado?
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
                                inputProps={{ 'aria-label': '2. ¿El costo estimado está actualizado y es razonable? ' }}
                            />
                            2. ¿El costo estimado está actualizado y es razonable? 
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
                                inputProps={{ 'aria-label': '3. ¿Las especificaciones técnicas son pertinentes y obedecen a las necesidades del proyecto?' }}
                            />
                            3. ¿Las especificaciones técnicas son pertinentes y obedecen a las necesidades del proyecto?
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
                                inputProps={{ 'aria-label': '4. Los criterios de evaluación son pertinentes y  contemplan los aspectos técnicos necesarios?' }}
                            />
                            4. Los criterios de evaluación son pertinentes y  contemplan los aspectos técnicos necesarios?
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