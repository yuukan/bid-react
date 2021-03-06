import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ListadoDocumentos from './ListadoDocumentos';

import Switch from '@material-ui/core/Switch';

export default function AprobacionEspecialistaSectorial(props) {
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
        checkedN: false
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
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [props]);

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    // Approve this plan
    const approve = () => {
        let user = localStorage.getItem("bidID");

        let q = state.checkedA + state.checkedB + state.checkedC + state.checkedD + state.checkedE + state.checkedF + state.checkedG + state.checkedH + state.checkedI + state.checkedJ + state.checkedK + state.checkedL + state.checkedM + state.checkedN;


        if (
            (activity.cs_tipo_plan === 1 && q===14) || 
            (q===8 && (activity.cs_tipo_plan === 2 || activity.cs_tipo_plan === 3 || activity.cs_tipo_plan === 6)) || 
            (q===4 && activity.cs_tipo_plan === 4) ||
            (q===3 && activity.cs_tipo_plan === 5) 
        ) {
            axios.post(props.url + "api/aprobacion-especialista-sectorial",
                {
                    id: props.match.params.id,
                    user
                }
            )
                .then(function () {
                    swal("Informaci??n", "Certificaci??n completa", "info")
                        .then(() => {
                            props.getProcesses();
                            props.history.goBack();
                        });
                })
                .catch(function (error) {
                    console.log(error);
                });

        } else {
            swal("Atenci??n", "Debe de marcar todas las preguntas.", "error");
        }
    }

    const reject = () => {
        let user = localStorage.getItem("bidID");
        swal({
            text: '??Cu??l es la raz??n para el rechazo?',
            content: {
                element: "input",
            },
            button: {
                text: "Rechazar"
            },
            icon: "error",
        }).then((razon => {
            if (razon) {
                axios.post(props.url + "api/rechazo-especialista-sectorial",
                    {
                        id: props.match.params.id,
                        user,
                        razon
                    }
                )
                    .then(function () {
                        swal("Informaci??n", "Se ha enviado el rechazo.", "info")
                            .then(() => {
                                props.getProcesses();
                                props.history.goBack();
                            });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                swal("Informaci??n", "Debe de ingresar una raz??n para el rechazo.", "error")
            }
        }));
    }


    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container">
                <h1>
                    Aprobaci??n especialista sectorial
                </h1>
                <h2>
                    {props.match.params.description}
                </h2>

                <div className="hero space-bellow">
                    <ListadoDocumentos
                        id={props.match.params.id}
                        url={props.url}
                        urlDocs={props.urlDocs}
                    />
                </div>

                <div className="row">
                    <h2>
                        Completar Informaci??n
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
                                                inputProps={{ 'aria-label': '1.	??El proyecto es pertinente al programa, responde a un indicador de MR y est?? incluido en el PEP?' }}
                                            />
                                        1.	??El proyecto es pertinente al programa, responde a un indicador de MR y est?? incluido en el PEP?
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
                                                inputProps={{ 'aria-label': '2.	El alcance, plazo y costo referencial del proyecto han sido establecidos considerando todos los aspectos necesarios para su ??ptimo funcionamiento?' }}
                                            />
                                        2.	El alcance, plazo y costo referencial del proyecto han sido establecidos considerando todos los aspectos necesarios para su ??ptimo funcionamiento?
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
                                                inputProps={{ 'aria-label': '3.	??La tecnolog??a propuesta es adecuada y no contraviene los principios y/o pol??ticas sectoriales del Banco u otros est??ndares del sector?' }}
                                            />
                                        3.	??La tecnolog??a propuesta es adecuada y no contraviene los principios y/o pol??ticas sectoriales del Banco u otros est??ndares del sector?
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
                                                inputProps={{ 'aria-label': '4.	Los planos constructivos y las cantidades de los renglones de trabajo unitarios y globales incluyen la totalidad de las ??reas del proyecto, y su informaci??n es correspondiente entre s???' }}
                                            />
                                        4.	Los planos constructivos y las cantidades de los renglones de trabajo unitarios y globales incluyen la totalidad de las ??reas del proyecto, y su informaci??n es correspondiente entre s???
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
                                                inputProps={{ 'aria-label': '5.	??Los elementos que componen el dise??o del proyecto cuentan con los c??lculos respectivos (estructuras, instalaciones, etc??tera? ' }}
                                            />
                                        5.	??Los elementos que componen el dise??o del proyecto cuentan con los c??lculos respectivos (estructuras, instalaciones, etc??tera?
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
                                                inputProps={{ 'aria-label': '6.	??Los costos est??n completos y actualizados, no existen omisiones, se basan en precios de mercado? ??Se ha realizado un an??lisis del mercado y se ha determinado que existen empresas calificadas para realizar este proyecto?' }}
                                            />
                                        6.	??Los costos est??n completos y actualizados, no existen omisiones, se basan en precios de mercado? ??Se ha realizado un an??lisis del mercado y se ha determinado que existen empresas calificadas para realizar este proyecto?
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
                                                inputProps={{ 'aria-label': '7.	??Las especificaciones t??cnicas est??n completas y responden a las necesidades actuales del proyecto?' }}
                                            />
                                        7.	??Las especificaciones t??cnicas est??n completas y responden a las necesidades actuales del proyecto?
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
                                                inputProps={{ 'aria-label': '8.	??El cronograma de construcci??n de la obra es detallado y se basa en hitos? ??el plazo total de la construcci??n est?? dentro de la vigencia del Programa?' }}
                                            />
                                        8.	??El cronograma de construcci??n de la obra es detallado y se basa en hitos? ??el plazo total de la construcci??n est?? dentro de la vigencia del Programa?
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
                                                inputProps={{ 'aria-label': '9.	??El ejecutor cuenta con las licencias/permisos de construcci??n o ambientales y est??n debidamente autorizados?' }}
                                            />
                                        9.	??El ejecutor cuenta con las licencias/permisos de construcci??n o ambientales y est??n debidamente autorizados?
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
                                                inputProps={{ 'aria-label': '10.	Las condiciones legales de propiedad de los terrenos/inmuebles, si aplica, permiten que se inicien las obras de manera inmediata?' }}
                                            />
                                        10.	Las condiciones legales de propiedad de los terrenos/inmuebles, si aplica, permiten que se inicien las obras de manera inmediata?
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
                                                inputProps={{ 'aria-label': '11.	??El ejecutor demuestra contar con los derechos de paso necesarios para iniciar las obras?' }}
                                            />
                                            11.	??El ejecutor demuestra contar con los derechos de paso necesarios para iniciar las obras?
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
                                                inputProps={{ 'aria-label': '12.	??El ejecutor coordin?? con las autoridades locales la ejecuci??n del proyecto?' }}
                                            />
                                            12.	??El ejecutor coordin?? con las autoridades locales la ejecuci??n del proyecto?
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
                                                inputProps={{ 'aria-label': '13.	??Se ha considerado contratar la supervisi??n antes del inicio del proyecto?' }}
                                            />
                                            13.	??Se ha considerado contratar la supervisi??n antes del inicio del proyecto?
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
                                                inputProps={{ 'aria-label': '14.	??Los criterios de evaluaci??n t??cnica est??n claros, son objetivos, verificables y cumplibles? ' }}
                                            />
                                            14.	??Los criterios de evaluaci??n t??cnica est??n claros, son objetivos, verificables y cumplibles? 
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
                                                inputProps={{ 'aria-label': '1.	??Los bienes o servicios son pertinente al programa, responde a un indicador de MR y est?? incluido en el PEP?' }}
                                            />
                                            1.	??Los bienes o servicios son pertinente al programa, responde a un indicador de MR y est?? incluido en el PEP?
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
                                                inputProps={{ 'aria-label': '2.	Las especificaciones t??cnicas de los bienes o servicios est??n completos y actualizados.' }}
                                            />
                                            2.	Las especificaciones t??cnicas de los bienes o servicios est??n completos y actualizados.
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
                                                inputProps={{ 'aria-label': '3.	La tecnolog??a propuesta es adecuada y actual y no contraviene los principios y/o pol??ticas sectoriales del Banco u otros est??ndares del sector?' }}
                                            />
                                            3.	La tecnolog??a propuesta es adecuada y actual y no contraviene los principios y/o pol??ticas sectoriales del Banco u otros est??ndares del sector?
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
                                                inputProps={{ 'aria-label': '4.	??El mercado ha sido evaluado y existen potenciales proponentes?' }}
                                            />
                                            4.	??El mercado ha sido evaluado y existen potenciales proponentes?
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
                                                inputProps={{ 'aria-label': '5.	??El cronograma de entrega es razonable y se ejecuta dentro del plazo de desembolso vigente del Programa?' }}
                                            />
                                            5.	??El cronograma de entrega es razonable y se ejecuta dentro del plazo de desembolso vigente del Programa?
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
                                                inputProps={{ 'aria-label': '6.	??El mercado ha sido evaluado por el ejecutor y existen potenciales oferentes?' }}
                                            />
                                            6.	??El mercado ha sido evaluado por el ejecutor y existen potenciales oferentes?
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
                                                inputProps={{ 'aria-label': '7.	??Se ha considerado contratar la supervisi??n previamente a la provisi??n de bienes o servicios?' }}
                                            />
                                            7.	??Se ha considerado contratar la supervisi??n previamente a la provisi??n de bienes o servicios?
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
                                                inputProps={{ 'aria-label': '8.	??Los criterios de evaluaci??n t??cnica est??n claros, son objetivos, verificables y cumplibles? ' }}
                                            />
                                            8.	??Los criterios de evaluaci??n t??cnica est??n claros, son objetivos, verificables y cumplibles? 
                                        </label>
                                    </div>
                                </React.Fragment>
                            ) :
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
                                                inputProps={{ 'aria-label': '1.	??La consultor??a a realizar est?? incluida en el Plan de Ejecuci??n del Proyecto vigente y vinculado a un indicador de producto del programa, seg??n Matriz de Resultados (MR)?' }}
                                            />
                                            1.	??La consultor??a a realizar est?? incluida en el Plan de Ejecuci??n del Proyecto vigente y vinculado a un indicador de producto del programa, seg??n Matriz de Resultados (MR)?
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
                                                inputProps={{ 'aria-label': '2.	??Los TdR???s est??n definido de manera clara y completa (perfil de la firma consultora, productos, actividades, supervisor/aprobador, criterios de evaluaci??n, etc??tera)?' }}
                                            />
                                            2.	??Los TdR???s est??n definido de manera clara y completa (perfil de la firma consultora, productos, actividades, supervisor/aprobador, criterios de evaluaci??n, etc??tera)?
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
                                                inputProps={{ 'aria-label': '3.	??Los honorarios incluyen todos los gastos necesarios para realizar la consultor??a, corresponden a montos de mercado?' }}
                                            />
                                            3.	??Los honorarios incluyen todos los gastos necesarios para realizar la consultor??a, corresponden a montos de mercado?
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
                                                inputProps={{ 'aria-label': '4.	??El mercado ha sido evaluado y existen potenciales proponentes?' }}
                                            />
                                            4.	??El mercado ha sido evaluado y existen potenciales proponentes?
                                        </label>
                                    </div>
                                </React.Fragment>
                            ) : 
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
                                                inputProps={{ 'aria-label': '1.	??La consultor??a a realizar est?? incluida en el Plan de Ejecuci??n del Proyecto vigente y vinculado a un indicador de producto del programa, seg??n Matriz de Resultados (MR)?' }}
                                            />
                                            1.	??La consultor??a a realizar est?? incluida en el Plan de Ejecuci??n del Proyecto vigente y vinculado a un indicador de producto del programa, seg??n Matriz de Resultados (MR)?
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
                                                inputProps={{ 'aria-label': '2.	??Los TdR???s est??n definido de manera clara y completa (perfil de la firma consultora, productos, actividades, supervisor/aprobador, criterios de evaluaci??n, etc??tera)?' }}
                                            />
                                            2.	??Los TdR???s est??n definido de manera clara y completa (perfil de la firma consultora, productos, actividades, supervisor/aprobador, criterios de evaluaci??n, etc??tera)?
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
                                                inputProps={{ 'aria-label': '3.	??Los honorarios incluyen todos los gastos necesarios para realizar la consultor??a, corresponden a montos de mercado?' }}
                                            />
                                            3.	??Los honorarios incluyen todos los gastos necesarios para realizar la consultor??a, corresponden a montos de mercado?
                                        </label>
                                    </div>
                                </React.Fragment>
                            ) : ""
                    }



                    <div className="full">
                        <button type="button" className="save" onClick={approve}>
                            <FontAwesomeIcon icon="save" /> Aprobar
                        </button>
                        <button type="button" className="cancel" onClick={reject}>
                            <FontAwesomeIcon icon="times" /> Rechazar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}