import React, { useState,useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';
import ListadoDocumentosOfertasListaCorta from './ListadoDocumentosOfertasListaCorta';
import ListadoDocumentosEvaluacionListaCorta from './ListadoDocumentosEvaluacionListaCorta';
import ListadoDocumentosVerificacionListaCorta from './ListadoDocumentosVerificacionListaCorta';

export default function VerificacionInformacionValuacionListaCorta(props) {
    const [pod, setPod] = useState(null);
    const [pod2, setPod2] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [activity, setActivity] = useState(false);

    const [state2, setState2] = useState({
        comentario_verificacion: ""
    });

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        axios.post(props.url + "api/get-activity-info",
            {
                id: props.match.params.id
            }
        )
            .then(function (response) {
                setActivity(response.data[0]);
                setState2({ ...state2, nog: response.data[0].nog, recepcion_ofertas: response.data[0].recepcion_ofertas || "" });
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [props]);

    const handleChange2 = (event) => {
        setState2({ ...state2, [event.target.name]: event.target.value });
    };


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
            axios.post(props.url + "api/upload-item-verificacion-documents-lista-corta", data)
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
    //####################################Save Profile####################################
    const onSubmit2 = (e) => {
        e.preventDefault();
        if (pod2) {
            const data = new FormData()
            for(let i =0;i<pod2.length;i++){
                data.append('pod[]', pod2[i]);
            }

            data.append('id', props.match.params.id);

            setDisabled(true);
            let user = localStorage.getItem("bidID");
            data.append('user', user);
            axios.post(props.url + "api/upload-item-evaluacion-documents-lista-corta", data)
                .then(function () {
                    setDisabled(false);
                    swal("Éxito", "!Documentos Cargados!", "success");
                    setPod2(null);
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
        let s = state2;
        swal({
            title: "¿Completar la verificación?",
            text: "Mandaremos la información de verifiación.",
            icon: "warning",
            buttons: ["Cancelar", "Enviar"],
            dangerMode: true,
        })
            .then((certifico) => {
                if (certifico) {
                    let user = localStorage.getItem("bidID");
                    axios.post(props.url + "api/verificacion-valuacion-lista-corta",
                        {
                            id: props.match.params.id,
                            user,
                            comentario_verificacion: s.comentario_verificacion
                        }
                    )
                        .then(function () {
                            props.history.push("/ver-plan/" + props.match.params.parent);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            });
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
    //####################################Change File Handler####################################
    const onChangeHandler2 = event => {
        if (event.target.name === "pod2") {
            let fls = [];
            for(let i =0;i<event.target.files.length;i++){
                fls.push(event.target.files[i]);
            }
            setPod2(fls);
        }

    }


    let razon1 = "";
    let razon2 = "";
    if(activity){
        razon1 = activity.razon_verificacion_evaluacion_lista_corta;
        razon2 = activity.solicitud_verificacion_evaluacion_lista_corta;
    }
    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container">
                <h1>
                    {
                        activity && activity.cs_tipo_plan!==4 ? 'Verificación de Información' : 'Verificación de Información para lista corta'
                    }
                </h1>
                <h2>
                    {props.match.params.description}
                </h2>

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

                {
                    razon2!=="" ?
                    (
                        <div className="hero concepto_obligatorio space-bellow">
                            <h3 className="concepto_obligatorio">
                                <FontAwesomeIcon icon="info-square" />
                                Comentario Director
                                <div className="text">
                                    <span dangerouslySetInnerHTML={{__html: razon2}} />
                                </div>
                            </h3>
                        </div>
                    ) : ""
                }
                
                <form onSubmit={onSubmit2}>
                    <div className="hero space-bellow">
                        <div className="row file-input space-bellow">
                            <h4>
                                Subir documentos de Evaluación
                            </h4>
                            <div className="half">
                                <div className="label">
                                    Seleccione Documentos
                                </div>
                                <input multiple type="file" name="pod2" id="pod2" onChange={onChangeHandler2} />
                                <label htmlFor="pod2" className={pod2 ? 'active' : ''}>
                                    <FontAwesomeIcon icon="file-upload" />
                                    {
                                        pod2 ? pod2.length+" archivos seleccionados" : "Seleccione un Archivo"
                                    }
                                </label>
                                <button type="submit" className="save pull-left" disabled={disabled}>
                                    <FontAwesomeIcon icon="save" /> Subir Archivos
                                    <LinearProgress />
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="hero space-bellow">
                    <ListadoDocumentosEvaluacionListaCorta
                            id={props.match.params.id}
                            tipo={props.match.params.tipo}
                            url={props.url}
                            urlDocs={props.urlDocs}
                            delete={true}
                        />
                </div>     
                
                <form onSubmit={onSubmit}>
                    <div className="hero space-bellow">
                        <div className="row">
                            <div className="half">
                                <label htmlFor="comentario_verificacion">
                                    Comentario de Verificación
                                </label>
                                <textarea
                                    name="comentario_verificacion"
                                    id="comentario_verificacion"
                                    onChange={handleChange2}
                                    value={state2.comentario_verificacion}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="hero space-bellow">
                        <div className="row file-input space-bellow">
                            <h4>
                                Subir documentos de Verificación
                            </h4>
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
                        <ListadoDocumentosVerificacionListaCorta
                                id={props.match.params.id}
                                tipo={props.match.params.tipo}
                                url={props.url}
                                urlDocs={props.urlDocs}
                                delete={true}
                            />
                    </div>                    

                    <div className="hero space-bellow">
                        <ListadoDocumentosOfertasListaCorta
                                id={props.match.params.id}
                                tipo={props.match.params.tipo}
                                url={props.url}
                                urlDocs={props.urlDocs}
                                delete={false}
                            />
                    </div>

                    <div className="row">                        
                        <button type="button" className="completar-informacion" disabled={disabled} onClick={complete_info}>
                            <FontAwesomeIcon icon="save" /> Guardar
                            <LinearProgress />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}