import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function PlanHeader(props) {

    if (props && props.plan) {
        let plan = props.plan;
        return (
            <React.Fragment>
                <h1>
                    Plan de adquisiciones {plan ? plan.name : ""}
                </h1>
                {
                    plan ?
                        (
                            <div className="row plan-header">
                                <div className="fifth">
                                    <div className="title">
                                        Documento de Proyecto (POD)
                                    </div>
                                    <a target="_blank" rel="noopener noreferrer" href={props.urlDocs + plan.pod}>
                                        <FontAwesomeIcon icon="download" />
                                        Descargar
                                    </a>
                                </div>
                                <div className="fifth">
                                    <div className="title">
                                        Matriz de Resultados
                                    </div>
                                    <a target="_blank" rel="noopener noreferrer" href={props.urlDocs + plan.matriz}>
                                        <FontAwesomeIcon icon="download" />
                                        Descargar
                                    </a>
                                </div>
                                <div className="fifth">
                                    <div className="title">
                                        Plan de Ejecución de proyecto (PEP)
                                    </div>
                                    <a target="_blank" rel="noopener noreferrer" href={props.urlDocs + plan.pep}>
                                        <FontAwesomeIcon icon="download" />
                                        Descargar
                                    </a>
                                </div>
                                <div className="fifth">
                                    <div className="title">
                                        Plan de adquisiciones inicial
                                    </div>
                                    <a target="_blank" rel="noopener noreferrer" href={props.urlDocs + plan.adquisiciones}>
                                        <FontAwesomeIcon icon="download" />
                                        Descargar
                                    </a>
                                </div>
                                <div className="fifth">
                                    <div className="title">
                                        Contrato / Convenio Firmado
                                    </div>
                                    <a target="_blank" rel="noopener noreferrer" href={props.urlDocs + plan.contrato}>
                                        <FontAwesomeIcon icon="download" />
                                        Descargar
                                    </a>
                                </div>
                            </div>
                        ) : ""
                }
            </React.Fragment>
        );
    } else {
        return "";
    }

}

export default PlanHeader;