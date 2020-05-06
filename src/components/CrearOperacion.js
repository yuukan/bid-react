import React from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from "react-hook-form";

function CrearOperacion(props) {
    const { handleSubmit, register, errors } = useForm();

    //####################################Save Profile####################################
    const onSubmit = (values, e) => {
        axios.post(props.url + "api/crear-operacion", values)
            .then(function () {
                swal("Éxito", "!Operación creada!", "success");
                props.getProcesses();
                e.target.reset();
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    //####################################Save Profile####################################

    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container">
                <h1>
                    Creación de Operación
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="half">
                            <label htmlFor="name">
                                Nombre de la Operación
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                ref={register({
                                    required: 'Obligatorio'
                                })}
                                className={errors.name ? 'error' : ''}
                            />
                            <div className={errors.name ? 'error-msg' : 'error-hide'}>
                                {errors.name ? errors.name.message : 'Error'}
                            </div>
                        </div>
                        <div className="half">
                            <label htmlFor="tipo_operacion">
                                Tipo de operación
                            </label>
                            <select
                                name="tipo_operacion"
                                id="tipo_operacion"
                                ref={register({
                                    required: 'Obligatorio',
                                    pattern: {
                                        value: /^[1-9]\d*(\.\d+)?$/i,
                                        message: "Debe de ser Número"
                                    }
                                })}
                                className={errors.tipo_operacion ? 'error' : ''}
                            >
                                <option value="">
                                    Seleccione un tipo de operación
                                </option>
                                <option value="1">
                                    Tipo 1
                                </option>
                                <option value="2">
                                    Tipo 2
                                </option>
                            </select>
                            <div className={errors.tipo_operacion ? 'error-msg' : 'error-hide'}>
                                {errors.tipo_operacion ? errors.tipo_operacion.message : 'Error'}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="half">
                            <label htmlFor="numero">
                                Número de proyecto
                            </label>
                            <input
                                type="number"
                                name="numero"
                                id="numero"
                                ref={register({
                                    required: 'Obligatorio',
                                    pattern: {
                                        value: /^[1-9]\d*(\.\d+)?$/i,
                                        message: "Debe de ser Número"
                                    }
                                })}
                                className={errors.numero ? 'error' : ''}
                            />
                            <div className={errors.numero ? 'error-msg' : 'error-hide'}>
                                {errors.numero ? errors.numero.message : 'Error'}
                            </div>
                        </div>
                        <div className="half">
                            <label htmlFor="fecha_firma">
                                Fecha de firma del contrato
                            </label>
                            <input
                                type="date"
                                name="fecha_firma"
                                id="fecha_firma"
                                ref={register({
                                    required: 'Obligatorio'
                                })}
                                className={errors.fecha_firma ? 'error' : ''}
                            />
                            <div className={errors.fecha_firma ? 'error-msg' : 'error-hide'}>
                                {errors.fecha_firma ? errors.fecha_firma.message : 'Error'}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="half">
                            <label htmlFor="fecha_aprobacion">
                                Fecha aprobación directorio Banco
                            </label>
                            <input
                                type="date"
                                name="fecha_aprobacion"
                                id="fecha_aprobacion"
                                ref={register({
                                    required: 'Obligatorio'
                                })}
                                className={errors.fecha_aprobacion ? 'error' : ''}
                            />
                            <div className={errors.fecha_aprobacion ? 'error-msg' : 'error-hide'}>
                                {errors.fecha_aprobacion ? errors.fecha_aprobacion.message : 'Error'}
                            </div>
                        </div>
                        <div className="half">
                            <label htmlFor="fecha_elegibilidad">
                                Fecha de elegibilidad de la operción
                            </label>
                            <input
                                type="date"
                                name="fecha_elegibilidad"
                                id="fecha_elegibilidad"
                                ref={register({
                                    required: 'Obligatorio'
                                })}
                                className={errors.fecha_elegibilidad ? 'error' : ''}
                            />
                            <div className={errors.fecha_elegibilidad ? 'error-msg' : 'error-hide'}>
                                {errors.fecha_elegibilidad ? errors.fecha_elegibilidad.message : 'Error'}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="half">
                            <label htmlFor="monto">
                                Monto Aprobado
                            </label>
                            <input
                                type="text"
                                name="monto"
                                id="monto"
                                ref={register({
                                    required: 'Obligatorio',
                                    pattern: {
                                        value: /^[1-9]\d*(\.\d+)?$/i,
                                        message: "Debe de ser Número"
                                    }
                                })}
                                className={errors.monto ? 'error' : ''}
                            />
                            <div className={errors.monto ? 'error-msg' : 'error-hide'}>
                                {errors.monto ? errors.monto.message : 'Error'}
                            </div>
                        </div>
                        <div className="half">
                            <label htmlFor="ejecutor">
                                Ejecutor
                            </label>
                            <input
                                type="text"
                                name="ejecutor"
                                id="ejecutor"
                                ref={register({
                                    required: 'Obligatorio'
                                })}
                                className={errors.ejecutor ? 'error' : ''}
                            />
                            <div className={errors.ejecutor ? 'error-msg' : 'error-hide'}>
                                {errors.ejecutor ? errors.ejecutor.message : 'Error'}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <button type="submit" className="save">
                            <FontAwesomeIcon icon="save" /> Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CrearOperacion;