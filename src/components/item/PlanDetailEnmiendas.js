import React from 'react';
import Paper from '@material-ui/core/Paper';
import ViewColumn from '@material-ui/icons/ViewColumn';

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
import { SettingsInputComposite,Assignment,DoneOutline } from '@material-ui/icons/';

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

const columns = [
    { title: 'ID', field: 'id' },
    { title: 'Tipo', field: 'tipo' },
    { title: 'Unidad', field: 'unidad' },
    { title: 'Actividad', field: 'actividad' },
    { title: 'Descripción Adicional', field: 'descripcion_adicional' },
    { title: 'Método Selección', field: 'metodo' },
    { title: 'Lotes', field: 'cantidad_lotes' },
    { title: 'Num. Proceso', field: 'numero_proceso' },
    { title: 'USD', field: 'usd', type: 'currency' },
    { title: '% BID', field: 'porcentaje_bid' },
    { title: '% Contraparte', field: 'porcentaje_contraparte' },
    { title: 'Componente Asociado', field: 'componente_asociado' },
    { title: 'Método de Revisión', field: 'metodo_revision' },
    { title: 'Aviso Especial Adquisición', field: 'aviso_especial_adquisicion' },
    { title: 'Firma Contrato', field: 'firma_contrato' },
    { title: 'Comentarios Método Seleccion', field: 'comentarios_metodo_seleccion' },
];
export default function PlanDetail(props) {

    if (props && props.rows) {

        let profile = localStorage.getItem("bidProfile");
        let actions = [];
        if (props.edit) {
            actions = [
                rowData => ({
                    icon: () => <SettingsInputComposite />,
                    tooltip: 'Certificación Técnica Licitación',
                    hidden: !["4","10"].includes(profile) || !(rowData.estado === 37),
                    onClick: (event, rowData) => {
                        props.history.push("/item/certificacion-tecnica-licitacion-enmienda/" + rowData.id+"/"+rowData.actividad);
                    },
                }),
                rowData => ({
                    icon: () => <Assignment />,
                    tooltip: 'Concepto Obligatorio Licitación',
                    hidden: !["3","10"].includes(profile) || !(rowData.estado === 38),
                    onClick: (event, rowData) => {
                        props.history.push("/item/concepto-obligatorio-licitacion-enmienda/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <DoneOutline />,
                    tooltip: 'Aprobación Final Licitación',
                    hidden: !["2","10"].includes(profile) || !(rowData.estado === 40),
                    onClick: (event, rowData) => {
                        props.history.push("/item/aprobacion-final-licitacion-enmienda/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
            ];
        } else {

        }



        return (
            <div className="sub-container">
                <div className="row table">
                    <Paper>
                        {
                            props.rows ?
                                (
                                    <MaterialTable
                                        icons={tableIcons}
                                        columns={columns}
                                        data={props.rows}
                                        title="Enmiendas pendientes"
                                        options={{
                                            pageSize: 20,
                                            headerStyle: {
                                                backgroundColor: '#0b4f76',
                                                color: '#FFF',
                                                textAlign: 'center'
                                            },
                                            rowStyle: rowData => {
                                                
                                                return {};
                                            },
                                            search: false
                                        }}
                                        actions={actions}
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
                    </Paper>
                </div>
            </div>
        );
    } else {
        return "";
    }
}
