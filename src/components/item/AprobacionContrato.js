import React, { useState,useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';
import ListadoDocumentosGarantia from './ListadoDocumentosGarantia';

export default function AprobacionContrato(props) {
    const [activity, setActivity] = useState(false);
    const [disabled, setDisabled] = useState(false);
    
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
        swal({
            title: "Aprobación!",
            text: "Yo apruebo este contrato.",
            icon: "warning",
            buttons: ["Cancelar", "Aprobar"],
            dangerMode: true,
        })
            .then((certifico) => {
                if (certifico) {
                    setDisabled(true);
                    axios.post(props.url + "api/aprobacion-contrato",
                        {
                            id: props.match.params.id,
                            user
                        }
                    )
                        .then(function () {
                            swal("Información", "Se ha enviado la aprobación", "info")
                                .then(() => {
                                    setDisabled(false);
                                    window.history.back();
                                });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            });
    }

    // Reject this plan
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
                axios.post(props.url + "api/rechazo-contrato",
                    {
                        id: props.match.params.id,
                        user,
                        razon
                    }
                )
                    .then(function () {
                        swal("Información", "Se ha enviado el rechazo.", "info")
                            .then(() => {
                                setDisabled(false);
                                window.history.back();
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
                    Aprobación de contrato
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
                
                <div className="row">
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
    );
}