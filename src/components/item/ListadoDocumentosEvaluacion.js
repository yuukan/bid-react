import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ListadoDocumentosEvaluacion(props) {
    const [row, setRow] = useState(null);

    //####################################Save Profile####################################

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        getFiles();
    }, [props]);
    //####################################Get the list of files for this item####################
    const getFiles = () => {
        axios.post(props.url + "api/get-plan-items-evaluacion-files",
            {
                id: props.id
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
                    axios.post(props.url + "api/delete-item-evaluacion-file",
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


    let files = "";
    if(row){
        files = row.map((key, idx) => {
            return (
                <div className="quarter" key={`it${key.id}`}>
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
            <h3 className="full">
                Listado de documentos de evaluación cargados
            </h3>
            {files}
        </div>
    );
}