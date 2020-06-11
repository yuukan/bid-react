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
import { CloudUpload, Visibility, Publish, ThumbUp, EmojiObjects, Assignment, VerifiedUser } from '@material-ui/icons/';

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
                                    actions={[
                                        rowData => ({
                                            icon: CloudUpload,
                                            tooltip: 'Subir Documentos',
                                            onClick: (event, rowData) => {
                                                this.props.history.push("/subir-documentos/" + rowData.id);
                                            },
                                        }),
                                        rowData => ({
                                            icon: () => rowData.estado === 8 || rowData.estado === 9 || rowData.estado === 10 || rowData.estado === 11 ? <Publish color="error" /> : <Publish />,
                                            tooltip: 'Subir Plan',
                                            hidden: rowData.estado !== 1 && rowData.estado !== 2 && rowData.estado !== 8 && rowData.estado !== 9 && rowData.estado !== 10 && rowData.estado !== 11,
                                            onClick: (event, rowData) => {
                                                this.props.history.push("/subir-plan/" + rowData.id);
                                            },
                                        }),
                                        rowData => ({
                                            icon: () => rowData.estado === 9 ? <ThumbUp color="error" /> : <ThumbUp />,
                                            tooltip: 'Aprobación jefe unidad ejecutora',
                                            hidden: rowData.estado !== 3 && rowData.estado !== 9,
                                            onClick: (event, rowData) => {
                                                this.props.history.push("/aprobacion-jefe-unidad-ejecutora/" + rowData.id);
                                            },
                                        }),
                                        rowData => ({
                                            icon: () => rowData.estado === 10 ? <EmojiObjects color="error" /> : <EmojiObjects />,
                                            tooltip: 'Aprobación jefe equipo banco',
                                            hidden: rowData.estado !== 4 && rowData.estado !== 10,
                                            onClick: (event, rowData) => {
                                                this.props.history.push("/aprobacion-jefe-equipo-banco/" + rowData.id);
                                            },
                                        }),
                                        rowData => ({
                                            icon: () => rowData.estado === 11 ? <Assignment color="error" /> : <Assignment />,
                                            tooltip: 'Concepto obligatorio',
                                            hidden: rowData.estado !== 5 && rowData.estado !== 11,
                                            onClick: (event, rowData) => {
                                                this.props.history.push("/concepto-obligatorio/" + rowData.id);
                                            },
                                        }),
                                        rowData => ({
                                            icon: VerifiedUser,
                                            tooltip: 'Aprobación Final',
                                            hidden: rowData.estado !== 6,
                                            onClick: (event, rowData) => {
                                                this.props.history.push("/aprobacion-final/" + rowData.id);
                                            },
                                        }),
                                        rowData => ({
                                            icon: Visibility,
                                            tooltip: 'Ver plan de adquisiciones',
                                            hidden: rowData.adquisiciones === "",
                                            onClick: (event, rowData) => {
                                                this.props.history.push("/ver-plan/" + rowData.id);
                                            },
                                        }),
                                    ]}
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
                                            actions: 'Acciones'
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