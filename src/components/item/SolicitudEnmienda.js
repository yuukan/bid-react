import React, { useState,useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';
import ListadoDocumentosLicitacion from './ListadoDocumentosLicitacion';
import ListadoDocumentosEnmienda from './ListadoDocumentosEnmienda';

export default function SolicitudEnmienda(props) {
    const [pod, setPod] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [activity, setActivity] = useState(false);

    const [state2, setState2] = useState({
        nog: "",
        descripcion_enmienda: ""
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
                setState2({ ...state2, nog: response.data[0].nog, descripcion_enmienda: response.data[0].descripcion_enmienda || "" });
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
            axios.post(props.url + "api/upload-item-enmienda-documents", data)
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
        if(state2.descripcion_enmienda===null || state2.descripcion_enmienda===""){
            swal("Alerta", "Debe de ingresar la descripción de enmienda.", "error");
        }else{
            setDisabled(true);
            let s = state2;
            swal({
                title: "¿Completar Información?",
                text: "Mandaremos la solicitud de Enmienda.",
                icon: "warning",
                buttons: ["Cancelar", "Enviar"],
                dangerMode: true,
            })
                .then((certifico) => {
                    if (certifico) {
                        let user = localStorage.getItem("bidID");
                        axios.post(props.url + "api/solicitar-enmienda-item",
                            {
                                id: props.match.params.id,
                                user,
                                descripcion_enmienda: s.descripcion_enmienda
                            }
                        )
                            .then(function () {
                                setDisabled(false);
                                window.history.back();
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

    let description2 = activity.descripcion_enmienda;
    let description="";

    if(activity)
    switch(activity.cs_estado_proceso_id){
        case(39):
            description += activity.rechazo_certificacion_tecnica_licitacion_enmienda;
            break;
        case(41):
            description += activity.rechazo_concepto_obligatorio_licitacion_enmienda;
            break;
        case(43):
            description += activity.rechazo_final_licitacion_enmienda;
            break;
        default:
            break;
    }

    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container">
                <h1>
                    Solicitud Enmienda
                </h1>
                <h2>
                    {props.match.params.description}
                </h2>
                {
                    description2!=="" ?
                    (
                        <div className="hero error space-bellow">
                            <h3 className="error">
                                <FontAwesomeIcon icon="exclamation-triangle" />
                                Solicitud de Enmienda anterior
                                <div className="text">
                                    Razón: <span dangerouslySetInnerHTML={{__html: description2}} />
                                </div>
                            </h3>
                        </div>
                    ) : ""
                }
                {
                    description!=="" ?
                    (
                        <div className="hero error space-bellow">
                            <h3 className="error">
                                <FontAwesomeIcon icon="exclamation-triangle" />
                                {activity.estado}
                                <div className="text">
                                    Razón: <span dangerouslySetInnerHTML={{__html: description}} />
                                </div>
                            </h3>
                        </div>
                    ) : ""
                }
                <form onSubmit={onSubmit}>
                    <div className="hero space-bellow">
                        <div className="row">
                            <div className="half">
                                <label htmlFor="numero">
                                    <strong>
                                        NOG: 
                                    </strong>
                                    {state2.nog}
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="half">
                                <label htmlFor="descripcion_enmienda">
                                    Descripción Enmienda
                                </label>
                                <textarea
                                    name="descripcion_enmienda"
                                    id="descripcion_enmienda"
                                    onChange={handleChange2}
                                    value={state2.descripcion_enmienda}
                                />
                            </div>
                        </div>
                        <div className="row file-input space-bellow">
                            <h4>
                                Subir documento de Licitación
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
                        <div className="row">
                            <div className="row">
                                <ListadoDocumentosEnmienda
                                        id={props.match.params.id}
                                        tipo={props.match.params.tipo}
                                        url={props.url}
                                        urlDocs={props.urlDocs}
                                        delete={true}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="hero space-bellow">
                        <div className="row">
                            <div className="row">
                                <ListadoDocumentosLicitacion
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
                        <div className="full">
                            <button type="button" className="completar-informacion" disabled={disabled} onClick={complete_info}>
                                <FontAwesomeIcon icon="save" /> Guardar
                                <LinearProgress />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}