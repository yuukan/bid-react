import React, { useState,useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';
import ListadoDocumentosOfertasListaCorta from './ListadoDocumentosOfertasListaCorta';
import ListadoDocumentosEvaluacionListaCorta from './ListadoDocumentosEvaluacionListaCorta';
import ListadoDocumentosConceptoObligatorio from './ListadoDocumentosConceptoObligatorio';

export default function EvaluacionDirectorListaCorta(props) {
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

    //####################################Completar Información#########################################
    const complete_info = () => {
        swal({
            title: "¿Continuar?",
            text: "Se solicitará la no objeción.",
            icon: "warning",
            buttons: ["Cancelar", "Enviar"],
            dangerMode: true,
        })
            .then((certifico) => {
                if (certifico) {
                    let user = localStorage.getItem("bidID");
                    setDisabled(true);
                    axios.post(props.url + "api/solicitar-no-objecion-evaluacion-lista-corta2",
                        {
                            id: props.match.params.id,
                            user
                        }
                    )
                        .then(function () {
                            props.getProcesses();
                            window.history.back();
                            setDisabled(false);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            });
    }
    //####################################Verify#########################################
    const verify = () => {
        let user = localStorage.getItem("bidID");
        swal({
            text: '¿Cuál es la razón para la solicitud de verificación?',
            content: {
                element: "input",
            },
            button: {
                text: "Solicitar"
            },
            icon: "error",
        }).then((razon => {
            if (razon) {
                setDisabled(true);
                axios.post(props.url + "api/solicitar-verificacion-evaluacion-lista-corta",
                    {
                        id: props.match.params.id,
                        user,
                        razon
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
                swal("Información", "Debe de ingresar una razón para el rechazo.", "error")
            }
        }));
    }
    //####################################Verify#########################################
    const solicitar_comentario = () => {
        let user = localStorage.getItem("bidID");   
        setDisabled(true);
        axios.post(props.url + "api/solicitar-comentario-conformidad-lista-corta",
            {
                id: props.match.params.id,
                user
            }
        )
            .then(function () {
                swal("Información", "Se ha solicitado el comentrio de conformidad.", "info")
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

    let razon1 = "";
    let razon2 = "";
    let razon3 = "";
    if(activity){
        razon1 = activity.razon_verificacion_evaluacion_lista_corta;
        razon2 = activity.comentario_conformidad_lista_corta;
        razon3 = activity.comentario_denegar_no_objecion_lista_corta;
    }
    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container">
                <h1>
                    Evaluación Director lista corta
                </h1>

                <h2>
                    {props.match.params.description}
                </h2>

                {
                    razon3 && razon3!=="" ?
                    (
                        <div className="hero error space-bellow">
                            <h3 className="error">
                                <FontAwesomeIcon icon="info-square" />
                                Comentario objecion concepto obligatorio
                                <div className="text">
                                    <span dangerouslySetInnerHTML={{__html: razon3}} />
                                </div>
                            </h3>
                        </div>
                    ) : ""
                }

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

                {
                    razon1!=="" ?
                    (
                        <div className="hero concepto_obligatorio space-bellow">
                            <h3 className="concepto_obligatorio">
                                <FontAwesomeIcon icon="info-square" />
                                Comentario junta de evaluación
                                <div className="text">
                                    <span dangerouslySetInnerHTML={{__html: razon1}} />
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
                    {
                        props.op ===1 ?
                        (
                            <button type="button" className="save" disabled={disabled} onClick={complete_info}>
                                <FontAwesomeIcon icon="save" /> Solicitar No objeción
                                <LinearProgress />
                            </button>
                        ) :
                        props.op ===2 ?
                        (
                            <button type="button" className="cancel" disabled={disabled} onClick={verify}>
                                <FontAwesomeIcon icon="exclamation-triangle" /> Solicitar Verificación
                                <LinearProgress />
                            </button>
                        ): 
                        (
                            <button type="button" className="cancel" disabled={disabled} onClick={solicitar_comentario}>
                                <FontAwesomeIcon icon="exclamation-triangle" /> Solicitar Comentario de Conformidad
                                <LinearProgress />
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
}