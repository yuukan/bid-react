import React from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from "react-hook-form";

export default function EditarDetallePlan(props) {
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

    let tipo_plan = "";
    if (props && props.tipo_plan) {
        // tipo_plan 
        tipo_plan = props.tipo_plan.map((key, idx) => {
            return (
                <option value={key.id} key={`tp${idx}`}>
                    {key.nombre}
                </option>
            );
        });
    }
    let metodo_seleccion = "";
    if (props && props.metodo_seleccion) {
        // tipo_plan 
        metodo_seleccion = props.metodo_seleccion.map((key, idx) => {
            return (
                <option value={key.id} key={`ms${idx}`}>
                    {key.nombre}
                </option>
            );
        });
    }
    let componente_asociado = "";
    if (props && props.componente_asociado) {
        // tipo_plan 
        componente_asociado = props.componente_asociado.map((key, idx) => {
            return (
                <option value={key.id} key={`ma${idx}`}>
                    {key.nombre}
                </option>
            );
        });
    }
    let metodo_revision = "";
    if (props && props.metodo_revision) {
        // tipo_plan 
        metodo_revision = props.metodo_revision.map((key, idx) => {
            return (
                <option value={key.id} key={`mr${idx}`}>
                    {key.nombre}
                </option>
            );
        });
    }
    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container">
                <h1>
                    Editar Detalle de Plan
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="half">
                            <label htmlFor="tipo_plan">
                                Tipo de plan
                            </label>
                            <select
                                name="tipo_plan"
                                id="tipo_plan"
                                ref={register({
                                    required: 'Obligatorio'
                                })}
                                className={errors.tipo_plan ? 'error' : ''}
                            >
                                <option value="">
                                    Seleccione tipo de plan
                                </option>
                                {tipo_plan}
                            </select>
                            <div className={errors.tipo_plan ? 'error-msg' : 'error-hide'}>
                                {errors.tipo_plan ? errors.tipo_plan.message : 'Error'}
                            </div>
                        </div>
                        <div className="half">
                            <label htmlFor="unidad">
                                Unidad
                            </label>
                            <input
                                type="text"
                                name="unidad"
                                id="unidad"
                                ref={register({
                                    required: 'Obligatorio'
                                })}
                                className={errors.unidad ? 'error' : ''}
                            />
                            <div className={errors.unidad ? 'error-msg' : 'error-hide'}>
                                {errors.unidad ? errors.unidad.message : 'Error'}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="half">
                            <label htmlFor="actividad">
                                Actividad
                            </label>
                            <input
                                type="text"
                                name="actividad"
                                id="actividad"
                                ref={register({
                                    required: 'Obligatorio'
                                })}
                                className={errors.actividad ? 'error' : ''}
                            />
                            <div className={errors.actividad ? 'error-msg' : 'error-hide'}>
                                {errors.actividad ? errors.actividad.message : 'Error'}
                            </div>
                        </div>
                        <div className="half">
                            <label htmlFor="descripcion_adicional">
                                Descripción Adicional
                            </label>
                            <input
                                type="text"
                                name="descripcion_adicional"
                                id="descripcion_adicional"
                                ref={register({
                                    required: 'Obligatorio'
                                })}
                                className={errors.descripcion_adicional ? 'error' : ''}
                            />
                            <div className={errors.descripcion_adicional ? 'error-msg' : 'error-hide'}>
                                {errors.descripcion_adicional ? errors.descripcion_adicional.message : 'Error'}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="half">
                            <label htmlFor="metodo_seleccion">
                                Método de Selección
                            </label>
                            <select
                                name="metodo_seleccion"
                                id="metodo_seleccion"
                                ref={register({
                                    required: 'Obligatorio'
                                })}
                                className={errors.metodo_seleccion ? 'error' : ''}
                            >
                                <option value="">
                                    Seleccione método de selección
                                </option>
                                {metodo_seleccion}
                            </select>
                            <div className={errors.metodo_seleccion ? 'error-msg' : 'error-hide'}>
                                {errors.metodo_seleccion ? errors.metodo_seleccion.message : 'Error'}
                            </div>
                        </div>
                        <div className="half">
                            <label htmlFor="cantidad_lotes">
                                Cantidad de Lotes
                            </label>
                            <input
                                type="number"
                                name="cantidad_lotes"
                                id="cantidad_lotes"
                                ref={register({
                                    required: 'Obligatorio',
                                    pattern: {
                                        value: /^[1-9]\d*(\.\d+)?$/i,
                                        message: "Debe de ser Número"
                                    }
                                })}
                                className={errors.cantidad_lotes ? 'error' : ''}
                            />
                            <div className={errors.cantidad_lotes ? 'error-msg' : 'error-hide'}>
                                {errors.cantidad_lotes ? errors.cantidad_lotes.message : 'Error'}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="half">
                            <label htmlFor="usd">
                                USD
                            </label>
                            <input
                                type="number"
                                name="usd"
                                id="usd"
                                ref={register({
                                    required: 'Obligatorio',
                                    pattern: {
                                        value: /^[1-9]\d*(\.\d+)?$/i,
                                        message: "Debe de ser Número"
                                    }
                                })}
                                className={errors.usd ? 'error' : ''}
                            />
                            <div className={errors.usd ? 'error-msg' : 'error-hide'}>
                                {errors.usd ? errors.usd.message : 'Error'}
                            </div>
                        </div>
                        <div className="half">
                            <label htmlFor="pbid">
                                Porcentaje BID
                            </label>
                            <input
                                type="number"
                                name="pbid"
                                id="pbid"
                                ref={register({
                                    required: 'Obligatorio',
                                    pattern: {
                                        value: /^[1-9]\d*(\.\d+)?$/i,
                                        message: "Debe de ser Número"
                                    }
                                })}
                                className={errors.pbid ? 'error' : ''}
                            />
                            <div className={errors.pbid ? 'error-msg' : 'error-hide'}>
                                {errors.pbid ? errors.pbid.message : 'Error'}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="half">
                            <label htmlFor="pbid">
                                Porcentaje Contraparte
                            </label>
                            <input
                                type="number"
                                name="pcontraparte"
                                id="pcontraparte"
                                ref={register({
                                    required: 'Obligatorio',
                                    pattern: {
                                        value: /^[1-9]\d*(\.\d+)?$/i,
                                        message: "Debe de ser Número"
                                    }
                                })}
                                className={errors.pcontraparte ? 'error' : ''}
                            />
                            <div className={errors.pcontraparte ? 'error-msg' : 'error-hide'}>
                                {errors.pcontraparte ? errors.pcontraparte.message : 'Error'}
                            </div>
                        </div>
                        <div className="half">
                            <label htmlFor="componente_asociado">
                                Componente Asociado
                            </label>
                            <select
                                name="componente_asociado"
                                id="componente_asociado"
                                ref={register({
                                    required: 'Obligatorio'
                                })}
                                className={errors.componente_asociado ? 'error' : ''}
                            >
                                <option value="">
                                    Seleccione componente asociado
                                </option>
                                {componente_asociado}
                            </select>
                            <div className={errors.componente_asociado ? 'error-msg' : 'error-hide'}>
                                {errors.componente_asociado ? errors.componente_asociado.message : 'Error'}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="half">
                            <label htmlFor="metodo_revision">
                                Método de Revisión
                            </label>
                            <select
                                name="metodo_revision"
                                id="metodo_revision"
                                ref={register({
                                    required: 'Obligatorio'
                                })}
                                className={errors.metodo_revision ? 'error' : ''}
                            >
                                <option value="">
                                    Seleccione método de reivisión
                                </option>
                                {metodo_revision}
                            </select>
                            <div className={errors.metodo_revision ? 'error-msg' : 'error-hide'}>
                                {errors.metodo_revision ? errors.metodo_revision.message : 'Error'}
                            </div>
                        </div>
                        <div className="half">
                            <label htmlFor="metodo_seleccion">
                                Método de Revisión
                            </label>
                            <select
                                name="metodo_seleccion"
                                id="metodo_seleccion"
                                ref={register({
                                    required: 'Obligatorio'
                                })}
                                className={errors.metodo_seleccion ? 'error' : ''}
                            >
                                <option value="">
                                    Seleccione método de selección
                                </option>
                                {metodo_seleccion}
                            </select>
                            <div className={errors.metodo_seleccion ? 'error-msg' : 'error-hide'}>
                                {errors.metodo_seleccion ? errors.metodo_seleccion.message : 'Error'}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="half">
                            <label htmlFor="fecha_aprobacion">
                                Aviso especial adquisición
                            </label>
                            <input
                                type="date"
                                name="aviso_especial_adquisicion"
                                id="aviso_especial_adquisicion"
                                ref={register({
                                    required: 'Obligatorio'
                                })}
                                className={errors.aviso_especial_adquisicion ? 'error' : ''}
                            />
                            <div className={errors.aviso_especial_adquisicion ? 'error-msg' : 'error-hide'}>
                                {errors.aviso_especial_adquisicion ? errors.aviso_especial_adquisicion.message : 'Error'}
                            </div>
                        </div>
                        <div className="half">
                            <label htmlFor="firma_contrato">
                                Firma Contrato
                            </label>
                            <input
                                type="date"
                                name="firma_contrato"
                                id="firma_contrato"
                                ref={register({
                                    required: 'Obligatorio'
                                })}
                                className={errors.firma_contrato ? 'error' : ''}
                            />
                            <div className={errors.firma_contrato ? 'error-msg' : 'error-hide'}>
                                {errors.firma_contrato ? errors.firma_contrato.message : 'Error'}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="half">
                            <label htmlFor="comentarios_metodo_seleccion">
                                Comentarios método de selección
                            </label>
                            <input
                                type="text"
                                name="comentarios_metodo_seleccion"
                                id="comentarios_metodo_seleccion"
                                ref={register({
                                    required: 'Obligatorio'
                                })}
                                className={errors.comentarios_metodo_seleccion ? 'error' : ''}
                            />
                            <div className={errors.comentarios_metodo_seleccion ? 'error-msg' : 'error-hide'}>
                                {errors.comentarios_metodo_seleccion ? errors.comentarios_metodo_seleccion.message : 'Error'}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <button type="submit" className="save">
                            <FontAwesomeIcon icon="save" /> Guardar
                        </button>
                        <button type="button" className="cancel" onClick={() => window.history.back()}>
                            <FontAwesomeIcon icon="long-arrow-left" /> Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div >
    );
}