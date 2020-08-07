import React, { useState,useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';
import ListadoDocumentosOfertas from './ListadoDocumentosOfertas';

export default function RecepcionOfertas(props) {
    const [pod, setPod] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [acta_recepcion, setRecepcion] = useState(null);
    const [acta_apertura, setApertura] = useState(null);
    const [activity, setActivity] = useState(false);

    const [state2, setState2] = useState({
        conclusion_evaluacion:""
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
                setState2({ ...state2, conclusion_evaluacion: response.data[0].conclusion_evaluacion });
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
            axios.post(props.url + "api/upload-item-ofertas", data)
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
            let user = localStorage.getItem("bidID");

            const data = new FormData();
            data.append('id', props.match.params.id);
            data.append('user', user);
            data.append('conclusion_evaluacion', s.conclusion_evaluacion);

            if (acta_recepcion)
                data.append('acta_recepcion', acta_recepcion);
            if (acta_apertura)
                data.append('acta_apertura', acta_apertura);

            swal({
                title: "¿Completar Información?",
                text: "Mandaremos los documentos a Aprobación.",
                icon: "warning",
                buttons: ["Cancelar", "Enviar"],
                dangerMode: true,
            })
                .then((certifico) => {
                    if (certifico) {
                        
                        axios.post(props.url + "api/completar-archivos-ofertas-item",
                            data
                        )
                            .then(function () {
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
        
        if (event.target.name === "acta_recepcion") {
            setRecepcion(event.target.files[0]);
        }

        if (event.target.name === "acta_apertura") {
            setApertura(event.target.files[0]);
        }

    }

    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container">
                <h1>
                    Recepción de expresión de interés
                </h1>
                <form onSubmit={onSubmit}>
                    <div className="hero space-bellow">
                        <div className="row">
                            <div className="half">
                                <label htmlFor="conclusion_evaluacion">
                                    Fecha de conclusión de la evaluación
                                </label>
                                <input
                                    type="date"
                                    name="conclusion_evaluacion"
                                    id="conclusion_evaluacion"
                                    value={state2.conclusion_evaluacion}
                                    onChange={handleChange2}
                                />
                            </div>
                        </div>
                        <div className="row file-input space-bellow">
                            <div className="half">
                                <div className="label">
                                    Cargar acta de recepción de expresión de interés
                                </div>
                                <input type="file" name="acta_recepcion" id="acta_recepcion" onChange={onChangeHandler} />
                                <label htmlFor="acta_recepcion" className={acta_recepcion ? 'active' : ''}>
                                    <FontAwesomeIcon icon="file-upload" />
                                    {
                                        acta_recepcion ? acta_recepcion.name : "Seleccione un archivo"
                                    }
                                </label>
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
                                <div className="label">
                                    Cargar acta de Apertura
                                </div>
                                <input type="file" name="acta_apertura" id="acta_apertura" onChange={onChangeHandler} />
                                <label htmlFor="acta_apertura" className={acta_apertura ? 'active' : ''}>
                                    <FontAwesomeIcon icon="file-upload" />
                                    {
                                        acta_apertura ? acta_apertura.name : "Seleccione un archivo"
                                    }
                                </label>
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
                        <div className="row file-input space-bellow">
                            <h4>
                                Subir documento de expresión de interés
                            </h4>
                            <div className="half">
                                <div className="label">
                                    Seleccione Documentos
                                </div>
                                <input multiple type="file" name="pod" id="pod" onChange={onChangeHandler} />
                                <label htmlFor="pod" className={pod ? 'active' : ''}>
                                    <FontAwesomeIcon icon="file-upload" />
                                    {
                                        pod ? pod.length+" archivos seleccionados" : "Seleccione Archivos"
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
                                <ListadoDocumentosOfertas
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