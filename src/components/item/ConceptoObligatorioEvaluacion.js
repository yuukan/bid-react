import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';
import LinearProgress from '@material-ui/core/LinearProgress';

//Components
import ListadoDocumentosEvaluacion from './ListadoDocumentosEvaluacion';
import ListadoDocumentosOfertas from './ListadoDocumentosOfertas';
import Switch from '@material-ui/core/Switch';
import ListadoDocumentosConceptoObligatorio from './ListadoDocumentosConceptoObligatorio';

export default function ConceptoObligatorioEvaluacion(props) {

    const [plan, setPlan] = useState(null);
    const [activity, setActivity] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [state, setState] = useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
        checkedD: false,
        checkedE: false
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
        if (
            state.checkedA 
            && state.checkedB 
            && state.checkedC 
            && state.checkedD 
            && state.checkedE
        ) {
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
                    axios.post(props.url + "api/si-concepto-obligatorio-item-evaluacion",
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
            swal("Alerta", "Debe de marcar las preguntas.", "error");
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
                            <ListadoDocumentosOfertas
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
                            <ListadoDocumentosEvaluacion
                                    id={props.match.params.id}
                                    tipo={props.match.params.tipo}
                                    url={props.url}
                                    urlDocs={props.urlDocs}
                                    delete={false}
                                />
                        </div>
                    </div>

                    <div className="full">
                        <ListadoDocumentosConceptoObligatorio
                            id={props.match.params.id}
                            tipo={props.match.params.tipo}
                            url={props.url}
                            urlDocs={props.urlDocs}
                            delete={true}
                            cs_estado_proceso_id={35}
                            type={1}
                        />
                    </div>

                    <div className="full">
                        <label htmlFor="checkedA" className="switch">
                            <Switch
                                checked={state.checkedA}
                                onChange={handleChange}
                                color="primary"
                                name="checkedA"
                                id="checkedA"
                                inputProps={{ 'aria-label': '1. ¿El proceso fue debidamente divulgado/publicitado?' }}
                            />
                            1. ¿El proceso fue debidamente divulgado/publicitado?
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
                                inputProps={{ 'aria-label': '2. ¿El Informe de Evaluación está completo y contiene todos los respaldos? ' }}
                            />
                            2. ¿El Informe de Evaluación está completo y contiene todos los respaldos? 
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
                                inputProps={{ 'aria-label': '3. ¿La junta o comisión de evaluación se conformó conforme se establece en el ROP o MOP?' }}
                            />
                            3. ¿La junta o comisión de evaluación se conformó conforme se establece en el ROP o MOP?
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
                                inputProps={{ 'aria-label': '4. ¿La evaluación se realizó conforme lo establecido en el documento de licitación y políticas del Banco?' }}
                            />
                            4. ¿La evaluación se realizó conforme lo establecido en el documento de licitación y políticas del Banco?
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
                                inputProps={{ 'aria-label': '5. ¿La recomendación de adjudicación es consistente con el resultado de la evaluación y corresponde a la oferta mejor evaluada? ' }}
                            />
                            5. ¿La recomendación de adjudicación es consistente con el resultado de la evaluación y corresponde a la oferta mejor evaluada? 
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