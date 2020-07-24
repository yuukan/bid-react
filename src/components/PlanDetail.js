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
import { CloudUpload,NoteAdd, AssignmentTurnedIn,LocalAtm,SettingsInputComposite,VerifiedUser,OfflinePin,Assignment,DoneOutline, ShoppingCart,Healing,PostAdd,AssignmentTurnedInOutlined,VisibilityOutlined,PlayArrow } from '@material-ui/icons/';

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

        let actions = [];
        if (props.edit) {
            actions = [
                // () => ({
                //     icon: DeleteOutline,
                //     tooltip: 'Borrar Fila',
                //     onClick: (event, rowData) => {
                //         // props.history.push("/subir-documentos/" + rowData.id);
                //         swal({
                //             title: "¿Desea eliminar la fila?",
                //             text: "Esto no se puede ",
                //             icon: "error",
                //             buttons: ["No", "Sí"],
                //             dangerMode: true,
                //         })
                //             .then((value) => {
                //                 if (value) {
                //                     axios.post(props.url + "api/delete-plan-detail",
                //                         {
                //                             id: rowData.id
                //                         }
                //                     )
                //                         .then(function (response) {
                //                             props.removeLine(response.data);
                //                             swal("¡Línea eliminada con éxito!", "", "success");
                //                         })
                //                         .catch(function (error) {
                //                             console.log(error);
                //                         });
                //                 }
                //             });
                //     },
                // }),
                rowData => ({
                    icon: () => rowData.estado === 16 || rowData.estado === 18 ? <CloudUpload color="error" /> : <CloudUpload />,
                    tooltip: 'Subir Documentos',
                    onClick: (event, rowData) => {
                        props.history.push("/subir-documentos-item/" + rowData.id + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <LocalAtm />,
                    tooltip: 'Aprobación presupuestaria',
                    hidden: !(rowData.estado >= 12),
                    onClick: (event, rowData) => {
                        props.history.push("/item/aprobacion-presupuestaria/" + rowData.id+"/"+rowData.actividad);
                    },
                }),
                rowData => ({
                    icon: () => rowData.estado === 19 || rowData.estado === 21 || rowData.estado === 23 || rowData.estado === 25 || rowData.estado === 27 ? <NoteAdd color="error" /> : <NoteAdd />,
                    tooltip: 'Cargar Documentos Base',
                    hidden: !(rowData.estado === 17 || rowData.estado === 21 || rowData.estado === 23 || rowData.estado === 25 || rowData.estado === 27),
                    onClick: (event, rowData) => {
                        props.history.push("/item/subir-documentos-base/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <VerifiedUser />,
                    tooltip: 'Aprobación del Director',
                    hidden: !(rowData.estado === 19),
                    onClick: (event, rowData) => {
                        props.history.push("/item/aprobacion-director/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <OfflinePin />,
                    tooltip: 'Validación de Jefe de Equipo',
                    hidden: !(rowData.estado === 20),
                    onClick: (event, rowData) => {
                        props.history.push("/item/validacion-jefe-equipo/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <Assignment />,
                    tooltip: 'Concepto Obligatorio',
                    hidden: !(rowData.estado === 22),
                    onClick: (event, rowData) => {
                        props.history.push("/item/concepto-obligatorio/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <DoneOutline />,
                    tooltip: 'Aprobación Final',
                    hidden: !(rowData.estado === 24),
                    onClick: (event, rowData) => {
                        props.history.push("/item/aprobacion-final/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <SettingsInputComposite />,
                    tooltip: 'Certificación Técnica',
                    hidden: !(rowData.estado === 12),
                    onClick: (event, rowData) => {
                        props.history.push("/item/certificacion-tecnica/" + rowData.id+"/"+rowData.actividad);
                    },
                }),
                rowData => ({
                    icon: () => <AssignmentTurnedIn />,
                    tooltip: 'Aprobación Especialista Sectorial',
                    hidden: rowData.estado !== 15,
                    onClick: (event, rowData) => {
                        props.history.push("/item/certificacion-especialista-sectorial/" + rowData.id+"/"+rowData.actividad);
                    },
                }),
                rowData => ({
                    icon: () => rowData.estado === 39 || rowData.estado === 41 || rowData.estado === 43 ? <Healing color="error" /> : <Healing />,
                    tooltip: 'Solicitud Enmienda',
                    hidden: !((rowData.estado!=27 && rowData.estado > 25) || rowData.estado === 39 || rowData.estado === 41 || rowData.estado === 43),
                    onClick: (event, rowData) => {
                        props.history.push("/item/solicitud-enmienda/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => rowData.estado === 30 || rowData.estado === 32 || rowData.estado === 34 || rowData.estado === 36 ? <ShoppingCart color="error" /> : rowData.estado === 42 ? <ShoppingCart color="primary" /> : <ShoppingCart />,
                    tooltip: 'Llamado a licitación',
                    hidden: !(rowData.estado >= 26),
                    onClick: (event, rowData) => {
                        props.history.push("/item/llamado-licitacion/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <PostAdd />,
                    tooltip: 'Recepción de Ofertas',
                    hidden: !(rowData.estado === 28 && rowData.licitacion_ended===1),
                    onClick: (event, rowData) => {
                        props.history.push("/item/recepcion-ofertas/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <AssignmentTurnedInOutlined />,
                    tooltip: 'Evaluación de Ofertas',
                    hidden: !(rowData.estado === 29 && rowData.licitacion_ended===1),
                    onClick: (event, rowData) => {
                        props.history.push("/item/evaluacion-ofertas/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <VisibilityOutlined />,
                    tooltip: 'Ver Ofertas',
                    hidden: !(rowData.estado >= 30 && rowData.licitacion_ended===1),
                    onClick: (event, rowData) => {
                        props.history.push("/item/ver-ofertas/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <PlayArrow />,
                    tooltip: 'Inicio Evaluación',
                    hidden: !(rowData.estado === 30),
                    onClick: (event, rowData) => {
                        props.history.push("/item/inicio-valuacion/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <VerifiedUser />,
                    tooltip: 'Evaluación Director',
                    hidden: !(rowData.estado === 31),
                    onClick: (event, rowData) => {
                        props.history.push("/item/evaluacion-director-no-objecion/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <VerifiedUser />,
                    tooltip: 'Evaluación Director verificación',
                    hidden: !(rowData.estado === 32),
                    onClick: (event, rowData) => {
                        props.history.push("/item/evaluacion-director-verificacion/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <OfflinePin />,
                    tooltip: 'Verificación Evaluación Jefe de Equipo',
                    hidden: !(rowData.estado === 33),
                    onClick: (event, rowData) => {
                        props.history.push("/item/verificacion-evaluacion-jefe-equipo/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <Assignment />,
                    tooltip: 'Concepto obligatorio evaluacion',
                    hidden: !(rowData.estado === 35),
                    onClick: (event, rowData) => {
                        props.history.push("/item/concepto-obligatorio-evaluacion/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                // rowData => ({
                //     icon: () => <VerifiedUser />,
                //     tooltip: 'Certificación del Director',
                //     hidden: !(rowData.estado === 28 && rowData.licitacion_ended===1),
                //     onClick: (event, rowData) => {
                //         props.history.push("/item/certificacion-director/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                //     },
                // }),
                // rowData => ({
                //     icon: () => <SettingsInputComposite />,
                //     tooltip: 'Certificación Técnica Licitación',
                //     hidden: !(rowData.estado === 29),
                //     onClick: (event, rowData) => {
                //         props.history.push("/item/certificacion-tecnica-licitacion/" + rowData.id+"/"+rowData.actividad);
                //     },
                // }),
                // rowData => ({
                //     icon: () => <Assignment />,
                //     tooltip: 'Concepto Obligatorio Licitación',
                //     hidden: !(rowData.estado === 31),
                //     onClick: (event, rowData) => {
                //         props.history.push("/item/concepto-obligatorio-licitacion/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                //     },
                // }),
                // rowData => ({
                //     icon: () => <DoneOutline />,
                //     tooltip: 'Aprobación Final Licitación',
                //     hidden: !(rowData.estado === 33),
                //     onClick: (event, rowData) => {
                //         props.history.push("/item/aprobacion-final-licitacion/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                //     },
                // }),
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
                                        title="Detalle del Plan"
                                        options={{
                                            pageSize: 20,
                                            headerStyle: {
                                                backgroundColor: '#0b4f76',
                                                color: '#FFF',
                                                textAlign: 'center'
                                            },
                                            rowStyle: rowData => {

                                                if(rowData.estado >=42 && rowData.estado!==43) {
                                                    return {backgroundColor: '#CAA8F5',color:'white'}; 
                                                }

                                                if(rowData.estado >=37 && rowData.estado!==43) {
                                                    return {backgroundColor: '#FF7F11',color:'black'}; 
                                                }

                                                if(rowData.estado >=26 && rowData.estado!==27) {
                                                    return {color: '#778967'}; 
                                                }

                                                if(rowData.estado >= 17 && rowData.estado!==18 && rowData.estado<28) {
                                                  return {backgroundColor: '#ADC698',color:'white'};
                                                }
                                                
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
