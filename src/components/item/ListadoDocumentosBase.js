import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ListadoDocumentosBase(props) {
    const [row, setRow] = useState(null);

    //####################################Save Profile####################################

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        getFiles();
    }, [props]);
    //####################################Get the list of files for this item####################
    const getFiles = () => {
        axios.post(props.url + "api/get-documentos-base",
            {
                id: props.tipo
            }
        )
            .then(function (response) {
                setRow(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    let files = "";
    if(row){
        files = row.map((key, idx) => {
            return (
                <div className="quarter blue" key={`it${key.id}`}>
                    <a href={key.file} download={key.nombre}>
                        <FontAwesomeIcon icon="download" />
                        {key.nombre}
                    </a>
                </div>
            );
        });
    }

    //####################################Return####################################
    return (
        <div className="row flex">
            {files}
        </div>
    );
}