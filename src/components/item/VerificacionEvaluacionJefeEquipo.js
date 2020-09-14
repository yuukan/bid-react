import React, { useState,useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';
import ListadoDocumentosOfertas from './ListadoDocumentosOfertas';
import ListadoDocumentosEvaluacion from './ListadoDocumentosEvaluacion';
import ListadoDocumentosConceptoObligatorio from './ListadoDocumentosConceptoObligatorio';
import Switch from '@material-ui/core/Switch';

export default function VerificacionEvalluacionJefeEquipo(props) {
    const [disabled, setDisabled] = useState(false);
    const [activity, setActivity] = useState(false);
    const [state, setState] = useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
        checkedD: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
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

    //####################################Verify#########################################
    const verify = () => {
        
        let user = localStorage.getItem("bidID");
        if (
            state.checkedA
            && state.checkedB
            && state.checkedC
            && state.checkedD
        ) {
            setDisabled(true);
            axios.post(props.url + "api/solicitar-verificacion-evaluacion-jefe-equipo",
                {
                    id: props.match.params.id,
                    user
                }
            )
                .then(function () {
                    swal("Información", "Se ha enviado la solicitud.", "info")
                        .then(() => {
                            props.getProcesses();
                            props.history.goBack();
                            setDisabled(false);
                        });
                })
                .catch(function (error) {
                    console.log(error);
                });   
        } else {
            swal("Alerta", "Debe de marcar todas las preguntas", "error");
        }
    }

    let razon2 = "";
    if(activity){
        razon2 = activity.comentario_conformidad;
    }

    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container">
                <h1>
                    {
                        activity && activity.cs_tipo_plan!==4 ? 'Validación de evaluación jefe de equipo' : 'Validación de evaluación jefe de equipo para lista corta'
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
                    <div className="row file-input space-bellow">
                        <div className="half">
                            <h3 className="concepto_obligatorio">
                                Acta de Recepcion
                            </h3>
                            {
                                activity && activity.acta_recepcion ?
                                    (
                                        <a target="_blank" className="download" rel="noopener noreferrer" href={props.urlDocs + activity.acta_recepcion}>
                                            <FontAwesomeIcon icon="download" />
                                            Descargar
                                        </a>
                                    ) : ""
                            }
                        </div>
                    </div>
                    <div className="row file-input space-bellow">
                        <div className="half">
                            <h3 className="concepto_obligatorio">
                                Acta de Apertura
                            </h3>
                            {
                                activity && activity.acta_apertura ?
                                    (
                                        <a target="_blank" className="download" rel="noopener noreferrer" href={props.urlDocs + activity.acta_apertura}>
                                            <FontAwesomeIcon icon="download" />
                                            Descargar
                                        </a>
                                    ) : ""
                            }
                        </div>
                    </div>
                </div>

                <div className="hero space-bellow">
                    <div className="row">
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
                </div>

                <div className="hero space-bellow">
                    <div className="row">
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
                </div>

                <div className="full">
                    <ListadoDocumentosConceptoObligatorio
                        id={props.match.params.id}
                        tipo={props.match.params.tipo}
                        url={props.url}
                        urlDocs={props.urlDocs}
                        delete={false}
                        cs_estado_proceso_id={48}
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
                            inputProps={{ 'aria-label': '1. ¿La junta o comisión de evaluación se conformó conforme se establece en el ROP o MOP?' }}
                        />
                        1. ¿La junta o comisión de evaluación se conformó conforme se establece en el ROP o MOP?
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
                            inputProps={{ 'aria-label': '2.¿La evaluación de la capacidad técnica y financiera de los oferentes cumple con los criterios establecidos en el documento de licitación?' }}
                        />
                        2.¿La evaluación de la capacidad técnica y financiera de los oferentes cumple con los criterios establecidos en el documento de licitación?
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
                            inputProps={{ 'aria-label': '4. ¿La recomendación de adjudicación corresponde a la oferta mejor evaluada?' }}
                        />
                        4. ¿Las ofertas se recibieron según lo establecido en el documento de licitación?
                    </label>
                </div>

                <div className="row">                        
                    <button type="button" className="cancel" disabled={disabled} onClick={verify}>
                        <FontAwesomeIcon icon="exclamation-triangle" /> Verificar
                        <LinearProgress />
                    </button>
                </div>
            </div>
        </div>
    );
}