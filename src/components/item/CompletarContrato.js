import React, { useState,useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';
import {LocalDate,DateTimeFormatter}  from "@js-joda/core";
import ListadoDocumentosGarantia from './ListadoDocumentosGarantia';

export default function CompletarContrato(props) {
    const [cronograma,setCronograma] = useState([]);
    const [activity, setActivity] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const [state2, setState2] = useState({
        nombre_contratista: "",
        fecha_firma_contrato:"",
        objeto_contrato:"",
        plazo_contrato:"",
        numero_registro_cotrato:"",
        montro_contrato:"",
        moneda:"Q",
        tipo_cambio:"",
        tipo_garantia:"",
        vigencia_garantia:"",
        razon: ""
    });

    const [state3, setState3] = useState({
        nombre_producto: "",
        fecha_entrega:"",
        descripcion:"",
        fecha_aprobacion: ""
    });

    const handleChange3 = (event) => {
        setState3({ ...state3, [event.target.name]: event.target.value });
    };

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        axios.post(props.url + "api/get-activity-info",
            {
                id: props.match.params.id
            }
        )
            .then(function (response) {
                let r = response.data[0];
                setState2({
                    nombre_contratista: r.nombre_contratista,
                    fecha_firma_contrato:r.fecha_firma_contrato,
                    objeto_contrato:r.objeto_contrato,
                    plazo_contrato:r.plazo_contrato,
                    numero_registro_cotrato:r.numero_registro_cotrato,
                    montro_contrato:r.montro_contrato,
                    moneda:r.moneda,
                    tipo_cambio:r.tipo_cambio,
                    tipo_garantia:r.tipo_garantia,
                    vigencia_garantia:r.vigencia_garantia,
                    razon: r.texto_rechazo_contrato
                });
                // console.log(r.cronograma);
                setCronograma(r.cronograma);
                setActivity(response.data[0]);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [props]);

    //####################################Eliminamos linea#########################################
    const remove_row = (idx) => {
        let arr = [...cronograma];
        arr.splice(idx,1);
        setCronograma(arr);
    }
    //####################################Agregamos linea#########################################
    const add_line = () => {
        if(state3.nombre_producto!=="" && state3.fecha_entrega!=="" && state3.descripcion!=="" && state3.fecha_aprobacion!==""){
            let arr = [
                state3.nombre_producto,
                state3.fecha_entrega,
                state3.descripcion,
                state3.fecha_aprobacion
            ];
            let cron = [...cronograma];
            cron.push(arr);
            setCronograma(cron);
            setState3({nombre_producto:"",fecha_entrega:"",descripcion:"",fecha_aprobacion:""})
        }else{
            swal("Atención", "!Debe de agregar nombre del producto, fecha de entrega, descripción y fecha límite de aprobación!", "error");
        }
    }



    //####################################Completar Información#########################################
    const complete_info = () => {
        if(cronograma.length>0){
                swal({
                    title: "¿Continuar?",
                    text: "Se guardará el cronograma.",
                    icon: "warning",
                    buttons: ["Cancelar", "Guardar"],
                    dangerMode: true,
                })
                    .then((certifico) => {
                        if (certifico) {
                            let user = localStorage.getItem("bidID");
                            axios.post(props.url + "api/completar-contrato",
                                {
                                    id: props.match.params.id,
                                    user,
                                    cronograma: JSON.stringify(cronograma)
                                }
                            )
                                .then(function () {
                                    props.getProcesses();
                                    window.history.back();
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                        }
                    });
        }else{
            swal("Atención", "!Debe de agregar información del cronograma!", "error");
        }
    }

    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container">
                <h1>
                    Registro de contrato
                </h1>
                
                <h2>
                    {props.match.params.description}
                </h2>


                <div className="row">
                    <div className="half">
                        <label htmlFor="fecha_firma_contrato">
                            Fecha de firma de contrato
                        </label>
                        <div className="display-info">
                            {activity.fecha_firma_contrato}
                        </div>
                    </div>
                    <div className="half">
                        <label htmlFor="nombre_contratista">
                            Nombre del contratista / cosultor
                        </label>
                        <div className="display-info">
                            {activity.nombre_contratista}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="half">
                        <label htmlFor="objeto_contrato">
                            Objeto del Contrato
                        </label>
                        <div className="display-info">
                            {activity.objeto_contrato}
                        </div>
                    </div>
                    <div className="half">
                        <label htmlFor="plazo_contrato">
                            Plazo del Contrato
                        </label>
                        <div className="display-info">
                            {activity.plazo_contrato}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="half">
                        <label htmlFor="numero_registro_cotrato">
                            Número de registro del contrato
                        </label>
                        <div className="display-info">
                            {activity.numero_registro_cotrato}
                        </div>
                    </div>
                    <div className="half">
                        <label htmlFor="numero_registro_cotrato">
                            Gerente de contrato
                        </label>
                        <div className="display-info">
                            {activity.gerente}
                        </div>
                    </div>
                </div>

                <div className="row space-bellow">
                    <div className="half">
                        <label htmlFor="tipo_garantia">
                            Tipo de garantía
                        </label>
                        <div className="display-info">
                            {activity.tipo_garantia}
                        </div>
                    </div>
                    <div className="half">
                        <label htmlFor="vigencia_garantia">
                            Vigencia de garantía
                        </label>
                        <div className="display-info">
                            {activity.vigencia_garantia}
                        </div>
                    </div>
                </div>

                <div className="hero space-bellow">
                    <ListadoDocumentosGarantia
                            id={props.match.params.id}
                            tipo={props.match.params.tipo}
                            url={props.url}
                            urlDocs={props.urlDocs}
                            delete={false}
                        />
                </div>

                <div className="row">
                    <div className="third">
                        <label htmlFor="moneda">
                            Moneda
                        </label>
                        <div className="display-info">
                            {activity.moneda}
                        </div>
                    </div>
                    <div className="third">
                        <label htmlFor="montro_contrato">
                            Monto del Contrato
                        </label>
                        <div className="display-info">
                            {activity.montro_contrato}
                        </div>
                    </div>
                    <div className="third">
                        <label htmlFor="tipo_cambio">
                            Tipo de Cambio
                        </label>
                        <div className="display-info">
                            {activity.tipo_cambio}
                        </div>
                    </div>
                </div>

                <h2>
                    Cronograma de entrega de productos
                </h2>

                <div className="row">
                    <div className="fifth no-bg">
                        <label htmlFor="nombre_producto">
                            Nombre del producto
                        </label>
                        <input
                            type="text"
                            name="nombre_producto"
                            id="nombre_producto"
                            value={state3.nombre_producto}
                            onChange={handleChange3}
                        />
                    </div>
                    <div className="fifth no-bg">
                        <label htmlFor="fecha_entrega">
                            Fecha de Entrega
                        </label>
                        <input
                            type="date"
                            name="fecha_entrega"
                            id="fecha_entrega"
                            value={state3.fecha_entrega}
                            onChange={handleChange3}
                        />
                    </div>
                    <div className="fifth no-bg">
                        <label htmlFor="descripcion">
                            Descripción
                        </label>
                        <input
                            type="text"
                            name="descripcion"
                            id="descripcion"
                            value={state3.descripcion}
                            onChange={handleChange3}
                        />
                    </div>
                    <div className="fifth no-bg">
                        <label htmlFor="fecha_aprobacion">
                            Fecha aprobación
                        </label>
                        <input
                            type="date"
                            name="fecha_aprobacion"
                            id="fecha_aprobacion"
                            value={state3.fecha_aprobacion}
                            onChange={handleChange3}
                        />
                    </div>
                    <div className="fifth no-bg">
                        <label>&nbsp;</label>
                        <button type="button" className="completar-informacion" onClick={add_line}>
                            <FontAwesomeIcon icon="plus" /> Agregar Producto
                            <LinearProgress />
                        </button>
                    </div>
                </div>                

                <div className="hero space-bellow">
                    {
                        cronograma.map((key, idx) => {
                            let d = LocalDate.parse(key[1]);
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
                                        <button type="button" className="cancel" onClick={()=>remove_row(idx)}>
                                            <FontAwesomeIcon icon="times" />
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="row">                        
                    <button type="button" className="save" disabled={disabled} onClick={complete_info}>
                        <FontAwesomeIcon icon="save" /> Continuar
                        <LinearProgress />
                    </button>
                </div>
            </div>
        </div>
    );
}