import React, { useState,useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';
import ListadoDocumentosOfertasListaCorta from './ListadoDocumentosOfertasListaCorta';
import ListadoDocumentosEvaluacionListaCorta from './ListadoDocumentosEvaluacionListaCorta';
import ListadoDocumentosConceptoObligatorio from './ListadoDocumentosConceptoObligatorio';

export default function VerificacionEvaluacionJefeEquipoListaCorta(props) {
    const [disabled, setDisabled] = useState(false);
    const [activity, setActivity] = useState(false);


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
        setDisabled(true);
        let user = localStorage.getItem("bidID");
        axios.post(props.url + "api/solicitar-verificacion-evaluacion-jefe-equipo-lista-corta",
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
    }

    let razon2 = "";
    if(activity){
        razon2 = activity.comentario_conformidad_lista_corta;
    }

    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container">
                <h1>
                    Validación de evaluación jefe de equipo lista corta
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
                                activity && activity.acta_recepcion_lista_corta ?
                                    (
                                        <a target="_blank" className="download" rel="noopener noreferrer" href={props.urlDocs + activity.acta_recepcion_lista_corta}>
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
                                activity && activity.acta_apertura_lista_corta ?
                                    (
                                        <a target="_blank" className="download" rel="noopener noreferrer" href={props.urlDocs + activity.acta_apertura_lista_corta}>
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
                            <ListadoDocumentosOfertasListaCorta
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
                            <ListadoDocumentosEvaluacionListaCorta
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
                        cs_estado_proceso_id={62}
                        type={3}
                    />
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