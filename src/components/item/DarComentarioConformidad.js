import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';
import ListadoDocumentosOfertas from './ListadoDocumentosOfertas';
import ListadoDocumentosEvaluacion from './ListadoDocumentosEvaluacion';

export default function DarComentarioConformidad(props) {
    // const [activity, setActivity] = useState(false);

    // // Similar to componentDidMount and componentDidUpdate:
    // useEffect(() => {
    //     axios.post(props.url + "api/get-activity-info",
    //         {
    //             id: props.match.params.id
    //         }
    //     )
    //         .then(function (response) {
    //             setActivity(response.data[0]);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }, [props]);

    // Approve this plan
    const approve = () => {
        let user = localStorage.getItem("bidID");
        swal({
            text: 'Ingrese el comentario conformidad',
            content: {
                element: "input",
            },
            button: {
                text: "Enviar"
            },
            icon: "success",
        }).then((razon => {
            if (razon) {
                axios.post(props.url + "api/dar-comentario-conformidad",
                    {
                        id: props.match.params.id,
                        user,
                        razon
                    }
                )
                    .then(function () {
                        swal("Información", "Se ha enviado el comentario de conformidad", "info")
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
    }

    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container space-bellow">
                <h1>
                    Dar comentario de conformidad
                </h1>
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
                    <div className="full">
                        <button type="button" className="save" onClick={approve}>
                            <FontAwesomeIcon icon="save" /> Dar comentario
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}