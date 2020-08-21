import React, { useState,useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';
import ListadoDocumentos from './ListadoDocumentos';

import Switch from '@material-ui/core/Switch';

export default function SubirDocumentos(props) {
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
            axios.post(props.url + "api/upload-item-documents", data)
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
        if (state.checkedA && state.checkedB && state.checkedC && state.checkedD && state.checkedE && state.checkedF && state.checkedG && state.checkedH && state.checkedI && state.checkedJ && state.checkedK && state.checkedL && state.checkedM && state.checkedN && state.checkedO) {
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
                        axios.post(props.url + "api/completar-informacion-item",
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
                    Carga de Documentos de la Actividad
                </h1>

                {
                    activity.rechazo_tecnico && activity.rechazo_tecnico!=="" ?
                    (
                        <div className="hero error space-bellow">
                            <h3 className="error">
                                <FontAwesomeIcon icon="exclamation-triangle" />
                                Razón de rechazo técnico
                                <div className="text">
                                    {activity.rechazo_tecnico}
                                </div>
                            </h3>
                        </div>
                    ) : ""
                }
                {
                    activity.rechazo_especialista_sectorial && activity.rechazo_especialista_sectorial!=="" ?
                    (
                        <div className="hero error space-bellow">
                            <h3 className="error">
                                <FontAwesomeIcon icon="exclamation-triangle" />
                                Razón de rechazo especialista sectorial
                                <div className="text">
                                    {activity.rechazo_especialista_sectorial}
                                </div>
                            </h3>
                        </div>
                    ) : ""
                }
                <form onSubmit={onSubmit}>
                    <div className="hero space-bellow">
                        <div className="row file-input">
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
                        <ListadoDocumentos
                            id={props.match.params.id}
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
                                    inputProps={{ 'aria-label': 'Objetivo del proyecto y su alcance está bien definido: alcance, tiempo y costo.' }}
                                />
                                Objetivo del proyecto y su alcance está bien definido: alcance, tiempo y costo.
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
                                    inputProps={{ 'aria-label': ' Los beneficios del proyecto están claramente identificados y se pueden medir.' }}
                                />
                                Los beneficios del proyecto están claramente identificados y se pueden medir.
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
                                    inputProps={{ 'aria-label': ' La descripción o identificación cada una de las áreas o componentes del proyecto están completas.' }}
                                />
                                La descripción o identificación cada una de las áreas o componentes del proyecto están completas.
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
                                    inputProps={{ 'aria-label': ' El diseño del proyecto está completo en todo su alcance, no queda nada por definir para implementarlo.' }}
                                />
                                El diseño del proyecto está completo en todo su alcance, no queda nada por definir para implementarlo.
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
                                    inputProps={{ 'aria-label': 'Planos completos de todas las áreas de trabajo que demanda el proyecto.' }}
                                />
                                Planos completos de todas las áreas de trabajo que demanda el proyecto.
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
                                    inputProps={{ 'aria-label': 'Cálculos unitarios y globales  completos de los trabajos a realizar en cada actividad, no hany comisiones de cálculo o cálculos pendientes y están actualizados.' }}
                                />
                                Cálculos unitarios y globales  completos de los trabajos a realizar en cada actividad, no hany comisiones de cálculo o cálculos pendientes y están actualizados.
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
                                    inputProps={{ 'aria-label': 'Los costos están completos y actualizados.' }}
                                />
                                Los costos están completos y actualizados.
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
                                    inputProps={{ 'aria-label': 'Las especificaciones técnicas están completas y actualizadas' }}
                                />
                                Las especificaciones técnicas están completas y actualizadas
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
                                    inputProps={{ 'aria-label': 'El cronograma tentativo de implementación está identificado y definido.' }}
                                />
                                El cronograma tentativo de implementación está identificado y definido.
                            </label>
                        </div>
                        <div className="full">
                            <label htmlFor="checkedJ" className="switch">
                                <Switch
                                    checked={state.checkedJ}
                                    onChange={handleChange}
                                    color="primary"
                                    name="checkedJ"
                                    id="checkedJ"
                                    inputProps={{ 'aria-label': 'El mercado ha sido evaluado y existen potenciales oferentes' }}
                                />
                                El mercado ha sido evaluado y existen potenciales oferentes
                            </label>
                        </div>
                        <div className="full">
                            <label htmlFor="checkedK" className="switch">
                                <Switch
                                    checked={state.checkedK}
                                    onChange={handleChange}
                                    color="primary"
                                    name="checkedK"
                                    id="checkedK"
                                    inputProps={{ 'aria-label': 'Licencias y permisos ambiental están completos y debidamente autorizados' }}
                                />
                                Licencias y permisos ambiental están completos y debidamente autorizados
                            </label>
                        </div>
                        <div className="full">
                            <label htmlFor="checkedL" className="switch">
                                <Switch
                                    checked={state.checkedL}
                                    onChange={handleChange}
                                    color="primary"
                                    name="checkedL"
                                    id="checkedL"
                                    inputProps={{ 'aria-label': 'Propiedad de terrenos/inmuebles, si aplica, esta liberadoa/saneada' }}
                                />
                                Propiedad de terrenos/inmuebles, si aplica, esta liberadoa/saneada
                            </label>
                        </div>
                        <div className="full">
                            <label htmlFor="checkedM" className="switch">
                                <Switch
                                    checked={state.checkedM}
                                    onChange={handleChange}
                                    color="primary"
                                    name="checkedM"
                                    id="checkedM"
                                    inputProps={{ 'aria-label': 'Derechos de paso están otorgados y saneados.' }}
                                />
                                Derechos de paso están otorgados y saneados.
                            </label>
                        </div>
                        <div className="full">
                            <label htmlFor="checkedN" className="switch">
                                <Switch
                                    checked={state.checkedN}
                                    onChange={handleChange}
                                    color="primary"
                                    name="checkedN"
                                    id="checkedN"
                                    inputProps={{ 'aria-label': 'Las autoridades locales están enteradas de la realización del proyecto y se coordinó la implementación.' }}
                                />
                                Las autoridades locales están enteradas de la realización del proyecto y se coordinó la implementación.
                            </label>
                        </div>
                        <div className="full">
                            <label htmlFor="checkedO" className="switch"> 
                                <Switch
                                    checked={state.checkedO}
                                    onChange={handleChange}
                                    color="primary"
                                    name="checkedO"
                                    id="checkedO"
                                    inputProps={{ 'aria-label': 'La supervisión está contratada o estará contratada antes del inicio del proyecto' }}
                                />
                                La supervisión está contratada o estará contratada antes del inicio del proyecto
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