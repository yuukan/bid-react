import React, { useState, useEffect } from 'react';
import axios from 'axios';

//Components
import PlanDetail from './PlanDetailEnmiendas';

export default function Enmiendas(props) {

    const [rows, setRows] = useState(null);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        axios.post(props.url + "api/get-enmienda-items",
            {
                id: props.match.params.id
            }
        )
            .then(function (response) {
                setRows(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [props]);


    const removeLine = id => {
        let rs = rows.filter(e => {
            return parseInt(e.id) !== parseInt(id);
        });
        setRows(rs);
    };



    //####################################Return####################################
    return (
        <div className="crear-container">
            <PlanDetail
                rows={rows}
                id={props.match.params.id}
                urlDocs={props.urlDocs}
                url={props.url}
                removeLine={removeLine}
                history={props.history}
                edit={true}
            />

        </div>
    );
}