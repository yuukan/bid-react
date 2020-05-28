import React, { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function UploadDocuments(props) {
    const [pod, setPod] = useState(null);
    const [matriz, setMatriz] = useState(null);
    const [pep, setPep] = useState(null);
    const [adquisiciones, setAdquisiciones] = useState(null);
    const [contrato, setContrato] = useState(null);
    const [certifico, setCertifico] = useState(false);

    //####################################Save Profile####################################
    const onSubmit = (e) => {
        e.preventDefault();
        if (pod && matriz && pep && adquisiciones && contrato) {
            if (certifico) {
                const data = new FormData()
                data.append('pod', pod);
                data.append('matriz', matriz);
                data.append('pep', pep);
                data.append('adquisiciones', adquisiciones);
                data.append('contrato', contrato);
                data.append('id', props.match.params.id);

                axios.post(props.url + "api/upload-documents", data)
                    .then(function () {
                        swal("Éxito", "!Operación creada!", "success")
                            .then(() => {
                                props.history.push("/lista");
                            });
                        props.getProcesses();
                        // e.target.reset();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                swal("Atención", "!Debe de marcar la certificación!", "error");
            }
        } else {
            swal("Atención", "!Debe de agregar todos los Archivos!", "error");
        }
        return false;
    };
    //####################################Save Profile####################################

    //####################################Change Checkbox Handler####################################
    const onChangeCheckbox = event => {
        setCertifico(!certifico);
    }
    //####################################Change File Handler####################################
    const onChangeHandler = event => {
        if (event.target.name === "pod") {
            setPod(event.target.files[0]);
        }
        if (event.target.name === "matriz") {
            setMatriz(event.target.files[0]);
        }
        if (event.target.name === "pep") {
            setPep(event.target.files[0]);
        }
        if (event.target.name === "adquisiciones") {
            setAdquisiciones(event.target.files[0]);
        }
        if (event.target.name === "contrato") {
            setContrato(event.target.files[0]);
        }

    }

    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container">
                <h1>
                    Carga de Documentos de la Orden
                </h1>
                <form onSubmit={onSubmit}>
                    <div className="row file-input">
                        <div className="half">
                            <div className="label">
                                Documento de Proyecto (POD)
                            </div>
                            <input type="file" name="pod" id="pod" onChange={onChangeHandler} />
                            <label htmlFor="pod" className={pod ? 'active' : ''}>
                                <FontAwesomeIcon icon="file-upload" />
                                {
                                    pod ? pod.name : "Seleccione un Archivo"
                                }
                            </label>
                        </div>
                        <div className="half">
                            <div className="label">
                                Matriz de Resultados
                            </div>
                            <input type="file" name="matriz" id="matriz" onChange={onChangeHandler} />
                            <label htmlFor="matriz" className={matriz ? 'active' : ''}>
                                <FontAwesomeIcon icon="file-upload" />
                                {
                                    matriz ? matriz.name : "Seleccione un archivo"
                                }
                            </label>
                        </div>
                    </div>
                    <div className="row file-input">
                        <div className="half">
                            <div className="label">
                                Plan de Ejecución de proyecto (PEP)
                            </div>
                            <input type="file" name="pep" id="pep" onChange={onChangeHandler} />
                            <label htmlFor="pep" className={pep ? 'active' : ''}>
                                <FontAwesomeIcon icon="file-upload" />
                                {
                                    pep ? pep.name : "Seleccione un archivo"
                                }
                            </label>
                        </div>
                        <div className="half">
                            <div className="label">
                                Plan de adquisiciones inicial
                            </div>
                            <input type="file" name="adquisiciones" id="adquisiciones" onChange={onChangeHandler} />
                            <label htmlFor="adquisiciones" className={adquisiciones ? 'active' : ''}>
                                <FontAwesomeIcon icon="file-upload" />
                                {
                                    adquisiciones ? adquisiciones.name : "Seleccione un archivo"
                                }
                            </label>
                            <div className="checkbox">
                                <input
                                    type="checkbox"
                                    name="agree"
                                    id="agree"
                                    onChange={onChangeCheckbox}
                                    value={certifico}
                                />
                                <label htmlFor="agree">
                                    Yo certificó que el documento corresponde al plan de adquisiciones vigentes aprobado.
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row file-input">
                        <div className="half">
                            <div className="label">
                                Contrato / Convenio Firmado
                            </div>
                            <input type="file" name="contrato" id="contrato" onChange={onChangeHandler} />
                            <label htmlFor="contrato" className={contrato ? 'active' : ''}>
                                <FontAwesomeIcon icon="file-upload" />
                                {
                                    contrato ? contrato.name : "Seleccione un archivo"
                                }
                            </label>
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

export default UploadDocuments;