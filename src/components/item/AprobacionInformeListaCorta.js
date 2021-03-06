import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';
import ListadoDocumentosOfertasListaCorta from './ListadoDocumentosOfertasListaCorta';
import ListadoDocumentosEvaluacionListaCorta from './ListadoDocumentosEvaluacionListaCorta';
import Switch from '@material-ui/core/Switch';

export default function AprobacionInformeListaCorta(props) {
    const [activity, setActivity] = useState(false);
    const [state, setState] = useState({
        checkedA: false
    });

    const [state2, setState2] = useState({
        proveedor: "",
        notificacion_proveedor:"",
        firma_contrato_garantias:""
    });

    const handleChange2 = (event) => {
        setState2({ ...state2, [event.target.name]: event.target.value });
    };

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
                setState2(
                    {
                        proveedor:response.data[0].proveedor,
                        notificacion_proveedor:response.data[0].notificacion_proveedor,
                        firma_contrato_garantias:response.data[0].firma_contrato_garantias
                    }
                );
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [props]);

    // Approve this plan
    const approve = () => {
        let user = localStorage.getItem("bidID");
        if (state.checkedA) {
            if(state2.proveedor!=="" && state2.proveedor!==null && state2.fecha_vencimiento!=="" && state2.fecha_vencimiento!==null){
                axios.post(props.url + "api/aprobacion-informe-lista-corta",
                    {
                        id: props.match.params.id,
                        user,
                        proveedor: state2.proveedor,
                        notificacion_proveedor: state2.notificacion_proveedor,
                        firma_contrato_garantias: state2.firma_contrato_garantias
                    }
                )
                    .then(function () {
                        swal("Informaci??n", "Se ha aprobado el informe", "info")
                            .then(() => {
                                props.getProcesses();
                                props.history.goBack();
                            });
                    })
                    .catch(function (error) {
                        console.log(error);
                });
            }else{
                swal("Alerta", "Debe de llenar el proveedor y la fecha de vencimiento", "error");    
            }
        } else {
            swal("Alerta", "Debe de marcar la aprobaci??n", "error");
        }
    }


    let date1 = new Date(state2.firma_contrato_garantias); 
    let date3 = new Date(state2.notificacion_proveedor); 
    let date2 = new Date();
    let diff = date1.getTime() - date2.getTime();
    let days1 = parseInt(diff / (1000 * 3600 * 24)); 

    diff = date3.getTime() - date2.getTime();
    let days2 = parseInt(diff / (1000 * 3600 * 24)); 




    let concepto_obligatorio = activity.concepto_obligatorio_evaluacion_lista_corta;
    let no_objecion_evaluacion = activity.no_objecion_evaluacion_lista_corta;
    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container space-bellow">
                <h1>
                    Aprobaci??n de Informe lista corta
                </h1>
                {
                    concepto_obligatorio!=="" ?
                    (
                        <div className="hero concepto_obligatorio space-bellow">
                            <h3 className="concepto_obligatorio">
                                <FontAwesomeIcon icon="info-square" />
                                Concepto Obligatorio
                                <div className="text">
                                    <span dangerouslySetInnerHTML={{__html: concepto_obligatorio}} />
                                </div>
                            </h3>
                        </div>
                    ) : ""
                }
                {
                    no_objecion_evaluacion!=="" ?
                    (
                        <div className="hero concepto_obligatorio space-bellow">
                            <h3 className="concepto_obligatorio">
                                <FontAwesomeIcon icon="info-square" />
                                Comentario no objeci??n
                                <div className="text">
                                    <span dangerouslySetInnerHTML={{__html: no_objecion_evaluacion}} />
                                </div>
                            </h3>
                        </div>
                    ) : ""
                }
                <h2>
                    {props.match.params.description}
                </h2>

                <div className="hero space-bellow">
                    <h3>
                        Completar informaci??n de adjudicaci??n
                    </h3>
                    <div className="row">
                        <div className="half">
                            <label htmlFor="numero">
                                Proveedor
                            </label>
                            <input
                                type="text"
                                name="proveedor"
                                id="proveedor"
                                value={state2.proveedor}
                                onChange={handleChange2}
                                readOnly={activity.cs_estado_proceso_id===70}
                            />
                        </div>
                        <div className="half">
                            <label htmlFor="fecha_vencimiento">
                                Fecha de Notificaci??n al Proveedor 
                                {
                                    state2.notificacion_proveedor && activity.cs_estado_proceso_id===70 ?
                                    (
                                        <strong className="red"> ({ days2 } d??as) </strong>
                                    ) : ""
                                }
                            </label>
                            <input
                                type="date"
                                name="notificacion_proveedor"
                                id="notificacion_proveedor"
                                value={state2.notificacion_proveedor}
                                onChange={handleChange2}
                                readOnly={activity.cs_estado_proceso_id===70}
                            />
                        </div>
                        <div className="half">
                            <label htmlFor="fecha_vencimiento">
                                Fecha L??mite de firma de contrato y garant??as 
                                {
                                    state2.firma_contrato_garantias && activity.cs_estado_proceso_id===70 ?
                                    (
                                        <strong className="red"> ({ days1 } d??as) </strong>
                                    ) : ""
                                }
                            </label>
                            <input
                                type="date"
                                name="firma_contrato_garantias"
                                id="firma_contrato_garantias"
                                value={state2.firma_contrato_garantias}
                                onChange={handleChange2}
                                readOnly={activity.cs_estado_proceso_id===70}
                            />
                        </div>
                    </div>
                </div>

                <div className="hero space-bellow">
                    <div className="row">
                        <div className="row">
                            <ListadoDocumentosOfertasListaCorta
                                    id={props.match.params.id}
                                    tipo={props.match.params.tipo}
                                    url={props.url}
                                    urlDocs={props.urlDocs}
                                    delete={false}
                                />
                        </div>
                    </div>
                </div>

                <div className="hero space-bellow">
                    <ListadoDocumentosEvaluacionListaCorta
                            id={props.match.params.id}
                            url={props.url}
                            urlDocs={props.urlDocs}
                        />
                </div>
                    {
                        activity.cs_estado_proceso_id!==70 ?
                        (
                            <div className="row">
                                <h2>
                                    Aprobaci??n
                                </h2>
                                <div className="full">
                                    <label htmlFor="checkedA" className="switch">
                                        <Switch
                                            checked={state.checkedA}
                                            onChange={handleChange}
                                            color="primary"
                                            name="checkedA"
                                            id="checkedA"
                                            inputProps={{ 'aria-label': 'Certifico que cumple con todos los requerimientos t??cnicos.' }}
                                        />
                                        Certifico que cumple con todos los documentos base.
                                    </label>
                                </div>
                            </div>
                        ): ""
                    }
                <div className="row">
                    <div className="full">
                        {
                            activity.cs_estado_proceso_id===70 ?
                            (
                                <button type="button" className="cancel" onClick={()=>window.history.back()}>
                                    <FontAwesomeIcon icon="arrow-to-left" /> Regresar
                                </button>
                            ):
                            (
                                <button type="button" className="save" onClick={approve}>
                                    <FontAwesomeIcon icon="save" /> Aprobar
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}