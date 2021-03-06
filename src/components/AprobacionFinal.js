import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';
import LinearProgress from '@material-ui/core/LinearProgress';

//Components
import PlanHeader from './PlanHeader';
import Switch from '@material-ui/core/Switch';

export default function AprobacionFinal(props) {
    const [plan, setPlan] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [state, setState] = useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
        checkedD: false,
        checkedE: false,
        checkedF: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if (props && props.processes) {
            let plan = props.processes.find((key) => parseInt(key.id) === parseInt(props.match.params.id))
            setPlan(plan);
        }
    }, [props]);

    // Approve this plan
    const approve = () => {
        let user = localStorage.getItem("bidID");
        if (state.checkedA && state.checkedB && state.checkedC && state.checkedD && state.checkedE && state.checkedF) {
            swal({
                title: "Aprobación!",
                text: "Yo apruebo el concepto obligatorio y que el plan de adquisiciones cumple con todos los parametros requeridos.",
                icon: "warning",
                buttons: ["Cancelar", "Aprobar"],
                dangerMode: true,
            })
                .then((certifico) => {
                    if (certifico) {
                        setDisabled(true);
                        axios.post(props.url + "api/aprobacion-final",
                            {
                                id: props.match.params.id,
                                user
                            }
                        )
                            .then(function () {
                                swal("Información", "Se ha enviado la aprobación", "info")
                                    .then(() => {
                                        setDisabled(false);
                                        props.getProcesses();
                                        props.history.push("/lista");
                                    });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                });

        } else {
            swal("Alerta", "Debe de marcar las 6 preguntas.", "error");
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
                setDisabled(true);
                axios.post(props.url + "api/rechazo-final",
                    {
                        id: props.match.params.id,
                        user,
                        razon
                    }
                )
                    .then(function () {
                        swal("Información", "Se ha enviado el rechazo.", "info")
                            .then(() => {
                                setDisabled(false);
                                props.getProcesses();
                                props.history.push("/lista");
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
            <PlanHeader
                plan={plan}
                urlDocs={props.urlDocs}
                soloAdquisiciones={true}
            />
            <div className="sub-container space-bellow">
                <div className="row">
                    <h2>
                        Aprobación Final Plan de Adquisiciones
                    </h2>
                    {
                        plan && plan.concepto_obligatorio && plan.concepto_obligatorio!=="" ?
                        (
                            <div className="hero concepto-obligatorio space-bellow">
                                <h3 className="concepto-obligatorio">
                                    <FontAwesomeIcon icon="exclamation-triangle" />
                                    Concepto Obligatorio
                                    <div className="text">
                                        Razón: <span dangerouslySetInnerHTML={{__html: plan.concepto_obligatorio}} />
                                    </div>
                                </h3>
                            </div>
                        ) : ""
                    }
                    <div className="full">
                        <label htmlFor="checkedA" className="switch">
                            <Switch
                                checked={state.checkedA}
                                onChange={handleChange}
                                color="primary"
                                name="checkedA"
                                id="checkedA"
                                inputProps={{ 'aria-label': 'Los diseños son completos, el alcance del proyecto es completo' }}
                            />
                            Los diseños son completos, el alcance del proyecto es completo
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
                                inputProps={{ 'aria-label': 'Los planos son completos y con las debidas autorizaciones' }}
                            />
                            Los planos son completos y con las debidas autorizaciones
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
                                inputProps={{ 'aria-label': 'Los costos estan actualizados a la fecha' }}
                            />
                            Los costos estan actualizados a la fecha
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
                                inputProps={{ 'aria-label': 'En el mercado existen oferentes ' }}
                            />
                            En el mercado existen oferentes
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
                                inputProps={{ 'aria-label': 'Los permisos, licencias y derechos estan autorizados' }}
                            />
                            Los permisos, licencias y derechos estan autorizados
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
                                inputProps={{ 'aria-label': 'La tecnologia propuesta es de vanguardia' }}
                            />
                            La tecnologia propuesta es de vanguardia
                        </label>
                    </div>
                    <div className="full">
                        <button type="button" className="save" onClick={approve} disabled={disabled}>
                            <FontAwesomeIcon icon="save" /> Aprobar
                            <LinearProgress />
                        </button>
                        <button type="button" className="cancel" onClick={reject} disabled={disabled}>
                            <FontAwesomeIcon icon="times" /> Rechazar
                            <LinearProgress />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}