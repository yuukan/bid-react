import React, { Component } from 'react';
import MaterialTable from 'material-table';

import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Star } from '@material-ui/icons/';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'ID', field: 'id' },
                { title: 'Orden', field: 'name' },
                { title: 'Número de Proyecto', field: 'project_number' },
                { title: 'Tipo de Proyecto', field: 'type' },
                { title: 'Ejecutor', field: 'executor' },
            ]
        };
    }

    render() {

        let processes = null;

        if (this.props.processes) processes = this.props.processes;

        return (
            <div className="crear-container">
                <div className="sub-container">
                    <h1>
                        Listado de Ordenes
                    </h1>
                    <div className="list-container">
                        {
                            processes ? (
                                <MaterialTable
                                    icons={tableIcons}
                                    columns={this.state.columns}
                                    data={processes}
                                    title=""
                                    options={{
                                        pageSize: 20
                                    }}
                                    localization={{
                                        pagination: {
                                            labelDisplayedRows: '{from}-{to} de {count}',
                                            labelRowsSelect: 'Filas'
                                        },
                                        toolbar: {
                                            nRowsSelected: '{0} filas(s) seleccionadas',
                                            searchPlaceholder: 'Buscar'
                                        },
                                        header: {
                                            actions: 'Estados'
                                        },
                                        body: {
                                            emptyDataSourceMessage: 'No existen ordenes',
                                            filterRow: {
                                                filterTooltip: 'Filter'
                                            }
                                        }

                                    }}
                                />
                            ) : ""
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default List;