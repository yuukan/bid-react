import React, { useState,useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';
import ListadoDocumentosOfertas from './ListadoDocumentosOfertas';
import ListadoDocumentosEvaluacion from './ListadoDocumentosEvaluacion';
import ListadoDocumentosVerificacion from './ListadoDocumentosVerificacion';

export default function VerificacionInformacionValuacion(props) {
    const [pod, setPod] = useState(null);
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
            axios.post(props.url + "api/upload-item-verificacion-documents", data)
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
        if(state2.nog==="" || state2.recepcion_ofertas=== null){
            swal("Alerta", "Debe de ingresar el NOG y fecha de recepción de ofertas.", "error");
        }else {
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
                        axios.post(props.url + "api/verificacion-valuacion",
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

    let description = "";
    if(activity)
    switch(activity.cs_estado_proceso_id){
        case(30):
            description = activity.rechazo_certificacion_director;
            break;
        case(32):
            description = activity.rechazo_certificacion_tecnica_licitacion;
            break;
        case(34):
            description = activity.rechazo_concepto_obligatorio_licitacion;
            break;
        case(36):
            description = activity.rechazo_final_licitacion;
            break;
        default:
            break;
    }

    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container">
                <h1>
                    Verificación de Información
                </h1>
                <h2>
                    {props.match.params.description}
                </h2>
                
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
                                Subir documento de Verificación
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
                        <ListadoDocumentosVerificacion
                                id={props.match.params.id}
                                tipo={props.match.params.tipo}
                                url={props.url}
                                urlDocs={props.urlDocs}
                                delete={true}
                            />
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