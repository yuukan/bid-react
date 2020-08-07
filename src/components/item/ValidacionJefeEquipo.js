import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';
import ListadoDocumentosBaseSubidos from './ListadoDocumentosBaseSubidos';
import Switch from '@material-ui/core/Switch';

export default function ValidacionJefeEquipo(props) {
    const [state, setState] = useState({
        checkedA: false
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // if (props && props.processes) {
        //     let plan = props.processes.find((key) => parseInt(key.id) === parseInt(props.match.params.id))
        //     setPlan(plan);
        // }
    }, [props]);

    // Approve this plan
    const approve = () => {
        let user = localStorage.getItem("bidID");
        if (state.checkedA) {
            axios.post(props.url + "api/aprobacion-jefe-equipo",
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
            swal("Alerta", "Debe de marcar la aprobacieon", "error");
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
                axios.post(props.url + "api/rechazo-jefe-equipo",
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
                    Validación de Jefe del Equipo
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
                        Validación
                    </h2>
                    <div className="full">
                        <label htmlFor="checkedA" className="switch">
                            <Switch
                                checked={state.checkedA}
                                onChange={handleChange}
                                color="primary"
                                name="checkedA"
                                id="checkedA"
                                inputProps={{ 'aria-label': 'Certificaco que cumple con todos los requerimientos técnicos.' }}
                            />
                            Valido que cumple con todos los documentos base.
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