import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';
import ListadoDocumentos from './ListadoDocumentos';

export default function SubirDocumentos(props) {
    const [pod, setPod] = useState(null);
    const [disabled, setDisabled] = useState(false);

    //####################################Save Profile####################################
    const onSubmit = (e) => {
        e.preventDefault();
        if (pod) {
            const data = new FormData()
            for(let i =0;i<pod.length;i++){
                data.append('pod[]', pod[i]);
            }

            data.append('id', props.match.params.id);

            setDisabled(true);
            let user = localStorage.getItem("bidID");
            data.append('user', user);
            axios.post(props.url + "api/upload-item-documents", data)
                .then(function () {
                    setDisabled(false);
                    swal("Éxito", "!Documentos Cargados!", "success");
                    setPod(null);
                    e.target.reset();
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            swal("Atención", "!Debe de seleccionar Archivos!", "error");
        }
        return false;
    };
    //####################################Completar Información#########################################
    const complete_info = () => {
        swal({
            title: "¿Completar Información?",
            text: "Mandaremos los documentos a Aprobación.",
            icon: "warning",
            buttons: ["Cancelar", "Enviar"],
            dangerMode: true,
        })
            .then((certifico) => {
                if (certifico) {
                    let user = localStorage.getItem("bidID");
                    axios.post(props.url + "api/completar-informacion-item",
                        {
                            id: props.match.params.id,
                            user
                        }
                    )
                        .then(function () {
                            props.history.push("/ver-plan/" + props.match.params.parent);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            });
    }
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

                    <ListadoDocumentos
                        id={props.match.params.id}
                        url={props.url}
                        urlDocs={props.urlDocs}
                    />

                    <div className="row">
                        <button type="button" className="completar-informacion" disabled={disabled} onClick={complete_info}>
                            <FontAwesomeIcon icon="save" /> Completar Información
                            <LinearProgress />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}