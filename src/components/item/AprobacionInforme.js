import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';
import ListadoDocumentosOfertas from './ListadoDocumentosOfertas';
import ListadoDocumentosEvaluacion from './ListadoDocumentosEvaluacion';
import Switch from '@material-ui/core/Switch';

export default function AprobacionInforme(props) {
    const [activity, setActivity] = useState(false);
    const [state, setState] = useState({
        checkedA: false
    });

    const [state2, setState2] = useState({
        proveedor: "",
        fecha_vencimiento:""
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
                axios.post(props.url + "api/aprobacion-informe",
                    {
                        id: props.match.params.id,
                        user,
                        proveedor: state2.proveedor,
                        fecha_vencimiento: state2.fecha_vencimiento
                    }
                )
                    .then(function () {
                        swal("Información", "Se ha aprobado el informe", "info")
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
            swal("Alerta", "Debe de marcar la aprobación", "error");
        }
    }

    let concepto_obligatorio = activity.concepto_obligatorio_evaluacion;
    let no_objecion_evaluacion = activity.no_objecion_evaluacion;
    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container space-bellow">
                <h1>
                    Aprobación de Informe
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
                                Comentario no objeción
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
                        Completar información de adjudicación
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
                            />
                        </div>
                        <div className="half">
                            <label htmlFor="fecha_vencimiento">
                                Fecha de Recepción de ofertas
                            </label>
                            <input
                                type="date"
                                name="fecha_vencimiento"
                                id="fecha_vencimiento"
                                value={state2.fecha_vencimiento}
                                onChange={handleChange2}
                            />
                        </div>
                    </div>
                </div>

                <div className="hero space-bellow">
                    <div className="row">
                        <div className="row">
                            <ListadoDocumentosOfertas
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
                    <ListadoDocumentosEvaluacion
                            id={props.match.params.id}
                            url={props.url}
                            urlDocs={props.urlDocs}
                        />
                </div>
                <div className="row">
                    <h2>
                        Aprobación
                    </h2>
                    <div className="full">
                        <label htmlFor="checkedA" className="switch">
                            <Switch
                                checked={state.checkedA}
                                onChange={handleChange}
                                color="primary"
                                name="checkedA"
                                id="checkedA"
                                inputProps={{ 'aria-label': 'Certifico que cumple con todos los requerimientos técnicos.' }}
                            />
                            Certifico que cumple con todos los documentos base.
                        </label>
                    </div>
                    <div className="full">
                        <button type="button" className="save" onClick={approve}>
                            <FontAwesomeIcon icon="save" /> Aprobar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}