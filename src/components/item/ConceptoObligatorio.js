import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';
import LinearProgress from '@material-ui/core/LinearProgress';

//Components
import ListadoDocumentosBaseSubidos from './ListadoDocumentosBaseSubidos';
import Switch from '@material-ui/core/Switch';
import ListadoDocumentosConceptoObligatorio from './ListadoDocumentosConceptoObligatorio';

export default function ConceptoObligatorio(props) {

    const [plan, setPlan] = useState(null);
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
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if (props && props.processes) {
            let plan = props.processes.find((key) => parseInt(key.id) === parseInt(props.match.params.id))
            setPlan(plan);
        }
    }, [props]);

    // Approve this plan
    const approve = () => {
        let user = localStorage.getItem("bidID");
        if (
            state.checkedA 
            && state.checkedB 
            && state.checkedC 
            && state.checkedD 
            && state.checkedE 
            && state.checkedF
            && state.checkedG
            && state.checkedH
            && state.checkedI
        ) {
            swal({
                text: 'Ingrese el Concepto Obligatorio',
                content: {
                    element: "input",
                },
                button: {
                    text: "Enviar"
                },
                icon: "success",
            }).then((razon => {
                if (razon) {
                    setDisabled(true);
                    axios.post(props.url + "api/si-concepto-obligatorio-item",
                        {
                            id: props.match.params.id,
                            user,
                            razon
                        }
                    )
                        .then(function () {
                            setDisabled(false);
                            swal("Información", "Se ha enviado el Concepto Obligatorio a aprobación", "info")
                                .then(() => {
                                    props.getProcesses();
                                    props.history.goBack();
                                });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    swal("Información", "Debe de ingresar el Concepto Obligatorio.", "error")
                }
            }));

        } else {
            swal("Alerta", "Debe de marcar las preguntas.", "error");
        }
    }

    const reject = () => {
        let user = localStorage.getItem("bidID");
        swal({
            text: '¿Cuál es la razón para el rechazo?',
            content: {
                element: "input",
            },
            button: {
                text: "Rechazar"
            },
            icon: "error",
        }).then((razon => {
            if (razon) {
                setDisabled(true);
                axios.post(props.url + "api/no-concepto-obligatorio-item",
                    {
                        id: props.match.params.id,
                        user,
                        razon
                    }
                )
                    .then(function () {
                        setDisabled(false);
                        swal("Información", "Se ha enviado el rechazo.", "info")
                            .then(() => {
                                props.getProcesses();
                                props.history.goBack();
                            });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                swal("Información", "Debe de ingresar una razón para el rechazo.", "error")
            }
        }));
    }


    //####################################Return####################################
    return (
        <div className="crear-container">

            <div className="sub-container space-bellow">
                <div className="row">
                    <h1>
                        Concepto Obligatorio
                    </h1>
                    <h2>
                        {props.match.params.description}
                    </h2>
                    
                    
                    <div className="hero space-bellow">
                        <ListadoDocumentosBaseSubidos
                                id={props.match.params.id}
                                url={props.url}
                                urlDocs={props.urlDocs}
                            />
                    </div>

                    <div className="full">
                        <ListadoDocumentosConceptoObligatorio
                            id={props.match.params.id}
                            tipo={props.match.params.tipo}
                            url={props.url}
                            urlDocs={props.urlDocs}
                            delete={true}
                            cs_estado_proceso_id={22}
                            type={1}
                        />
                    </div>

                    <div className="full">
                        <label htmlFor="checkedA" className="switch">
                            <Switch
                                checked={state.checkedA}
                                onChange={handleChange}
                                color="primary"
                                name="checkedA"
                                id="checkedA"
                                inputProps={{ 'aria-label': '1. ¿El proceso está en plan de Adquisiciones aprobado?' }}
                            />
                            1. ¿El proceso está en plan de Adquisiciones aprobado?
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
                                inputProps={{ 'aria-label': '3. ¿Los documentos estándar o acordados con el Banco no han sido modificados?' }}
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
                                inputProps={{ 'aria-label': '4. ¿Los requisitos solicitados a los potenciales oferentes no contravienen las políticas del Banco?' }}
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
                                inputProps={{ 'aria-label': '8. ¿Los criterios de evaluación son claros, objetivos y objetivos?' }}
                            />
                            8. ¿Los criterios de evaluación son claros, objetivos y objetivos?
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

                    <div className="full">
                        <button type="button" className="save" onClick={approve} disabled={disabled}>
                            <FontAwesomeIcon icon="save" /> Aprobar
                            <LinearProgress />
                        </button>
                        <button type="button" className="cancel" onClick={reject} disabled={disabled}>
                            <FontAwesomeIcon icon="times" /> Rechazar
                            <LinearProgress />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}