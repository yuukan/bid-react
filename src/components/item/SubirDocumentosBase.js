import React, { useState,useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';
import ListadoDocumentosBase from './ListadoDocumentosBase';
import ListadoDocumentosBaseSubidos from './ListadoDocumentosBaseSubidos';

import Switch from '@material-ui/core/Switch';

export default function SubirDocumentosBase(props) {
    const [pod, setPod] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const [state, setState] = useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
        checkedD: false,
        checkedE: false,
        checkedF: false,
        checkedG: false,
        checkedH: false,
        checkedI: false,
        checkedJ: false,
        checkedK: false,
        checkedL: false,
        checkedM: false,
        checkedN: false,
        checkedO: false,
    });

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

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
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
            axios.post(props.url + "api/upload-item-base-documents", data)
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
        if (state.checkedA && state.checkedB && state.checkedC && state.checkedD && state.checkedE && state.checkedF && state.checkedG && state.checkedH && state.checkedI) {
            swal({
                title: "¿Completar Información?",
                text: "Mandaremos los documentos a Aprobación.",
                icon: "warning",
                buttons: ["Cancelar", "Enviar"],
                dangerMode: true,
            })
                .then((certifico) => {
                    if (certifico) {
                        let user = localStorage.getItem("bidID");
                        axios.post(props.url + "api/completar-archivos-base-item",
                            {
                                id: props.match.params.id,
                                user
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
        } else {
            swal("Alerta", "Debe de marcar las 15 preguntas.", "error");
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

    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container">
                <h1>
                    Carga de Documentos Base
                </h1>
                <h2>
                    {props.match.params.description}
                </h2>
                {
                    activity.rechazo_director && activity.rechazo_director!=="" ?
                    (
                        <div className="hero error space-bellow">
                            <h3 className="error">
                                <FontAwesomeIcon icon="exclamation-triangle" />
                                Razón de rechazo del director
                                <div className="text">
                                    {activity.rechazo_director}
                                </div>
                            </h3>
                        </div>
                    ) : ""
                }
                {
                    activity.rechazo_jefe_equipo && activity.rechazo_jefe_equipo!=="" ?
                    (
                        <div className="hero error space-bellow">
                            <h3 className="error">
                                <FontAwesomeIcon icon="exclamation-triangle" />
                                Razón de rechazo del jefe del equipo
                                <div className="text">
                                    {activity.rechazo_jefe_equipo}
                                </div>
                            </h3>
                        </div>
                    ) : ""
                }
                {
                    activity.rechazo_concepto_obligatorio && activity.rechazo_concepto_obligatorio!=="" ?
                    (
                        <div className="hero error space-bellow">
                            <h3 className="error">
                                <FontAwesomeIcon icon="exclamation-triangle" />
                                Razón de rechazo del concepto obligatorio
                                <div className="text">
                                    {activity.rechazo_concepto_obligatorio}
                                </div>
                            </h3>
                        </div>
                    ) : ""
                }
                {
                    activity.rechazo_final && activity.rechazo_final!=="" ?
                    (
                        <div className="hero error space-bellow">
                            <h3 className="error">
                                <FontAwesomeIcon icon="exclamation-triangle" />
                                Razón de rechazo final
                                <div className="text">
                                    {activity.rechazo_final}
                                </div>
                            </h3>
                        </div>
                    ) : ""
                }
                <form onSubmit={onSubmit}>
                    <div className="row file-input">
                        <h3>
                            Listado de documentos base a descargar
                        </h3>
                        <div className="hero space-bellow">
                            <ListadoDocumentosBase
                                id={props.match.params.id}
                                tipo={props.match.params.tipo}
                                url={props.url}
                                urlDocs={props.urlDocs}
                                delete={true}
                            />
                        </div>
                    </div>
                    <div className="row file-input space-bellow">
                        <div className="hero space-bellow">
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
                        <ListadoDocumentosBaseSubidos
                                id={props.match.params.id}
                                tipo={props.match.params.tipo}
                                url={props.url}
                                urlDocs={props.urlDocs}
                                delete={true}
                            />
                    </div>

                    <div className="row">
                        <h2>
                            Completar Información
                        </h2>
                        <div className="full">
                            <label htmlFor="checkedA" className="switch">
                                <Switch
                                    checked={state.checkedA}
                                    onChange={handleChange}
                                    color="primary"
                                    name="checkedA"
                                    id="checkedA"
                                    inputProps={{ 'aria-label': '1. ¿El proceso está en el Plan de Adquisiciones aprobado?' }}
                                />
                                1. ¿El proceso está en el Plan de Adquisiciones aprobado?
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
                                    inputProps={{ 'aria-label': '2. ¿El documento corresponde al estándar o ha sido acordado con el Banco?' }}
                                />
                               2. ¿El documento corresponde al estándar o ha sido acordado con el Banco?
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
                                    inputProps={{ 'aria-label': '3. ¿Los documentos estándar o acordados con el Banco no han sido modificados? ' }}
                                />
                               3. ¿Los documentos estándar o acordados con el Banco no han sido modificados? 
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
                                    inputProps={{ 'aria-label': '4. ¿Los requisitos solicitados a los potenciales oferentes no contravienen las políticas del Banco? ' }}
                                />
                               4. ¿Los requisitos solicitados a los potenciales oferentes no contravienen las políticas del Banco? 
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
                                    inputProps={{ 'aria-label': '5. ¿Se cuenta con el costo estimado y el mismo es consistente con el que figura en el Plan de Adquisiciones?  ' }}
                                />
                                5. ¿Se cuenta con el costo estimado y el mismo es consistente con el que figura en el Plan de Adquisiciones?  
                            </label>
                        </div>
                        <div className="full">
                            <label htmlFor="checkedF" className="switch">
                                <Switch
                                    checked={state.checkedF}
                                    onChange={handleChange}
                                    color="primary"
                                    name="checkedF"
                                    id="checkedF"
                                    inputProps={{ 'aria-label': '6. ¿Los plazos establecidos en los documentos de licitación corresponden a los acordados con el Banco?' }}
                                />
                                6. ¿Los plazos establecidos en los documentos de licitación corresponden a los acordados con el Banco?
                            </label>
                        </div>
                        <div className="full">
                            <label htmlFor="checkedG" className="switch">
                                <Switch
                                    checked={state.checkedG}
                                    onChange={handleChange}
                                    color="primary"
                                    name="checkedG"
                                    id="checkedG"
                                    inputProps={{ 'aria-label': '7. ¿El documento de licitación contiene las especificaciones técnicas y éstas no contravienen las políticas del Banco?' }}
                                />
                                7. ¿El documento de licitación contiene las especificaciones técnicas y éstas no contravienen las políticas del Banco?
                            </label>
                        </div>
                        <div className="full">
                            <label htmlFor="checkedH" className="switch">
                                <Switch
                                    checked={state.checkedH}
                                    onChange={handleChange}
                                    color="primary"
                                    name="checkedH"
                                    id="checkedH"
                                    inputProps={{ 'aria-label': '8. ¿El documento de licitación contiene los criterios de evaluación y son claros y objetivos?' }}
                                />
                                8. ¿El documento de licitación contiene los criterios de evaluación y son claros y objetivos?
                            </label>
                        </div>
                        <div className="full">
                            <label htmlFor="checkedI" className="switch">
                                <Switch
                                    checked={state.checkedI}
                                    onChange={handleChange}
                                    color="primary"
                                    name="checkedI"
                                    id="checkedI"
                                    inputProps={{ 'aria-label': '9. ¿El llamado a licitación es consistente con el formato estándar del Banco? ' }}
                                />
                                9. ¿El llamado a licitación es consistente con el formato estándar del Banco? 
                            </label>
                        </div>
                        
                        <button type="button" className="completar-informacion" disabled={disabled} onClick={complete_info}>
                            <FontAwesomeIcon icon="save" /> Completar Información
                            <LinearProgress />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}