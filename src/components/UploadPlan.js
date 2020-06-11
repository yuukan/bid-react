import React, { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';


export default function UploadPlan(props) {
    const [adquisiciones, setAdquisiciones] = useState(null);
    const [disabled, setDisabled] = useState(false);

    //####################################Save Profile####################################
    const onSubmit = (e) => {
        e.preventDefault();
        if (adquisiciones) {
            swal({
                title: "¡Certificación!",
                text: "Yo certificó que el documento corresponde al plan de adquisiciones vigentes aprobado.",
                icon: "warning",
                buttons: ["Cancelar", "Certifico"],
                dangerMode: true,
            })
                .then((certifico) => {
                    if (certifico) {
                        setDisabled(true);
                        const data = new FormData()
                        data.append('adquisiciones', adquisiciones);
                        data.append('id', props.match.params.id);

                        let user = localStorage.getItem("bidID");
                        data.append('user', user);
                        axios.post(props.url + "api/upload-plan", data)
                            .then(function () {
                                setDisabled(false);
                                swal("Éxito", "!Plan cargado!", "success")
                                    .then(() => {
                                        props.history.push("/lista");
                                    });
                                props.getProcesses();
                                // e.target.reset();
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
                });
        } else {
            swal("Atención", "!Debe de seleccionar un archivo de Plan!", "error");
        }
        return false;
    };
    //####################################Save Profile####################################

    //####################################Change File Handler####################################
    const onChangeHandler = event => {
        if (event.target.name === "adquisiciones") {
            setAdquisiciones(event.target.files[0]);
        }

    }

    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container">
                <h1>
                    Carga de Plan de Adquisiciones
                </h1>
                <form onSubmit={onSubmit}>
                    <div className="row file-input">
                        <div className="half">
                            <div className="label">
                                Plan de adquisiciones
                            </div>
                            <input type="file" name="adquisiciones" id="adquisiciones" onChange={onChangeHandler} accept=".xls,.xlsx" />
                            <label htmlFor="adquisiciones" className={adquisiciones ? 'active' : ''}>
                                <FontAwesomeIcon icon="file-upload" />
                                {
                                    adquisiciones ? adquisiciones.name : "Seleccione un archivo"
                                }
                            </label>
                        </div>
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