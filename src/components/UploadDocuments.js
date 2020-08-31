import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';
import ListadoDocumentosConceptoObligatorio from './item/ListadoDocumentosConceptoObligatorio';

export default function UploadDocuments(props) {
    const [plan, setPlan] = useState(null);
    const [pod, setPod] = useState(null);
    const [matriz, setMatriz] = useState(null);
    const [pep, setPep] = useState(null);
    const [contrato, setContrato] = useState(null);
    const [disabled, setDisabled] = useState(false);

    //####################################Save Profile####################################
    const onSubmit = (e) => {
        e.preventDefault();
        if (pod || matriz || pep || contrato) {
            const data = new FormData()
            if (pod)
                data.append('pod', pod);
            if (matriz)
                data.append('matriz', matriz);
            if (pep)
                data.append('pep', pep);
            if (contrato)
                data.append('contrato', contrato);

            data.append('id', props.match.params.id);

            setDisabled(true);
            let user = localStorage.getItem("bidID");
            data.append('user', user);
            axios.post(props.url + "api/upload-documents", data)
                .then(function () {
                    setDisabled(false);
                    swal("Éxito", "!Documentos Cargados!", "success")
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
            swal("Atención", "!Debe de agregar almenos un Archivo!", "error");
        }
        return false;
    };
    //####################################Save Profile####################################

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if (props && props.processes) {
            let plan = props.processes.find((key) => parseInt(key.id) === parseInt(props.match.params.id))
            setPlan(plan);
        }
    }, [props]);
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
                            {
                                plan && plan.pod ?
                                    (
                                        <a target="_blank" className="download" rel="noopener noreferrer" href={props.urlDocs + plan.pod}>
                                            <FontAwesomeIcon icon="download" />
                                            Descargar
                                        </a>
                                    ) : ""
                            }
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
                            {
                                plan && plan.matriz ?
                                    (
                                        <a target="_blank" className="download" rel="noopener noreferrer" href={props.urlDocs + plan.matriz}>
                                            <FontAwesomeIcon icon="download" />
                                            Descargar
                                        </a>
                                    ) : ""
                            }
                        </div>
                    </div>
                    <div className="row file-input space-bellow">
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
                            {
                                plan && plan.pep ?
                                    (
                                        <a target="_blank" className="download" rel="noopener noreferrer" href={props.urlDocs + plan.pep}>
                                            <FontAwesomeIcon icon="download" />
                                            Descargar
                                        </a>
                                    ) : ""
                            }
                        </div>
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
                            {
                                plan && plan.contrato ?
                                    (
                                        <a target="_blank" className="download" rel="noopener noreferrer" href={props.urlDocs + plan.contrato}>
                                            <FontAwesomeIcon icon="download" />
                                            Descargar
                                        </a>
                                    ) : ""
                            }
                        </div>
                    </div>

                    <div className="full">
                        <ListadoDocumentosConceptoObligatorio
                            id={props.match.params.id}
                            tipo={props.match.params.tipo}
                            url={props.url}
                            urlDocs={props.urlDocs}
                            delete={true}
                            cs_estado_proceso_id={1}
                            type={4}
                        />
                    </div>

                    <div className="row">
                        <button type="submit" className="save" disabled={disabled}>
                            <FontAwesomeIcon icon="save" /> Guardar
                            <LinearProgress />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}