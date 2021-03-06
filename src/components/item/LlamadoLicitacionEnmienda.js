import React, { useState,useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';
import ListadoDocumentosLicitacion from './ListadoDocumentosLicitacion';

import Switch from '@material-ui/core/Switch';

export default function LlamadoLicitacionEnmienda(props) {
    const [pod, setPod] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [activity, setActivity] = useState(false);

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
    const [state2, setState2] = useState({
        nog: "",
        recepcion_ofertas:"",
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
                setState2({ ...state2, nog: response.data[0].nog, recepcion_ofertas: response.data[0].recepcion_ofertas, conclusion_evaluacion: response.data[0].conclusion_evaluacion });
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [props]);

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
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
            axios.post(props.url + "api/upload-item-licitacion-documents", data)
                .then(function () {
                    setDisabled(false);
                    swal("??xito", "!Documentos Cargados!", "success");
                    setPod(null);
                    e.target.reset();
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            swal("Atenci??n", "!Debe de seleccionar Archivos!", "error");
        }
        return false;
    };
    //####################################Completar Informaci??n#########################################
    const complete_info = () => {
        if(state.nog==="" || state.conclusion_evaluacion==="" || state.conclusion_evaluacion===""){
            swal("Alerta", "Debe de ingresar el NOG, fecha de conclusieon de evaluaci??n y fecha de recepci??n de ofertas.", "error");
        }else if (state.checkedA && state.checkedB && state.checkedC && state.checkedD && state.checkedE && state.checkedF && state.checkedG && state.checkedH && state.checkedI && state.checkedJ && state.checkedK && state.checkedL && state.checkedM && state.checkedN && state.checkedO) {
            let s = state2;
            swal({
                title: "??Completar Informaci??n de la enmienda?",
                text: "Mandaremos los documentos a Aprobaci??n.",
                icon: "warning",
                buttons: ["Cancelar", "Enviar"],
                dangerMode: true,
            })
                .then((certifico) => {
                    if (certifico) {
                        let user = localStorage.getItem("bidID");
                        axios.post(props.url + "api/completar-archivos-licitacion-item-enmienda",
                            {
                                id: props.match.params.id,
                                user,
                                nog: s.nog,
                                recepcion_ofertas: s.recepcion_ofertas,
                                conclusion_evaluacion: s.conclusion_evaluacion
                            }
                        )
                            .then(function () {
                                props.history.push("/enmiendas/");
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

    let description = activity.solicitud_enmienda;

    if(activity)
    switch(activity.cs_estado_proceso_id){
        case(40):
            description += "<br><br> <strong>Rechazo:</strong> " + activity.rechazo_certificacion_director_enmienda;
            break;
        case(42):
            description += "<br><br> <strong>Rechazo:</strong> " + activity.rechazo_certificacion_tecnica_licitacion_enmienda;
            break;
        case(44):
            description += "<br><br> <strong>Rechazo:</strong> " + activity.rechazo_concepto_obligatorio_licitacion_enmienda;
            break;
        case(46):
            description += "<br><br> <strong>Rechazo:</strong> " + activity.rechazo_final_licitacion_enmienda;
            break;
        default:
            break;
    }

    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container">
                <h1>
                    Llamado a Licitaci??n
                </h1>
                {
                    description!=="" ?
                    (
                        <div className="hero error space-bellow">
                            <h3 className="error">
                                <FontAwesomeIcon icon="exclamation-triangle" />
                                Solicitud de Enmienda
                                <div className="text">
                                    Raz??n: <span dangerouslySetInnerHTML={{__html: description}} />
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
                                    NOG
                                </label>
                                <input
                                    type="number"
                                    name="nog"
                                    id="nog"
                                    value={state2.nog}
                                    onChange={handleChange2}
                                />
                            </div>
                            <div className="half">
                                <label htmlFor="fecha_firma">
                                    Fecha de Recepci??n de ofertas
                                </label>
                                <input
                                    type="date"
                                    name="recepcion_ofertas"
                                    id="recepcion_ofertas"
                                    value={state2.recepcion_ofertas}
                                    onChange={handleChange2}
                                />
                            </div>
                            <div className="half">
                                <label htmlFor="fecha_firma">
                                    Fecha de conclusi??n de evaluaci??n
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
                            <h4>
                                Subir documento de Licitaci??n
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
                                <ListadoDocumentosLicitacion
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
                        <h2>
                            Completar Informaci??n
                        </h2>
                        <div className="full">
                            <label htmlFor="checkedA" className="switch">
                                <Switch
                                    checked={state.checkedA}
                                    onChange={handleChange}
                                    color="primary"
                                    name="checkedA"
                                    id="checkedA"
                                    inputProps={{ 'aria-label': 'Objetivo del proyecto y su alcance est?? bien definido: alcance, tiempo y costo.' }}
                                />
                                Objetivo del proyecto y su alcance est?? bien definido: alcance, tiempo y costo.
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
                                    inputProps={{ 'aria-label': ' Los beneficios del proyecto est??n claramente identificados y se pueden medir.' }}
                                />
                                Los beneficios del proyecto est??n claramente identificados y se pueden medir.
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
                                    inputProps={{ 'aria-label': ' La descripci??n o identificaci??n cada una de las ??reas o componentes del proyecto est??n completas.' }}
                                />
                                La descripci??n o identificaci??n cada una de las ??reas o componentes del proyecto est??n completas.
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
                                    inputProps={{ 'aria-label': ' El dise??o del proyecto est?? completo en todo su alcance, no queda nada por definir para implementarlo.' }}
                                />
                                El dise??o del proyecto est?? completo en todo su alcance, no queda nada por definir para implementarlo.
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
                                    inputProps={{ 'aria-label': 'Planos completos de todas las ??reas de trabajo que demanda el proyecto.' }}
                                />
                                Planos completos de todas las ??reas de trabajo que demanda el proyecto.
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
                                    inputProps={{ 'aria-label': 'C??lculos unitarios y globales ??completos de los trabajos a realizar en cada actividad, no hany comisiones de c??lculo o c??lculos pendientes y est??n actualizados.' }}
                                />
                                C??lculos unitarios y globales ??completos de los trabajos a realizar en cada actividad, no hany comisiones de c??lculo o c??lculos pendientes y est??n actualizados.
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
                                    inputProps={{ 'aria-label': 'Los costos est??n completos y actualizados.' }}
                                />
                                Los costos est??n completos y actualizados.
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
                                    inputProps={{ 'aria-label': 'Las especificaciones t??cnicas est??n completas y actualizadas' }}
                                />
                                Las especificaciones t??cnicas est??n completas y actualizadas
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
                                    inputProps={{ 'aria-label': 'El cronograma tentativo de implementaci??n est?? identificado y definido.' }}
                                />
                                El cronograma tentativo de implementaci??n est?? identificado y definido.
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
                                    inputProps={{ 'aria-label': 'Licencias y permisos ambiental est??n completos y debidamente autorizados' }}
                                />
                                Licencias y permisos ambiental est??n completos y debidamente autorizados
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
                                    inputProps={{ 'aria-label': 'Derechos de paso est??n otorgados y saneados.' }}
                                />
                                Derechos de paso est??n otorgados y saneados.
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
                                    inputProps={{ 'aria-label': 'Las autoridades locales est??n enteradas de la realizaci??n del proyecto y se coordin?? la implementaci??n.' }}
                                />
                                Las autoridades locales est??n enteradas de la realizaci??n del proyecto y se coordin?? la implementaci??n.
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
                                    inputProps={{ 'aria-label': 'La supervisi??n est?? contratada o estar?? contratada antes del inicio del proyecto' }}
                                />
                                La supervisi??n est?? contratada o estar?? contratada antes del inicio del proyecto
                            </label>
                        </div>
                        
                        <button type="button" className="completar-informacion" disabled={disabled} onClick={complete_info}>
                            <FontAwesomeIcon icon="save" /> Completar Informaci??n Enmienda
                            <LinearProgress />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}