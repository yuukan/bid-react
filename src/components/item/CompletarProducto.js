import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTimeFormatter, LocalDate } from "@js-joda/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import ListadoDocumentosCompletarProducto from './ListadoDocumentosCompletarProducto';

export default function CompletarProducto(props) {
    const [activity, setActivity] = useState(false);
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
        
    //    axios.post(props.url + "api/get-supervisor")
    //         .then(function (response) {
    //             setSupervisores(response.data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
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
                    swal("??xito", "!Documentos Cargados!", "success");
                    setPod(null);
                    ev.target.reset();
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            swal("Atenci??n", "!Debe de seleccionar Archivos!", "error");
        }
        return false;
    };

    //####################################Completar Informaci??n########################################
    const complete_info = () => {
        if(producto[4]!==0){
            swal({
                title: "??Continuar?",
                text: "Se enviar?? al siguiente paso.",
                icon: "warning",
                buttons: ["Cancelar", "Enviar"],
                dangerMode: true,
            })
                .then((certifico) => {
                    if (certifico) {
                        setDisabled(true);
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
            swal("Atenci??n", "!Debe de seleccionar el supervisor del contrato!", "error");
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
                                    {
                                        key[6]===2 ?
                                        (
                                            <div className="fifth no-bg no-padding">
                                                <button type="button" className="cancel no-margin" onClick={()=>{setProducto([key[0],key[4],key[7],key[8],key[5]])}}>
                                                    <FontAwesomeIcon icon="wrench" />&nbsp; 
                                                    Corregir
                                                </button>
                                            </div>
                                        ) :
                                        key[6]===0 || !key[6]  ?
                                        (
                                            <div className="fifth no-bg no-padding">
                                                <button type="button" className="save" onClick={()=>{setProducto([key[0],key[4],key[7],key[8],key[5]])}}>
                                                    <FontAwesomeIcon icon="clipboard-list-check" />&nbsp;
                                                    Completar
                                                </button>
                                            </div>
                                        ):
                                        key[6]===5 ?
                                        (
                                            <div className="fifth no-bg no-padding">
                                                <button type="button" className="solicitud_enmienda no-margin">
                                                    <FontAwesomeIcon icon="money-check" />&nbsp; 
                                                    Pagado
                                                </button>
                                            </div>
                                        ) :
                                        (
                                            <div className="fifth no-bg no-padding">
                                                <button type="button" className="completar-informacion">
                                                    <FontAwesomeIcon icon="pause" />&nbsp;
                                                    En aprobaci??n
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
                                Completar informaci??n del producto {producto[0]}
                            </h1>

                            {
                                producto[2]!==null && producto[2]!==0 ?
                                (
                                    <div className="hero error space-bellow">
                                        <h3 className="error">
                                            <FontAwesomeIcon icon="exclamation-triangle" />
                                            Raz??n de rechazo
                                            <div className="text">
                                                {producto[2]}
                                            </div>
                                        </h3>
                                    </div>
                                ) : ""
                            }

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