import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ListadoDocumentosGarantia from './ListadoDocumentosGarantia';
import { DateTimeFormatter, LocalDate } from "@js-joda/core";

export default function VerDetalleContrato(props) {
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

    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container">
                <h1>
                    Detalle de contrato
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
                                    <div className="fifth no-bg">
                                        {
                                            key[6]===0 ?
                                            (
                                                "Pendiente de corrección"
                                            ) :
                                            key[6]===0 || !key[6]  ?
                                            (
                                                "Creado"
                                            ):
                                            key[6]===5 ?
                                            (
                                                "Pagado"
                                            ) :
                                            (
                                                "Esperando aprobación"
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }) : ""
                    }
                </div>
                
                <div className="row">
                    <button type="button" className="cancel" onClick={()=>window.history.back()}>
                        <FontAwesomeIcon icon="long-arrow-left" /> Regresar
                    </button>
                </div>
            </div>
        </div>
    );
}