import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';
import ListadoDocumentosOfertasListaCorta from './ListadoDocumentosOfertasListaCorta';
import ListadoDocumentosEvaluacionListaCorta from './ListadoDocumentosEvaluacionListaCorta';
import Switch from '@material-ui/core/Switch';
import ListadoDocumentosConceptoObligatorio from './ListadoDocumentosConceptoObligatorio';

export default function OtorgarNoObjecionEvaluacionListaCorta(props) {
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

    // Approve this plan
    const approve = () => {
        let user = localStorage.getItem("bidID");
        if (state.checkedA) {
            swal({
                text: 'Ingrese el comentario de la no objeción',
                content: {
                    element: "input",
                },
                button: {
                    text: "Enviar"
                },
                icon: "success",
            }).then((razon => {
                if (razon) {
                    axios.post(props.url + "api/otorgar-no-objecion-evaluacion-lista-corta",
                        {
                            id: props.match.params.id,
                            user,
                            razon
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
                }
            }));

        } else {
            swal("Alerta", "Debe de marcar la aprobación", "error");
        }
    }

    let concepto_obligatorio = activity.concepto_obligatorio_evaluacion_lista_corta;
    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container space-bellow">
                <h1>
                    Otorgar no objecion evaluación lista corta
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
                <h2>
                    {props.match.params.description}
                </h2>

                <div className="hero space-bellow">
                    <div className="row">
                        <div className="row">
                            <ListadoDocumentosOfertasListaCorta
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
                    <ListadoDocumentosEvaluacionListaCorta
                            id={props.match.params.id}
                            url={props.url}
                            urlDocs={props.urlDocs}
                        />
                </div>

                <div className="full">
                    <ListadoDocumentosConceptoObligatorio
                        id={props.match.params.id}
                        tipo={props.match.params.tipo}
                        url={props.url}
                        urlDocs={props.urlDocs}
                        delete={false}
                        cs_estado_proceso_id={65}
                        type={1}
                    />
                </div>

                <div className="full">
                    <ListadoDocumentosConceptoObligatorio
                        id={props.match.params.id}
                        tipo={props.match.params.tipo}
                        url={props.url}
                        urlDocs={props.urlDocs}
                        delete={true}
                        cs_estado_proceso_id={66}
                        type={2}
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
                    </div>
                </div>
            </div>
        </div>
    );
}