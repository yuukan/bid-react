import React, { useState,useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';
import {LocalDate,DateTimeFormatter}  from "@js-joda/core";
import ListadoDocumentosCompletarProducto from './ListadoDocumentosCompletarProducto';

import Switch from '@material-ui/core/Switch';

export default function AprobarProductoDirector(props) {
    const [activity, setActivity] = useState(false);
    const [supervisores, setSupervisores] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [producto, setProducto] = useState(["",0]);
    const [supervisor, setSupervisor] = useState(0);
    
    const [state, setState] = useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
        checkedD: false,
        checkedE: false,
        checkedF: false
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

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
        
       axios.post(props.url + "api/get-supervisor")
            .then(function (response) {
                setSupervisores(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [props]);

    const setSupervisorName = (id) => {
        for(let i=0;i<supervisores.length;i++){
            if(id===supervisores[i].id){
                setSupervisor(supervisores[i].name);
            }
        }
    }

    // Approve this plan
    const approve = () => {
        let user = localStorage.getItem("bidID");

        let q = state.checkedA + state.checkedB + state.checkedC + state.checkedD + state.checkedE + state.checkedF;

        if(q ===6){
            swal({
                title: "!Aprobación!",
                text: "¿Enviar aprobación?",
                icon: "warning",
                buttons: ["Cancelar", "Aprobar"],
                dangerMode: true,
            })
                .then((certifico) => {
                    if (certifico) {
                        setDisabled(true);
                        axios.post(props.url + "api/aprobacion-producto-director",
                            {
                                id: producto[1],
                                user
                            }
                        )
                            .then(function () {
                                swal("Información", "Se ha enviado la aprobación", "info")
                                    .then(() => {
                                        setDisabled(false);
                                        props.getProcesses();
                                        window.history.back()
                                    });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                });
        }else{
            swal("Alerta", "Debe de marcar todas las preguntas.", "error");
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
                axios.post(props.url + "api/rechazo-producto-director",
                    {
                        id: producto[1],
                        user,
                        razon
                    }
                )
                    .then(function () {
                        swal("Información", "Se ha enviado el rechazo.", "info")
                            .then(() => {
                                setDisabled(false);
                                props.getProcesses();
                                window.history.back()
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
            <div className="sub-container">
                <h1>
                    Aprobar el producto (director)
                </h1>
                
                <h2>
                    {props.match.params.description}
                </h2>

                <h2>
                    Cronograma de entrega de productos
                </h2>

                <div className="hero space-bellow">
                    <div className="row rowlist">
                        <div className="quarter no-bg header">
                            Nombre
                        </div>
                        <div className="quarter no-bg header">
                            Fecha Entrega propuesta
                        </div>
                        <div className="quarter no-bg header">
                            Descripción
                        </div>
                    </div>
                    {
                        activity.cronograma ?
                        activity.cronograma.map((key, idx) => {
                            let d = LocalDate.parse(key[1]);
                            
                            if(key[4]===0 || key[5]!==1) return "";

                            return (
                                <div className="row rowlist" key={`cro${idx}`}>
                                    <div className="quarter no-bg">
                                        {key[0]}
                                    </div>
                                    <div className="quarter no-bg">
                                        {d.format(DateTimeFormatter.ofPattern('d/M/yyyy'))}
                                    </div>
                                    <div className="quarter no-bg">
                                        {key[2]}
                                    </div>
                                    <div className="quarter no-bg no-padding">
                                        <button type="button" className="save" onClick={()=>{setProducto([key[0],key[4]]);}}>
                                            <FontAwesomeIcon icon="eye" />&nbsp;
                                            Ver detalle
                                        </button>
                                    </div>
                                </div>
                            )
                        }) : ""
                    }
                </div>


                {
                    producto[1]!==0 ?
                    (
                        <React.Fragment>
                            <h1 className="divider">
                                Información del producto: {producto[0]}
                            </h1>

                            <h2>
                                Documentos cargados
                            </h2>
                            <div className="hero space-bellow">
                                <ListadoDocumentosCompletarProducto
                                        id={producto[1]}
                                        tipo={props.match.params.tipo}
                                        url={props.url}
                                        urlDocs={props.urlDocs}
                                        delete={false}
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
                                        inputProps={{ 'aria-label': '1.	Corresponden a lo establecido a los Términos de Referencia' }}
                                    />
                                    1.	Corresponden a lo establecido a los Términos de Referencia
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
                                        inputProps={{ 'aria-label': '2.	Cuentan con la calidad técnica requerida en el contrato' }}
                                    />
                                    2.	Cuentan con la calidad técnica requerida en el contrato
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
                                        inputProps={{ 'aria-label': '3.	Ha sido entregado en el plazo establecido' }}
                                    />
                                    3.	Ha sido entregado en el plazo establecido
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
                                        inputProps={{ 'aria-label': '4.	Cuenta con toda la evidencia documental de soporte del pago' }}
                                    />
                                    4.	Cuenta con toda la evidencia documental de soporte del pago
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
                                        inputProps={{ 'aria-label': '5.	Cumple con el proceso determinado para recepción y aprobación de productos' }}
                                    />
                                    5.	Cumple con el proceso determinado para recepción y aprobación de productos
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
                                        inputProps={{ 'aria-label': '6.	El aprobador del producto es el establecido en los Términos de Referencia' }}
                                    />
                                    6.	El aprobador del producto es el establecido en los Términos de Referencia
                                </label>
                            </div>

                            <div className="row">
                                <button type="button" className="save" onClick={approve} disabled={disabled}>
                                    <FontAwesomeIcon icon="check" /> Aprobar
                                    <LinearProgress />
                                </button>
                                <button type="button" className="cancel" onClick={reject} disabled={disabled}>
                                    <FontAwesomeIcon icon="times" /> Rechazar
                                    <LinearProgress />
                                </button>
                            </div>
                        </React.Fragment>
                    ):""
                }

            </div>
        </div>
    );
}