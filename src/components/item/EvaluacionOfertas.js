import React, { useState,useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';
import ListadoDocumentosOfertas from './ListadoDocumentosOfertas';

export default function EvaluacionOfertas(props) {
    const [pod, setPod] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [acta_recepcion, setRecepcion] = useState(null);
    const [acta_apertura, setApertura] = useState(null);
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
        let user = localStorage.getItem("bidID");

        const data = new FormData();
        data.append('id', props.match.params.id);
        data.append('user', user);

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
                    
                    axios.post(props.url + "api/evaluacion-oferta",
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
                    Evaluación de expresiones de interés
                </h1>
                <form onSubmit={onSubmit}>
                    <div className="hero space-bellow">
                        <div className="row file-input space-bellow">
                            <div className="half">
                                <div className="label">
                                    Acta de recepción de expresión de interés
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
                                    Acta de Apertura
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

                    <div className="row">                        
                        <button type="button" className="completar-informacion" disabled={disabled} onClick={complete_info}>
                            <FontAwesomeIcon icon="save" /> Enviar
                            <LinearProgress />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}