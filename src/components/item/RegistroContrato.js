import React, { useState,useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';
import {LocalDate,DateTimeFormatter}  from "@js-joda/core";
import ListadoDocumentosGarantia from './ListadoDocumentosGarantia';

export default function RegistroContrato(props) {
    const [cronograma,setCronograma] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [pod, setPod] = useState(null);

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

    const handleChange2 = (event) => {
        setState2({ ...state2, [event.target.name]: event.target.value });
    };

    const [state3, setState3] = useState({
        nombre_producto: "",
        fecha_entrega:"",
        descripcion:""
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
                // setActivity(response.data[0]);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [props]);

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

    //####################################Eliminamos linea#########################################
    const remove_row = (idx) => {
        let arr = [...cronograma];
        arr.splice(idx,1);
        setCronograma(arr);
    }
    //####################################Agregamos linea#########################################
    const add_line = () => {
        if(state3.nombre_producto!=="" && state3.fecha_entrega!=="" && state3.descripcion!==""){
            let arr = [
                state3.nombre_producto,
                state3.fecha_entrega,
                state3.descripcion
            ];
            let cron = [...cronograma];
            cron.push(arr);
            setCronograma(cron);
            setState3({nombre_producto:"",fecha_entrega:"",descripcion:""})
        }else{
            swal("Atención", "!Debe de agregar nombre del producto, fecha de entrega y descripción!", "error");
        }
    }

    //####################################Subir Archivos####################################
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
            axios.post(props.url + "api/upload-item-garantia-documents", data)
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
        if(cronograma.length>0){
            if(
                state2.nombre_contratista!=="" 
                && state2.fecha_firma_contrato!=="" 
                && state2.objeto_contrato!=="" 
                && state2.plazo_contrato!=="" 
                && state2.numero_registro_cotrato!=="" 
                && state2.montro_contrato!=="" 
                && state2.tipo_cambio!=="" 
                && state2.tipo_garantia!=="" 
                && state2.vigencia_garantia!==""
            ){
                swal({
                    title: "¿Continuar?",
                    text: "Se enviará al siguiente paso.",
                    icon: "warning",
                    buttons: ["Cancelar", "Enviar"],
                    dangerMode: true,
                })
                    .then((certifico) => {
                        if (certifico) {
                            let user = localStorage.getItem("bidID");
                            axios.post(props.url + "api/registrar-contrato",
                                {
                                    id: props.match.params.id,
                                    user,
                                    nombre_contratista:state2.nombre_contratista,
                                    fecha_firma_contrato:state2.fecha_firma_contrato,
                                    objeto_contrato:state2.objeto_contrato,
                                    plazo_contrato:state2.plazo_contrato,
                                    numero_registro_cotrato:state2.numero_registro_cotrato,
                                    montro_contrato:state2.montro_contrato,
                                    moneda:state2.moneda,
                                    tipo_cambio:state2.tipo_cambio,
                                    tipo_garantia:state2.tipo_garantia,
                                    vigencia_garantia:state2.vigencia_garantia,
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
                swal("Atención", "!Debe de llenar todos los campos!", "error");    
            }
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

                {
                    state2.razon && state2.razon!=="" ?
                    (
                        <div className="hero concepto_obligatorio space-bellow">
                            <h3 className="concepto_obligatorio">
                                <FontAwesomeIcon icon="info-square" />
                                Concepto Obligatorio
                                <div className="text">
                                    {state2.razon}
                                </div>
                            </h3>
                        </div>
                    ) : ""
                }

                <div className="row">
                    <div className="half">
                        <label htmlFor="fecha_firma_contrato">
                            Fecha de firma de contrato
                        </label>
                        <input
                            type="date"
                            name="fecha_firma_contrato"
                            id="fecha_firma_contrato"
                            value={state2.fecha_firma_contrato}
                            onChange={handleChange2}
                        />
                    </div>
                    <div className="half">
                        <label htmlFor="nombre_contratista">
                            Nombre del contratista / cosultor
                        </label>
                        <input
                            type="text"
                            name="nombre_contratista"
                            id="nombre_contratista"
                            value={state2.nombre_contratista}
                            onChange={handleChange2}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="half">
                        <label htmlFor="objeto_contrato">
                            Objeto del Contrato
                        </label>
                        <input
                            type="text"
                            name="objeto_contrato"
                            id="objeto_contrato"
                            value={state2.objeto_contrato}
                            onChange={handleChange2}
                        />
                    </div>
                    <div className="half">
                        <label htmlFor="plazo_contrato">
                            Plazo del Contrato
                        </label>
                        <input
                            type="date"
                            name="plazo_contrato"
                            id="plazo_contrato"
                            value={state2.plazo_contrato}
                            onChange={handleChange2}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="half">
                        <label htmlFor="numero_registro_cotrato">
                            Número de registro del contrato
                        </label>
                        <input
                            type="number"
                            name="numero_registro_cotrato"
                            id="numero_registro_cotrato"
                            value={state2.numero_registro_cotrato}
                            onChange={handleChange2}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="half">
                        <label htmlFor="tipo_garantia">
                            Tipo de garantía
                        </label>
                        <input
                            type="text"
                            name="tipo_garantia"
                            id="tipo_garantia"
                            value={state2.tipo_garantia}
                            onChange={handleChange2}
                        />
                    </div>
                    <div className="half">
                        <label htmlFor="vigencia_garantia">
                            Vigencia de garantía
                        </label>
                        <input
                            type="date"
                            name="vigencia_garantia"
                            id="vigencia_garantia"
                            value={state2.vigencia_garantia}
                            onChange={handleChange2}
                        />
                    </div>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="hero space-bellow">
                        <div className="row file-input space-bellow">
                            <div className="half">
                                <div className="label">
                                    Seleccione archivos de garantía
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
                        <ListadoDocumentosGarantia
                                id={props.match.params.id}
                                tipo={props.match.params.tipo}
                                url={props.url}
                                urlDocs={props.urlDocs}
                                delete={true}
                            />
                    </div>
                </form>

                <div className="row">
                    <div className="third">
                        <label htmlFor="moneda">
                            Moneda
                        </label>
                        <select 
                            id="moneda" 
                            name="moneda"
                            value={state2.moneda}
                            onChange={handleChange2}
                        >
                            <option>Q</option>
                            <option>$</option>
                        </select>
                    </div>
                    <div className="third">
                        <label htmlFor="montro_contrato">
                            Monto del Contrato
                        </label>
                        <input
                            type="number"
                            name="montro_contrato"
                            id="montro_contrato"
                            value={state2.montro_contrato}
                            onChange={handleChange2}
                        />
                    </div>
                    <div className="third">
                        <label htmlFor="tipo_cambio">
                            Tipo de Cambio
                        </label>
                        <input
                            type="number"
                            name="tipo_cambio"
                            id="tipo_cambio"
                            value={state2.tipo_cambio}
                            onChange={handleChange2}
                        />
                    </div>
                </div>

                <h2>
                    Cronograma de entrega de productos
                </h2>

                <div className="row">
                    <div className="quarter no-bg">
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
                    <div className="quarter no-bg">
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
                    <div className="quarter no-bg">
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
                    <div className="quarter no-bg">
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