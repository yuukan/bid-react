import React, { useState, useEffect } from 'react';
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
        checkedK: false
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    //####################################Save Profile####################################
    const onSubmit = (e) => {
        e.preventDefault();
        if (pod) {
            const data = new FormData()
            for (let i = 0; i < pod.length; i++) {
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

        let q = state.checkedA + state.checkedB + state.checkedC + state.checkedD + state.checkedE + state.checkedF + state.checkedG + state.checkedH + state.checkedI + state.checkedJ + state.checkedK;

        if  (
                (q===11 && activity.cs_tipo_plan === 1) ||
                (q===10 && (activity.cs_tipo_plan === 2 || activity.cs_tipo_plan === 3 || activity.cs_tipo_plan === 6)) ||
                (q===6 && activity.cs_tipo_plan === 4) ||
                (q===3 && activity.cs_tipo_plan === 5) 
            ) {
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
            swal("Alerta", "Debe de marcar todas las preguntas.", "error");
        }
    }
    //####################################Change File Handler####################################
    const onChangeHandler = event => {
        if (event.target.name === "pod") {
            let fls = [];
            for (let i = 0; i < event.target.files.length; i++) {
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
                    activity.rechazo_tecnico && activity.rechazo_tecnico !== "" ?
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
                    activity.rechazo_especialista_sectorial && activity.rechazo_especialista_sectorial !== "" ?
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
                                        pod ? pod.length + " archivos seleccionados" : "Seleccione un Archivo"
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
                        {
                            activity && activity.cs_tipo_plan === 1 ?
                            (
                                <React.Fragment>
                                    <div className="full">
                                        <label htmlFor="checkedA" className="switch">
                                            <Switch
                                                checked={state.checkedA}
                                                onChange={handleChange}
                                                color="primary"
                                                name="checkedA"
                                                id="checkedA"
                                                inputProps={{ 'aria-label': '1.	¿El proyecto está incluido en el Plan de Ejecución del Proyecto vigente y vinculado a un indicador de producto del programa, según Matriz de Resultados (MR)?' }}
                                            />
                                            1.	¿El proyecto está incluido en el Plan de Ejecución del Proyecto vigente y vinculado a un indicador de producto del programa, según Matriz de Resultados (MR)?
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
                                                inputProps={{ 'aria-label': '2.	¿El alcance, plazo y costo referencial del proyecto han sido establecidos considerando todos los aspectos necesarios para su óptimo funcionamiento?' }}
                                            />
                                            2.	¿El alcance, plazo y costo referencial del proyecto han sido establecidos considerando todos los aspectos necesarios para su óptimo funcionamiento? 
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
                                                inputProps={{ 'aria-label': '3.	¿Los elementos que componen el diseño del proyecto cuentan con los cálculos respectivos (estructuras, instalaciones, etcétera?' }}
                                            />
                                            3.	¿Los elementos que componen el diseño del proyecto cuentan con los cálculos respectivos (estructuras, instalaciones, etcétera? 
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
                                                inputProps={{ 'aria-label': '4.	¿Los planos constructivos y las cantidades de los renglones de trabajo unitarios y globales incluyen la totalidad de las áreas del proyecto y su información es correspondiente entre sí?' }}
                                            />
                                            4.	¿Los planos constructivos y las cantidades de los renglones de trabajo unitarios y globales incluyen la totalidad de las áreas del proyecto y su información es correspondiente entre sí?
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
                                                inputProps={{ 'aria-label': '5.	¿Los costos están completos y actualizados, no existen omisiones, se basan en precios de mercado? ¿Se ha realizado un análisis del mercado y se ha determinado que existen empresas calificadas para realizar este proyecto?' }}
                                            />
                                            5.	¿Los costos están completos y actualizados, no existen omisiones, se basan en precios de mercado? ¿Se ha realizado un análisis del mercado y se ha determinado que existen empresas calificadas para realizar este proyecto?
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
                                                inputProps={{ 'aria-label': '6.	¿El cronograma de construcción de la obra es detallado y se basa en hitos?  ¿el plazo total de la construcción está dentro de la vigencia del Programa?' }}
                                            />
                                            6.	¿El cronograma de construcción de la obra es detallado y se basa en hitos?  ¿el plazo total de la construcción está dentro de la vigencia del Programa?
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
                                                inputProps={{ 'aria-label': '7.	¿Se cuenta con derechos de paso, documentación legal de propiedad de los terrenos; permisos (licencias) de construcción y ambientales que habiliten el inicio de la construcción?' }}
                                            />
                                            7.	¿Se cuenta con derechos de paso, documentación legal de propiedad de los terrenos; permisos (licencias) de construcción y ambientales que habiliten el inicio de la construcción?
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
                                                inputProps={{ 'aria-label': '8.	¿Las autoridades locales / organizaciones comunitarias están enteradas de la realización del proyecto y son parte de la coordinación de la implementación?' }}
                                            />
                                            8.	¿Las autoridades locales / organizaciones comunitarias están enteradas de la realización del proyecto y son parte de la coordinación de la implementación?
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
                                                inputProps={{ 'aria-label': '9.	¿El diseño del proyecto contempla aspectos de mantenimiento y sostenibilidad?' }}
                                            />
                                            9.	¿El diseño del proyecto contempla aspectos de mantenimiento y sostenibilidad?
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
                                                inputProps={{ 'aria-label': '10 ¿La supervisión de la construcción está prevista claramente desde el diseño y es idónea para el tipo de proyecto?' }}
                                            />
                                            10.	¿La supervisión de la construcción está prevista claramente desde el diseño y es idónea para el tipo de proyecto? 
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
                                                inputProps={{ 'aria-label': '11. ¿Los criterios de evaluación técnica de los oferentes están claros, son objetivos, verificables y cumplibles? ¿El perfil de la empresa que tendrá a su cargo la construcción, es idóneo para el tipo de obra?' }}
                                            />
                                            11.	¿Los criterios de evaluación técnica de los oferentes están claros, son objetivos, verificables y cumplibles? ¿El perfil de la empresa que tendrá a su cargo la construcción, es idóneo para el tipo de obra?
                                        </label>
                                    </div>
                                </React.Fragment>
                            ) : 
                            
                            activity.cs_tipo_plan === 2 || activity.cs_tipo_plan === 3 || activity.cs_tipo_plan === 6 ?
                            (
                                <React.Fragment>
                                    <div className="full">
                                        <label htmlFor="checkedA" className="switch">
                                            <Switch
                                                checked={state.checkedA}
                                                onChange={handleChange}
                                                color="primary"
                                                name="checkedA"
                                                id="checkedA"
                                                inputProps={{ 'aria-label': '1.	¿Los bienes o servicios están incluidos en el Plan de Ejecución del Proyecto vigente y vinculado a un indicador de producto del programa, según Matriz de Resultados (MR)?' }}
                                            />
                                            1.	¿Los bienes o servicios están incluidos en el Plan de Ejecución del Proyecto vigente y vinculado a un indicador de producto del programa, según Matriz de Resultados (MR)?
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
                                                inputProps={{ 'aria-label': '2.	¿Las especificaciones técnicas de los bienes están definidas de manera completa no presentan omisiones?' }}
                                            />
                                            2.	¿Las especificaciones técnicas de los bienes están definidas de manera completa no presentan omisiones? 
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
                                                inputProps={{ 'aria-label': '3.	¿La tecnología es adecuada y actual y no hace referencia a marcas ni a estándares específicos del mercado?' }}
                                            />
                                            3.	¿La tecnología es adecuada y actual y no hace referencia a marcas ni a estándares específicos del mercado?
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
                                                inputProps={{ 'aria-label': '4.	¿Los costos referenciales están completos y actualizados, no existen omisiones?' }}
                                            />
                                            4.	¿Los costos referenciales están completos y actualizados, no existen omisiones?
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
                                                inputProps={{ 'aria-label': '5.	¿El mantenimiento, si corresponde, está previsto?' }}
                                            />
                                            5.	¿El mantenimiento, si corresponde, está previsto?
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
                                                inputProps={{ 'aria-label': '6.	¿El entrenamiento a los usuarios/operarios de los bienes o servicios, si corresponde, está previsto?' }}
                                            />
                                            6.	¿El entrenamiento a los usuarios/operarios de los bienes o servicios, si corresponde, está previsto?
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
                                                inputProps={{ 'aria-label': '7.	¿El mercado ha sido evaluado y existen potenciales oferentes para la provisión del bien o servicio?' }}
                                            />
                                            7.	¿El mercado ha sido evaluado y existen potenciales oferentes para la provisión del bien o servicio?
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
                                                inputProps={{ 'aria-label': '8.	¿Los criterios de instalación, prueba, almacenaje, derechos de propiedad y lugar de instalación están definidos?' }}
                                            />
                                            8.	¿Los criterios de instalación, prueba, almacenaje, derechos de propiedad y lugar de instalación están definidos? 
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
                                                inputProps={{ 'aria-label': '9.	¿La supervisión de la instalación está prevista claramente desde el diseño?' }}
                                            />
                                            9.	¿La supervisión de la instalación está prevista claramente desde el diseño? 
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
                                                inputProps={{ 'aria-label': '10 ¿La supervisión de la construcción está prevista claramente desde el diseño y es idónea para el tipo de proyecto?' }}
                                            />
                                            10.	¿Los procedimientos / criterios de recepción de bienes o servicios están definidos?
                                        </label>
                                    </div>
                                </React.Fragment>
                            ):
                            activity.cs_tipo_plan === 4 ?
                            (
                                <React.Fragment>
                                    <div className="full">
                                        <label htmlFor="checkedA" className="switch">
                                            <Switch
                                                checked={state.checkedA}
                                                onChange={handleChange}
                                                color="primary"
                                                name="checkedA"
                                                id="checkedA"
                                                inputProps={{ 'aria-label': '1.	¿La consultoría a realizar está incluida en el Plan de Ejecución del Proyecto vigente y vinculado a un indicador de producto del programa, según Matriz de Resultados (MR)?' }}
                                            />
                                            1.	¿La consultoría a realizar está incluida en el Plan de Ejecución del Proyecto vigente y vinculado a un indicador de producto del programa, según Matriz de Resultados (MR)?
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
                                                inputProps={{ 'aria-label': '2.	¿Los TdR’s están definidos de manera clara y completa (perfil de la firma consultora, productos, actividades, supervisor/aprobador, criterios de evaluación, etcétera)?' }}
                                            />
                                            2.	¿Los TdR’s están definidos de manera clara y completa (perfil de la firma consultora, productos, actividades, supervisor/aprobador, criterios de evaluación, etcétera)?
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
                                                inputProps={{ 'aria-label': '3.	¿Los productos a entregar están claramente identificados? ' }}
                                            />
                                            3.	¿Los productos a entregar están claramente identificados? 
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
                                                inputProps={{ 'aria-label': '4.	¿Los honorarios incluyen todos los gastos necesarios para realizar la consultoría, corresponden a montos de mercado?' }}
                                            />
                                            4.	¿Los honorarios incluyen todos los gastos necesarios para realizar la consultoría, corresponden a montos de mercado?
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
                                                inputProps={{ 'aria-label': '5.	¿El mercado ha sido evaluado y existen potenciales proponentes?' }}
                                            />
                                            5.	¿El mercado ha sido evaluado y existen potenciales proponentes?
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
                                                inputProps={{ 'aria-label': '6.	¿Los criterios de evaluación están definidos de manera objetiva? ' }}
                                            />
                                            6.	¿Los criterios de evaluación están definidos de manera objetiva? 
                                        </label>
                                    </div>
                                </React.Fragment>
                            ):
                            activity.cs_tipo_plan === 5 ?
                            (
                                <React.Fragment>
                                    <div className="full">
                                        <label htmlFor="checkedA" className="switch">
                                            <Switch
                                                checked={state.checkedA}
                                                onChange={handleChange}
                                                color="primary"
                                                name="checkedA"
                                                id="checkedA"
                                                inputProps={{ 'aria-label': '1.	¿La consultoría a realizar está incluida en el Plan de Ejecución del Proyecto vigente y vinculado a un indicador de producto del programa, según Matriz de Resultados (MR)?' }}
                                            />
                                            1.	¿La consultoría a realizar está incluida en el Plan de Ejecución del Proyecto vigente y vinculado a un indicador de producto del programa, según Matriz de Resultados (MR)?
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
                                                inputProps={{ 'aria-label': '2.	¿Los TdR’s están definidos de manera clara y completa (perfil de consultor, productos, actividades, supervisor/aprobador, criterios de evaluación, etcétera)?' }}
                                            />
                                            2.	¿Los TdR’s están definidos de manera clara y completa (perfil de consultor, productos, actividades, supervisor/aprobador, criterios de evaluación, etcétera)?
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
                                                inputProps={{ 'aria-label': '3.	¿Los honorarios incluyen todos los gastos necesarios para realizar la consultoría, corresponden a montos de mercado?' }}
                                            />
                                            3.	¿Los honorarios incluyen todos los gastos necesarios para realizar la consultoría, corresponden a montos de mercado?
                                        </label>
                                    </div>
                                </React.Fragment>
                            ): ""
                        }

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