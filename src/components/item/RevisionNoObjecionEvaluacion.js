import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';
import ListadoDocumentosOfertas from './ListadoDocumentosOfertas';
import ListadoDocumentosEvaluacion from './ListadoDocumentosEvaluacion';
import Switch from '@material-ui/core/Switch';

export default function RevisionNoObjecionEvaluacion(props) {
    const [activity, setActivity] = useState(false);
    const [state, setState] = useState({
        checkedA: false
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

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

    // Objecion
    const deny = () => {
        let user = localStorage.getItem("bidID");
            
        swal({
            text: 'Rechazo de no objeción',
            content: {
                element: "input",
            },
            button: {
                text: "Enviar"
            },
            icon: "info",
        }).then((razon => {
            if(razon){
                axios.post(props.url + "api/denegar-no-objecion",
                    {
                        id: props.match.params.id,
                        user,
                        razon
                    }
                )
                    .then(function () {
                        swal("Información", "Se ha enviado el rechazo de la no objeción", "info")
                            .then(() => {
                                props.getProcesses();
                                props.history.goBack();
                            });
                    })
                    .catch(function (error) {
                        console.log(error);
                });
            } else {
                swal("Información", "Debe de ingresar el comentario para el rechazo.", "error")
            }
        }));
    }
    // Approve this plan
    const approve = () => {
        let user = localStorage.getItem("bidID");
        if (state.checkedA) {           
            axios.post(props.url + "api/revision-no-objecion-evaluacion",
                {
                    id: props.match.params.id,
                    user
                }
            )
                .then(function () {
                    swal("Información", "Se ha enviado la no objeción", "info")
                        .then(() => {
                            props.getProcesses();
                            props.history.goBack();
                        });
                })
                .catch(function (error) {
                    console.log(error);
            });

        } else {
            swal("Alerta", "Debe de marcar la aprobación", "error");
        }
    }

    let concepto_obligatorio = activity.concepto_obligatorio_evaluacion;
    let no_objecion_evaluacion = activity.no_objecion_evaluacion;
    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container space-bellow">
                <h1>
                    Revisión de no objecion evaluación
                </h1>
                {
                    concepto_obligatorio!=="" ?
                    (
                        <div className="hero concepto_obligatorio space-bellow">
                            <h3 className="concepto_obligatorio">
                                <FontAwesomeIcon icon="info-square" />
                                Concepto Obligatorio
                                <div className="text">
                                    <span dangerouslySetInnerHTML={{__html: concepto_obligatorio}} />
                                </div>
                            </h3>
                        </div>
                    ) : ""
                }
                {
                    no_objecion_evaluacion!=="" ?
                    (
                        <div className="hero concepto_obligatorio space-bellow">
                            <h3 className="concepto_obligatorio">
                                <FontAwesomeIcon icon="info-square" />
                                Comentario no objeción
                                <div className="text">
                                    <span dangerouslySetInnerHTML={{__html: no_objecion_evaluacion}} />
                                </div>
                            </h3>
                        </div>
                    ) : ""
                }
                <h2>
                    {props.match.params.description}
                </h2>

                <div className="hero space-bellow">
                    <div className="row">
                        <div className="row">
                            <ListadoDocumentosOfertas
                                    id={props.match.params.id}
                                    tipo={props.match.params.tipo}
                                    url={props.url}
                                    urlDocs={props.urlDocs}
                                    delete={false}
                                />
                        </div>
                    </div>
                </div>

                <div className="hero space-bellow">
                    <ListadoDocumentosEvaluacion
                            id={props.match.params.id}
                            url={props.url}
                            urlDocs={props.urlDocs}
                        />
                </div>
                <div className="row">
                    <h2>
                        Certificación
                    </h2>
                    <div className="full">
                        <label htmlFor="checkedA" className="switch">
                            <Switch
                                checked={state.checkedA}
                                onChange={handleChange}
                                color="primary"
                                name="checkedA"
                                id="checkedA"
                                inputProps={{ 'aria-label': 'Certifico que cumple con todos los requerimientos técnicos.' }}
                            />
                            Certifico que cumple con todos los documentos base.
                        </label>
                    </div>
                    <div className="full">
                        <button type="button" className="save" onClick={approve}>
                            <FontAwesomeIcon icon="save" /> Aprobar
                        </button>
                        <button type="button" className="cancel" onClick={deny}>
                            <FontAwesomeIcon icon="exclamation-triangle" /> Objeción
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}