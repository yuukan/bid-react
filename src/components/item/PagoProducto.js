import React, { useState,useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';
import {LocalDate,DateTimeFormatter}  from "@js-joda/core";
import ListadoDocumentosCompletarProducto from './ListadoDocumentosCompletarProducto';
import Switch from '@material-ui/core/Switch';

export default function PagoProducto(props) {
    const [activity, setActivity] = useState(false);
    const [supervisores, setSupervisores] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [producto, setProducto] = useState(["",0]);
    const [supervisor, setSupervisor] = useState(0);
    
    const [state, setState] = useState({
        checkedA: false,
        checkedB: false,
        checkedC: false
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
        let q = state.checkedA + state.checkedB + state.checkedC;

        if(q ===3){
            swal({
                title: "!Marcar como pagado!",
                text: "¿Desea continuar?",
                icon: "warning",
                buttons: ["Cancelar", "Pagar"],
                dangerMode: true,
            })
                .then((certifico) => {
                    if (certifico) {
                        setDisabled(true);
                        axios.post(props.url + "api/pagar-producto",
                            {
                                id: producto[1],
                                user
                            }
                        )
                            .then(function () {
                                swal("Información", "¡Se ha marcado como pagado!", "info")
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

    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container">
                <h1>
                    Gestión de pago
                </h1>
                
                <h2>
                    {props.match.params.description}
                </h2>

                <h2>
                    Cronograma de entrega de productos
                </h2>

                <div className="hero space-bellow">
                    <div className="row rowlist">
                        <div className="fifth no-bg header">
                            Nombre
                        </div>
                        <div className="fifth no-bg header">
                            Fecha Entrega propuesta
                        </div>
                        <div className="fifth no-bg header">
                            Descripción
                        </div>
                        <div className="fifth no-bg header">
                            Fecha Aprobación
                        </div>
                    </div>
                    {
                        activity.cronograma ?
                        activity.cronograma.map((key, idx) => {
                            let d = LocalDate.parse(key[1]);
                            
                            if(key[5]===0 || key[6]!==3) return "";

                            return (
                                <div className="row rowlist" key={`cro${idx}`}>
                                    <div className="fifth no-bg">
                                        {key[0]}
                                    </div>
                                    <div className="fifth no-bg">
                                        {d.format(DateTimeFormatter.ofPattern('d/M/yyyy'))}
                                    </div>
                                    <div className="fifth no-bg">
                                        {key[2]}
                                    </div>
                                    <div className="fifth no-bg">
                                        {key[3]}
                                    </div>
                                    <div className="fifth no-bg no-padding">
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
                                        inputProps={{ 'aria-label': '1.	El contratista / consultor ha presentado su producto conforme el procedimiento de pago y la lista de documentación soporte previamente establecidos' }}
                                    />
                                    1.	El contratista / consultor ha presentado su producto conforme el procedimiento de pago y la lista de documentación soporte previamente establecidos
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
                                        inputProps={{ 'aria-label': '2.	Se dispone de presupuesto para el pago del producto / avance de obra' }}
                                    />
                                    2.	Se dispone de presupuesto para el pago del producto / avance de obra
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
                                        inputProps={{ 'aria-label': '3.	Se ha presentado factura de curso legal y válida/vigente' }}
                                    />
                                    3.	Se ha presentado factura de curso legal y válida/vigente
                                </label>
                            </div>

                            <div className="row">
                                <button type="button" className="save" onClick={approve} disabled={disabled}>
                                    <FontAwesomeIcon icon="money-check" /> Pagar
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