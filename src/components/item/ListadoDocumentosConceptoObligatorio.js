import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';

export default function ListadoDocumentosConceptoObligatorio(props) {
    const [row, setRow] = useState(null);
    const [pod2, setPod2] = useState(null);
    const [disabled, setDisabled] = useState(false);
    //####################################Save Profile####################################

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        getFiles();
    }, [props]);
    //####################################Get the list of files for this item####################
    const getFiles = () => {
        axios.post(props.url + "api/get-plan-items-co-files",
            {
                id: props.id,
                cs_estado_proceso_id: props.cs_estado_proceso_id
            }
        )
            .then(function (response) {
                setRow(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //####################################Delete the file#########################################
    const delete_file = (id) => {
        swal({
            title: "¿Esta seguro?",
            text: "Esta operación no se puede revertir.",
            icon: "warning",
            buttons: ["Cancelar", "Eliminar"],
            dangerMode: true,
        })
            .then((certifico) => {
                if (certifico) {
                    let user = localStorage.getItem("bidID");
                    axios.post(props.url + "api/delete-item-co-file",
                        {
                            id: id,
                            user
                        }
                    )
                        .then(function (response) {
                            getFiles();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            });
    }
    //####################################Change File Handler####################################
    const onChangeHandler = event => {
        if (event.target.name === "pod2") {
            let fls = [];
            for(let i =0;i<event.target.files.length;i++){
                fls.push(event.target.files[i]);
            }
            setPod2(fls);
        }

    }
    //####################################Upload File####################################
    const onSubmit2 = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (pod2) {
            const data = new FormData()
            for(let i =0;i<pod2.length;i++){
                data.append('pod[]', pod2[i]);
            }
            
            data.append('id', props.id);
            data.append('cs_estado_proceso_id', props.cs_estado_proceso_id);

            setDisabled(true);
            let user = localStorage.getItem("bidID");
            data.append('user', user);
            axios.post(props.url + "api/upload-item-co-documents", data)
                .then(function () {
                    setDisabled(false);
                    swal("Éxito", "!Documentos Cargados!", "success");
                    setPod2(null);
                    getFiles();
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


    let files = "";
    if(row){
        files = row.map((key, idx) => {
            return (
                <div className="quarter enmienda" key={`it${key.id}`}>
                    <a href={props.urlDocs + key.path} download={key.name}>
                        <FontAwesomeIcon icon="download" />
                        {key.name}
                    </a>
                    {
                        props.delete ?
                        (
                            <FontAwesomeIcon icon="trash" onClick={()=>delete_file(key.id)} />
                        ): ""
                    }
                </div>
            );
        });
    }

    //####################################Return####################################
    return (
        <div className="row flex">
            {
                props.delete ?
                (
                    <div className="hero space-bellow">
                        <form onSubmit={onSubmit2}>
                            <div className="row file-input space-bellow">
                                <h4>
                                    Subir documentos
                                    {
                                        props.type === 1 ?
                                        " concepto obligatorio" : 
                                        props.type === 2 ? " no objeción" :
                                        props.type === 3 ? " conformidad"
                                        : " "
                                    }
                                </h4>
                                <div className="full">
                                    <div className="label">
                                        Seleccione Documentos
                                    </div>
                                    <input multiple type="file" name="pod2" id="pod2" onChange={onChangeHandler} />
                                    <label htmlFor="pod2" className={pod2 ? 'active' : ''}>
                                        <FontAwesomeIcon icon="file-upload" />
                                        {
                                            pod2 ? pod2.length+" archivos seleccionados" : "Seleccione un Archivo"
                                        }
                                    </label>
                                    <button type="submit" className="save pull-left" disabled={disabled}>
                                        <FontAwesomeIcon icon="save" /> Subir Archivos
                                        <LinearProgress />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                ):""
            }
            <div className="hero space-bellow">
                <h3 className="full">
                    {
                        props.type === 1 ?
                        "Listado de documentos concepto obligatorio cargados" : 
                        props.type === 2 ? "Listado de documentos no objeción cargados" :
                        props.type === 3 ? "Listado de documentos conformidad cargados" :
                        "Listado de documentos cargados"
                    }
                </h3>
                {files}
            </div>
        </div>
    );
}