import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import swal from 'sweetalert';
import ListadoDocumentosOfertas from './ListadoDocumentosOfertas';
import ListadoDocumentosEvaluacion from './ListadoDocumentosEvaluacion';
import ListadoDocumentosConceptoObligatorio from './ListadoDocumentosConceptoObligatorio';
import Switch from '@material-ui/core/Switch';

export default function DarComentarioConformidad(props) {
    const [activity, setActivity] = useState(false);

    const [state, setState] = useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
        checkedD: false,
        checkedE: false,
        checkedF: false,
        checkedG: false,
        checkedH: false,
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
        if (
            state.checkedA
            && state.checkedB
            && state.checkedC
            && state.checkedD
            && state.checkedE
            && state.checkedF
            && state.checkedG
            && state.checkedH
        ) {
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
        } else {
            swal("Alerta", "Debe de marcar todas las preguntas", "error");
        }
    }

    //####################################Return####################################
    return (
        <div className="crear-container">
            <div className="sub-container space-bellow">
                <h1>
                    {
                        activity && activity.cs_tipo_plan!==4 ? 'Dar comentario de conformidad' : 'Dar comentario de conformidad para lista corta'
                    }
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

                <div className="full">
                    <ListadoDocumentosConceptoObligatorio
                        id={props.match.params.id}
                        tipo={props.match.params.tipo}
                        url={props.url}
                        urlDocs={props.urlDocs}
                        delete={true}
                        cs_estado_proceso_id={48}
                        type={3}
                    />
                </div>


                <div className="full">
                    <label htmlFor="checkedA" className="switch">
                        <Switch
                            checked={state.checkedA}
                            onChange={handleChange}
                            color="primary"
                            name="checkedA"
                            id="checkedA"
                            inputProps={{ 'aria-label': '1. ¿El documento de licitación publicado corresponde al que recibió No Objeción del Banco? ' }}
                        />
                        1. ¿El documento de licitación publicado corresponde al que recibió No Objeción del Banco? 
                    </label>
                </div>
                <div className="full">
                    <label htmlFor="checkedB" className="switch">
                        <Switch
                            checked={state.checkedB}
                            onChange={handleChange}
                            color="primary"
                            name="checkedB"
                            id="checkedB"
                            inputProps={{ 'aria-label': '2. ¿Las publicaciones se realizaron conforme se establece en las políticas del Banco?' }}
                        />
                        2. ¿Las publicaciones se realizaron conforme se establece en las políticas del Banco?
                    </label>
                </div>
                <div className="full">
                    <label htmlFor="checkedC" className="switch">
                        <Switch
                            checked={state.checkedC}
                            onChange={handleChange}
                            color="primary"
                            name="checkedC"
                            id="checkedC"
                            inputProps={{ 'aria-label': '3. ¿La junta o comisión de evaluación se conformó conforme se establece en el ROP o MOP?' }}
                        />
                        3. ¿La junta o comisión de evaluación se conformó conforme se establece en el ROP o MOP?
                    </label>
                </div>
                <div className="full">
                    <label htmlFor="checkedD" className="switch">
                        <Switch
                            checked={state.checkedD}
                            onChange={handleChange}
                            color="primary"
                            name="checkedD"
                            id="checkedD"
                            inputProps={{ 'aria-label': '4. ¿Las ofertas se recibieron según lo establecido en el documento de licitación?' }}
                        />
                        4. ¿Las ofertas se recibieron según lo establecido en el documento de licitación?
                    </label>
                </div>
                <div className="full">
                    <label htmlFor="checkedE" className="switch">
                        <Switch
                            checked={state.checkedE}
                            onChange={handleChange}
                            color="primary"
                            name="checkedE"
                            id="checkedE"
                            inputProps={{ 'aria-label': '5. ¿Todas las consultas de los potenciales oferentes y las inconformidades fueron oportunamente respondidas? ' }}
                        />
                        5. ¿Todas las consultas de los potenciales oferentes y las inconformidades fueron oportunamente respondidas? 
                    </label>
                </div>
                <div className="full">
                    <label htmlFor="checkedF" className="switch">
                        <Switch
                            checked={state.checkedF}
                            onChange={handleChange}
                            color="primary"
                            name="checkedF"
                            id="checkedF"
                            inputProps={{ 'aria-label': '6. ¿La evaluación de ofertas siguió los procedimientos establecidos en el documento de licitación y políticas del Banco? ' }}
                        />
                        6. ¿La evaluación de ofertas siguió los procedimientos establecidos en el documento de licitación y políticas del Banco? 
                    </label>
                </div>
                <div className="full">
                    <label htmlFor="checkedG" className="switch">
                        <Switch
                            checked={state.checkedG}
                            onChange={handleChange}
                            color="primary"
                            name="checkedG"
                            id="checkedG"
                            inputProps={{ 'aria-label': '7. ¿Se verificó que los oferentes no se encuentren en la lista de sancionados por el Banco y son elegibles?' }}
                        />
                        7. ¿Se verificó que los oferentes no se encuentren en la lista de sancionados por el Banco y son elegibles?
                    </label>
                </div>
                <div className="full">
                    <label htmlFor="checkedH" className="switch">
                        <Switch
                            checked={state.checkedH}
                            onChange={handleChange}
                            color="primary"
                            name="checkedH"
                            id="checkedH"
                            inputProps={{ 'aria-label': '8. ¿El Informe de Evaluación y Recomendación de Adjudicación se encuentra completo?' }}
                        />
                        8. ¿El Informe de Evaluación y Recomendación de Adjudicación se encuentra completo?
                    </label>
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