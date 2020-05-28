import React, { useState, useEffect } from 'react';
import axios from 'axios';

//Components
import PlanHeader from './PlanHeader';
import PlanDetail from './PlanDetail';

function ViewPlan(props) {

    const [rows, setRows] = useState(null);
    const [plan, setPlan] = useState(null);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        axios.post(props.url + "api/get-plan-items",
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

        if (props && props.processes) {
            let plan = props.processes.find((key) => parseInt(key.id) === parseInt(props.match.params.id))
            setPlan(plan);
        }
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
            <PlanHeader
                plan={plan}
                urlDocs={props.urlDocs}
            />
            <PlanDetail
                rows={rows}
                urlDocs={props.urlDocs}
                url={props.url}
                removeLine={removeLine}
                history={props.history}
            />

        </div>
    );
}

export default ViewPlan;