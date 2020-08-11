import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';
import LinearProgress from '@material-ui/core/LinearProgress';

//Components
import ListadoDocumentosEvaluacionListaCorta from './ListadoDocumentosEvaluacionListaCorta';
import ListadoDocumentosOfertasListaCorta from './ListadoDocumentosOfertasListaCorta';
import Switch from '@material-ui/core/Switch';

export default function ConceptoObligatorioEvaluacionListaCorta(props) {

    const [plan, setPlan] = useState(null);
    const [activity, setActivity] = useState(false);
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

        axios.post(props.url + "api/get-activity-info",
            {
                id: props.match.params.id
            }
        )
            .then(function (response) {
                setActivity(response.data[0]);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [props]);

    // Approve this plan
    const approve = () => {
        let user = localStorage.getItem("bidID");
        if (state.checkedA && state.checkedB && state.checkedC && state.checkedD && state.checkedE && state.checkedF) {
            swal({
                text: 'Ingrese el Concepto Obligatorio',
                content: {
                    element: "input",
                },
                button: {
                    text: "Enviar"
                },
                icon: "success",
            }).then((razon => {
                if (razon) {
                    setDisabled(true);
                    axios.post(props.url + "api/si-concepto-obligatorio-item-evaluacion-lista-corta", 
                        {
                            id: props.match.params.id,
                            user,
                            razon
                        }
                    )
                        .then(function () {
                            setDisabled(false);
                            swal("Información", "Se ha enviado el Concepto Obligatorio a aprobación", "info")
                                .then(() => {
                                    props.getProcesses();
                                    props.history.goBack();
                                });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    swal("Información", "Debe de ingresar el Concepto Obligatorio.", "error")
                }
            }));

        } else {
            swal("Alerta", "Debe de marcar las 6 preguntas.", "error");
        }
    }
    let razon2 = "";
    if(activity){
        razon2 = activity.comentario_conformidad;
    }

    //####################################Return####################################
    return (
        <div className="crear-container">

            <div className="sub-container space-bellow">
                <div className="row">
                    <h1>
                        {
                            activity && activity.cs_tipo_plan!==4 ? 'Concepto Obligatorio' : 'Concepto Obligatorio para lista corta'
                        }
                    </h1>
                    
                    <h2>
                        {props.match.params.description}
                    </h2>

                    {
                        razon2!=="" ?
                        (
                            <div className="hero space-bellow">
                                <h3 className="concepto_obligatorio">
                                    <FontAwesomeIcon icon="info-square" />
                                    Comentario de conformidad
                                    <div className="text">
                                        <span dangerouslySetInnerHTML={{__html: razon2}} />
                                    </div>
                                </h3>
                            </div>
                        ) : ""
                    }

                    <div className="hero space-bellow">
                        <div className="row">
                            <ListadoDocumentosOfertasListaCorta
                                    id={props.match.params.id}
                                    tipo={props.match.params.tipo}
                                    url={props.url}
                                    urlDocs={props.urlDocs}
                                    delete={false}
                                />
                        </div>
                    </div>

                    <div className="hero space-bellow">
                        <div className="row">
                            <ListadoDocumentosEvaluacionListaCorta
                                    id={props.match.params.id}
                                    tipo={props.match.params.tipo}
                                    url={props.url}
                                    urlDocs={props.urlDocs}
                                    delete={false}
                                />
                        </div>
                    </div>

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
                            <FontAwesomeIcon icon="save" /> Concepto Obligatorio
                            <LinearProgress />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}