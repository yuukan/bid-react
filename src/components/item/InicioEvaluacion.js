import React, { useState,useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';
import ListadoDocumentosOfertas from './ListadoDocumentosOfertas';
import ListadoDocumentosEvaluacion from './ListadoDocumentosEvaluacion';
import ListadoDocumentosVerificacion from './ListadoDocumentosVerificacion';

export default function InicioEvaluacion(props) {
    const [pod, setPod] = useState(null);
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



    //####################################Save Profile####################################
    const onSubmit = (e) => {
        e.preventDefault();
        if (pod) {
            const data = new FormData()
            for(let i =0;i<pod.length;i++){
                data.append('pod[]', pod[i]);
            }

            data.append('id', props.match.params.id);

            setDisabled(true);
            let user = localStorage.getItem("bidID");
            data.append('user', user);
            axios.post(props.url + "api/upload-item-evaluacion-documents", data)
                .then(function () {
                    setDisabled(false);
                    swal("Éxito", "!Documentos Cargados!", "success");
                    setPod(null);
                    e.target.reset();
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            swal("Atención", "!Debe de seleccionar Archivos!", "error");
        }
        return false;
    };
    //####################################Completar Información#########################################
    const complete_info = () => {
        swal({
            title: "¿Continuar?",
            text: "Se enviará al siguiente paso.",
            icon: "warning",
            buttons: ["Cancelar", "Enviar"],
            dangerMode: true,
        })
            .then((certifico) => {
                if (certifico) {
                    let user = localStorage.getItem("bidID");
                    axios.post(props.url + "api/iniciar-evaluacion",
                        {
                            id: props.match.params.id,
                            user
                        }
                    )
                        .then(function () {
                            props.getProcesses();
                            window.history.back();
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
                axios.post(props.url + "api/verificar-evaluacion",
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
    //####################################Change File Handler####################################
    const onChangeHandler = event => {
        if (event.target.name === "pod") {
            let fls = [];
            for(let i =0;i<event.target.files.length;i++){
                fls.push(event.target.files[i]);
            }
            setPod(fls);
        }

    }

    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container">
                <h1>
                    Inicio de Evaluación
                </h1>
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
                    <ListadoDocumentosOfertas
                            id={props.match.params.id}
                            tipo={props.match.params.tipo}
                            url={props.url}
                            urlDocs={props.urlDocs}
                            delete={false}
                        />
                </div>

                {
                    activity && activity.cs_estado_proceso_id ===47 ?
                        (
                            <div className="hero space-bellow">
                                <h3>Comentario de Verificación</h3>
                                <div className="comment">
                                    {activity.comentario_verificacion}
                                </div>
                                <ListadoDocumentosVerificacion
                                    id={props.match.params.id}
                                    tipo={props.match.params.tipo}
                                    url={props.url}
                                    urlDocs={props.urlDocs}
                                    delete={false}
                                />
                            </div>
                        ) : ""
                }

                <h1>
                    Subir documentos de Evaluación
                </h1>
                <form onSubmit={onSubmit}>
                    <div className="hero space-bellow">
                        <div className="row file-input space-bellow">
                            <div className="half">
                                <div className="label">
                                    Seleccione Documentos
                                </div>
                                <input multiple type="file" name="pod" id="pod" onChange={onChangeHandler} />
                                <label htmlFor="pod" className={pod ? 'active' : ''}>
                                    <FontAwesomeIcon icon="file-upload" />
                                    {
                                        pod ? pod.length+" archivos seleccionados" : "Seleccione un Archivo"
                                    }
                                </label>
                                <button type="submit" className="save pull-left" disabled={disabled}>
                                    <FontAwesomeIcon icon="save" /> Subir Archivos
                                    <LinearProgress />
                                </button>
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
                                        delete={true}
                                    />
                            </div>
                        </div>
                    </div>

                    <div className="row">                        
                        <button type="button" className="save" disabled={disabled} onClick={complete_info}>
                            <FontAwesomeIcon icon="save" /> Continuar
                            <LinearProgress />
                        </button>
                        <button type="button" className="cancel" disabled={disabled} onClick={verify}>
                            <FontAwesomeIcon icon="exclamation-triangle" /> Solicitar Verificación
                            <LinearProgress />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}