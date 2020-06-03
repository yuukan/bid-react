import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';

//Components
import PlanHeader from './PlanHeader';
import PlanDetail from './PlanDetail';
import Switch from '@material-ui/core/Switch';

export default function AprobacionJefeUnidadEjecutora(props) {

    const [rows, setRows] = useState(null);
    const [plan, setPlan] = useState(null);
    const [state, setState] = useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        axios.post(props.url + "api/get-plan-items",
            {
                id: props.match.params.id
            }
        )
            .then(function (response) {
                setRows(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        if (props && props.processes) {
            let plan = props.processes.find((key) => parseInt(key.id) === parseInt(props.match.params.id))
            setPlan(plan);
        }
    }, [props]);

    // Approve this plan
    const approve = () => {
        let user = localStorage.getItem("bidID");
        if (state.checkedA && state.checkedB && state.checkedC) {
            axios.post(props.url + "api/aprobacion-jefe-unidad-ejecutora",
                {
                    id: props.match.params.id,
                    user
                }
            )
                .then(function () {
                    swal("Información", "Se ha enviado la aprobación", "info")
                        .then(() => {
                            props.history.push("/lista");
                        });
                })
                .catch(function (error) {
                    console.log(error);
                });

        } else {
            swal("Alerta", "Debe de marcar las 3 preguntas.", "error");
        }
    }

    const reject = () => {
        let user = localStorage.getItem("bidID");
        swal({
            text: '"¿Cuál es la razón para el rechazo?"',
            content: {
                element: "input",
            },
            button: {
                text: "Rechazar"
            },
            icon: "error",
        }).then((razon => {
            if (razon) {
                axios.post(props.url + "api/rechazo-jefe-unidad-ejecutora",
                    {
                        id: props.match.params.id,
                        user,
                        razon
                    }
                )
                    .then(function () {
                        swal("Información", "Se ha enviado el rechazo.", "info")
                            .then(() => {
                                props.history.push("/lista");
                            });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {

            }
        }));
    }


    //####################################Return####################################
    return (
        <div className="crear-container">
            <PlanHeader
                plan={plan}
                urlDocs={props.urlDocs}
            />
            <div className="sub-container space-bellow">
                <div className="row">
                    <h2>
                        Aprobación
                    </h2>
                    <div className="full">
                        <label htmlFor="checkedA" className="switch">
                            <Switch
                                checked={state.checkedA}
                                onChange={handleChange}
                                color="primary"
                                name="checkedA"
                                id="checkedA"
                                inputProps={{ 'aria-label': '¿Aquí va la pregunta?' }}
                            />
                            ¿Aquí va la pregunta?
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
                                inputProps={{ 'aria-label': '¿Aquí va la pregunta?' }}
                            />
                            ¿Aquí va la pregunta?
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
                                inputProps={{ 'aria-label': '¿Aquí va la pregunta?' }}
                            />
                            ¿Aquí va la pregunta?
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
            <PlanDetail
                rows={rows}
                urlDocs={props.urlDocs}
                url={props.url}
                history={props.history}
            />

        </div>
    );
}