import React, { useState,useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';
import {LocalDate,DateTimeFormatter}  from "@js-joda/core";
import ListadoDocumentosCompletarProducto from './ListadoDocumentosCompletarProducto';

export default function CompletarProducto(props) {
    const [activity, setActivity] = useState(false);
    const [supervisores, setSupervisores] = useState(false);
    const [pod, setPod] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [producto, setProducto] = useState(["",0,"","",0]);
    
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
    //####################################Change File Handler####################################
    const onChangeHandler2 = event => {
        if (event.target.name === "supervisor") {
            let prod = [...producto];
            prod[4] = event.target.value;
            setProducto(prod);
            // setSupervisor(event.target.value);
        }
    }

    //####################################Subir Archivos####################################
    const onSubmit = (e) => {
        e.preventDefault();
        let ev = e;
        if (pod) {
            const data = new FormData()
            for(let i =0;i<pod.length;i++){
                data.append('pod[]', pod[i]);
            }

            data.append('id', producto[1]);

            setDisabled(true);
            let user = localStorage.getItem("bidID");
            data.append('user', user);

            axios.post(props.url + "api/upload-item-completar-producto-documents", data)
                .then(function () {
                    setDisabled(false);
                    swal("Éxito", "!Documentos Cargados!", "success");
                    setPod(null);
                    ev.target.reset();
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            swal("Atención", "!Debe de seleccionar Archivos!", "error");
        }
        return false;
    };

    //####################################Completar Información########################################
    const complete_info = () => {
        if(producto[4]!==0){
            swal({
                title: "¿Continuar?",
                text: "Se enviará al siguiente paso.",
                icon: "warning",
                buttons: ["Cancelar", "Enviar"],
                dangerMode: true,
            })
                .then((certifico) => {
                    setDisabled(true);
                    if (certifico) {
                        let user = localStorage.getItem("bidID");
                        axios.post(props.url + "api/completar-producto",
                            {
                                id: producto[1],
                                user,
                                supervisor:producto[4]
                            }
                        )
                            .then(function () {
                                props.getProcesses();
                                window.history.back();
                                setDisabled(false);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                });
        }else{
            swal("Atención", "!Debe de seleccionar el supervisor del contrato!", "error");
        }
    }

    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container">
                <h1>
                    Completar Producto
                </h1>
                
                <h2>
                    {props.match.params.description}
                </h2>

                <h2>
                    Cronograma de entrega de productos
                </h2>

                <div className="hero space-bellow">
                    {
                        activity.cronograma ?
                        activity.cronograma.map((key, idx) => {
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
                                    {
                                        key[5]===2 ?
                                        (
                                            <div className="quarter no-bg no-padding">
                                                <button type="button" className="cancel no-margin" onClick={()=>{setProducto([key[0],key[3],key[6],key[7],key[4]])}}>
                                                    <FontAwesomeIcon icon="wrench" />&nbsp; 
                                                    Corregir
                                                </button>
                                            </div>
                                        ) :
                                        key[4]===0 ?
                                        (
                                            <div className="quarter no-bg no-padding">
                                                <button type="button" className="save" onClick={()=>{setProducto([key[0],key[3],key[6],key[7],key[4]])}}>
                                                    <FontAwesomeIcon icon="clipboard-list-check" />&nbsp;
                                                    Completar
                                                </button>
                                            </div>
                                        ):
                                        key[5]===5 ?
                                        (
                                            <div className="quarter no-bg no-padding">
                                                <button type="button" className="solicitud_enmienda no-margin">
                                                    <FontAwesomeIcon icon="money-check" />&nbsp; 
                                                    Pagado
                                                </button>
                                            </div>
                                        ) :
                                        (
                                            <div className="quarter no-bg no-padding">
                                                <button type="button" className="completar-informacion">
                                                    <FontAwesomeIcon icon="pause" />&nbsp;
                                                    En aprobación
                                                </button>
                                            </div>
                                        )
                                    }
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
                                Completar información del producto {producto[0]}
                            </h1>

                            {
                                producto[2]!==null ?
                                (
                                    <div className="hero error space-bellow">
                                        <h3 className="error">
                                            <FontAwesomeIcon icon="exclamation-triangle" />
                                            Razón de rechazo
                                            <div className="text">
                                                {producto[2]}
                                            </div>
                                        </h3>
                                    </div>
                                ) : ""
                            }

                            <div className="hero space-bellow">
                                <div className="row">
                                    <div className="half">
                                        <label htmlFor="fecha_firma_contrato">
                                            Supervisor del Contrato
                                        </label>
                                        <select name="supervisor" id="supervisor" value={producto[4]} onChange={onChangeHandler2}>
                                            <option value="0">
                                                Seleccione un supervisor
                                            </option>
                                            {
                                                supervisores ?
                                                supervisores.map((key) => {
                                                    return (
                                                        <option value={key.id} key={`user${key.id}`}>
                                                            {key.name}
                                                        </option>
                                                    )
                                                }) : ""
                                            }

                                        </select>
                                    </div>
                                </div>
                            </div>

                            <h1>
                                Subir documentos
                            </h1>
                            <form onSubmit={onSubmit}>
                                <div className="hero space-bellow">
                                    <div className="row file-input space-bellow">
                                        <div className="half">
                                            <div className="label">
                                                Seleccione archivos
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

                                <h2>
                                    Documentos cargados
                                </h2>
                                <div className="hero space-bellow">
                                    <ListadoDocumentosCompletarProducto
                                            id={producto[1]}
                                            tipo={props.match.params.tipo}
                                            url={props.url}
                                            urlDocs={props.urlDocs}
                                            delete={true}
                                        />
                                </div>
                            </form>
                            <div className="row">
                                <button type="button" className="save" onClick={complete_info} disabled={disabled}>
                                    <FontAwesomeIcon icon="save" /> Enviar
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