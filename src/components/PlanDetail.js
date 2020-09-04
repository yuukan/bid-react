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
import { CloudUpload,NoteAdd, AssignmentTurnedIn,LocalAtm,SettingsInputComposite,VerifiedUser,OfflinePin,Assignment,DoneOutline, ShoppingCart,Healing,PostAdd,AssignmentTurnedInOutlined,VisibilityOutlined,PlayArrow,RateReview, LibraryAddCheck,Comment, CommentOutlined, EventNote, FormatListNumbered, Equalizer, CheckBox,DoneAll,MonetizationOn,ShoppingCartOutlined, PostAddSharp,AssignmentTurnedInTwoTone,PlayArrowOutlined,VerifiedUserOutlined,LibraryAddCheckOutlined,OfflinePinOutlined,AssignmentOutlined,RateReviewOutlined,PostAddOutlined,EventNoteOutlined } from '@material-ui/icons/';

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
    { title: 'Estado', field: 'estado_text' },
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
            let profile = localStorage.getItem("bidProfile");
            let user = localStorage.getItem("bidID");
            actions = [
                rowData => ({
                    icon: () => rowData.estado === 16 || rowData.estado === 18 ? <CloudUpload color="error" /> : <CloudUpload />,
                    tooltip: 'Subir Documentos',
                    hidden: !["8","10"].includes(profile),
                    onClick: (event, rowData) => {
                        props.history.push("/subir-documentos-item/" + rowData.id + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <LocalAtm />,
                    tooltip: 'Aprobación presupuestaria',
                    hidden: !["6","10"].includes(profile) || !(rowData.estado >= 12),
                    onClick: (event, rowData) => {
                        props.history.push("/item/aprobacion-presupuestaria/" + rowData.id+"/"+rowData.actividad);
                    },
                }),
                rowData => ({
                    icon: () => <SettingsInputComposite />,
                    tooltip: 'Certificación Técnica',
                    hidden: !["4","10"].includes(profile) || !(rowData.estado === 12),
                    onClick: (event, rowData) => {
                        props.history.push("/item/certificacion-tecnica/" + rowData.id+"/"+rowData.actividad);
                    },
                }),
                rowData => ({
                    icon: () => rowData.estado === 19 || rowData.estado === 21 || rowData.estado === 23 || rowData.estado === 25 || rowData.estado === 27 ? <NoteAdd color="error" /> : <NoteAdd />,
                    tooltip: 'Cargar Documentos Base',
                    hidden: !["7","10"].includes(profile) || !(rowData.estado === 17 || rowData.estado === 21 || rowData.estado === 23 || rowData.estado === 25 || rowData.estado === 27),
                    onClick: (event, rowData) => {
                        props.history.push("/item/subir-documentos-base/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <VerifiedUser />,
                    tooltip: 'Aprobación del Director',
                    hidden: !["4","10"].includes(profile) || !(rowData.estado === 19),
                    onClick: (event, rowData) => {
                        props.history.push("/item/aprobacion-director/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <OfflinePin />,
                    tooltip: 'Validación de Jefe de Equipo',
                    hidden: !["2","10"].includes(profile) || !(rowData.estado === 20),
                    onClick: (event, rowData) => {
                        props.history.push("/item/validacion-jefe-equipo/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <Assignment />,
                    tooltip: 'Concepto Obligatorio',
                    hidden: !["3","10"].includes(profile) || !(rowData.estado === 22),
                    onClick: (event, rowData) => {
                        props.history.push("/item/concepto-obligatorio/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <DoneOutline />,
                    tooltip: 'Aprobación Final',
                    hidden: !["2","10"].includes(profile) || !(rowData.estado === 24),
                    onClick: (event, rowData) => {
                        props.history.push("/item/aprobacion-final/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <AssignmentTurnedIn />,
                    tooltip: 'Aprobación Especialista Sectorial',
                    hidden: !["2","10"].includes(profile) || rowData.estado !== 15,
                    onClick: (event, rowData) => {
                        props.history.push("/item/certificacion-especialista-sectorial/" + rowData.id+"/"+rowData.actividad);
                    },
                }),
                rowData => ({
                    icon: () => rowData.estado === 39 || rowData.estado === 41 || rowData.estado === 43 ? <Healing color="error" /> : <Healing />,
                    tooltip: 'Solicitud Enmienda',
                    hidden: !["4","10"].includes(profile) || !((rowData.estado!==27 && rowData.estado > 25) || rowData.estado === 39 || rowData.estado === 41 || rowData.estado === 43),
                    onClick: (event, rowData) => {
                        props.history.push("/item/solicitud-enmienda/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => rowData.estado === 42 ? <ShoppingCart color="primary" /> : <ShoppingCart />,
                    tooltip: 'Llamado a licitación',
                    hidden: !["7","10"].includes(profile) || !(rowData.estado >= 26),
                    onClick: (event, rowData) => {
                        props.history.push("/item/llamado-licitacion/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <PostAdd />,
                    tooltip: [1,2,3].includes(rowData.cs_tipo_plan) ? 'Recepción de ofertas' : rowData.cs_metodo_seleccion_id!==4 ? 'Recepción de expresión de interés' : 'Recepción de expresión de interés para lista corta',
                    hidden: !["7","11","10"].includes(profile) || !(rowData.estado === 28 && rowData.licitacion_ended===1),
                    onClick: (event, rowData) => {
                        props.history.push("/item/recepcion-ofertas/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <AssignmentTurnedInOutlined />,
                    tooltip: [1,2,3].includes(rowData.cs_tipo_plan) ? 'Evaluación de ofertas' : rowData.cs_metodo_seleccion_id!==4 ? 'Evaluación de expresión de interés' : 'Evaluación de expresión de interés para lista corta',
                    hidden: !["4","10"].includes(profile) || !(rowData.estado === 29 && rowData.licitacion_ended===1),
                    onClick: (event, rowData) => {
                        props.history.push("/item/evaluacion-ofertas/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <VisibilityOutlined />,
                    tooltip: [1,2,3].includes(rowData.cs_tipo_plan) ? 'Ver ofertas' : rowData.cs_metodo_seleccion_id!==4 ? 'Ver expresión de interés' : 'Ver expresión de interés para lista corta',
                    hidden: !(rowData.estado >= 30 && rowData.estado < 54 && rowData.licitacion_ended===1),
                    onClick: (event, rowData) => {
                        props.history.push("/item/ver-ofertas/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <PlayArrow />,
                    tooltip: rowData.cs_metodo_seleccion_id!==4 ? 'Inicio Evaluación' : 'Inicio Evaluación para lista corta',
                    hidden: !["11","4","10"].includes(profile) || !(rowData.estado === 30 || rowData.estado === 47),
                    onClick: (event, rowData) => {
                        props.history.push("/item/inicio-valuacion/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <Comment />,
                    tooltip: rowData.cs_metodo_seleccion_id!==4 ? 'Solicitar comentario de conformidad' : 'Solicitar comentario de conformidad para lista corta',
                    hidden: !["4","10"].includes(profile) || !(rowData.estado === 31),
                    onClick: (event, rowData) => {
                        props.history.push("/item/solicitar-comentario-conformidad/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => rowData.estado === 50 ? <VerifiedUser color="error" /> : <VerifiedUser />,
                    tooltip: rowData.cs_metodo_seleccion_id!==4 ? 'Evaluación Director verificación' : 'Evaluación Director verificación para lista corta',
                    hidden: !["4","10"].includes(profile) || !(rowData.estado === 32 || rowData.estado === 50),
                    onClick: (event, rowData) => {
                        props.history.push("/item/evaluacion-director-verificacion/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <OfflinePin />,
                    tooltip: rowData.cs_metodo_seleccion_id!==4 ? 'Verificación Evaluación Jefe de Equipo' : 'Verificación Evaluación Jefe de Equipo para lista corta',
                    hidden: !["2","10"].includes(profile) || !(rowData.estado === 33),
                    onClick: (event, rowData) => {
                        props.history.push("/item/verificacion-evaluacion-jefe-equipo/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <Assignment />,
                    tooltip: rowData.cs_metodo_seleccion_id!==4 ? 'Concepto obligatorio evaluación' : 'Concepto obligatorio evaluación para lista corta',
                    hidden: !["3","10"].includes(profile) || !(rowData.estado === 35),
                    onClick: (event, rowData) => {
                        props.history.push("/item/concepto-obligatorio-evaluacion/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <VerifiedUser />,
                    tooltip: rowData.cs_metodo_seleccion_id!==4 ? 'Otorgar no objeción evaluación' : 'Otorgar no objeción evaluación para lista corta',
                    hidden: !["2","10"].includes(profile) || !(rowData.estado === 36),
                    onClick: (event, rowData) => {
                        props.history.push("/item/otorgar-no-objecion-evaluacion/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <RateReview />,
                    tooltip: rowData.cs_metodo_seleccion_id!==4 ? 'Revisión no objeción evaluación' : 'Revisión no objeción evaluación para lista corta',
                    hidden: !["4","10"].includes(profile) || !(rowData.estado === 44),
                    onClick: (event, rowData) => {
                        props.history.push("/item/revision-no-objecion-evaluacion/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <PostAdd />,
                    tooltip: 'Aprobación de informe',
                    hidden: !["11","10"].includes(profile) || !((rowData.estado === 45 && rowData.cs_metodo_seleccion_id!==4)),
                    onClick: (event, rowData) => {
                        props.history.push("/item/aprobacion-informe/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <EventNote />,
                    tooltip: 'Ver Fechas de contratos',
                    hidden: !(rowData.estado === 46),
                    onClick: (event, rowData) => {
                        props.history.push("/item/aprobacion-informe/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <EventNoteOutlined />,
                    tooltip: 'Aprobación de informe lista corta',
                    hidden: !["11","10"].includes(profile) || !((rowData.estado === 70 && rowData.cs_metodo_seleccion_id===4)),
                    onClick: (event, rowData) => {
                        props.history.push("/item/aprobacion-informe-lista-corta/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <LibraryAddCheck />,
                    tooltip: rowData.cs_metodo_seleccion_id!==4 ? 'Verificación de información' : 'Verificación de información para lista corta',
                    hidden: !["7","8","10"].includes(profile) || !(rowData.estado === 34),
                    onClick: (event, rowData) => {
                        props.history.push("/item/verificacion-informacion-evaluacion/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <CommentOutlined />,
                    tooltip: rowData.cs_metodo_seleccion_id!==4 ? 'Dar comentario de conformidad' : 'Dar comentario de conformidad para lista corta',
                    hidden:  !["7","10"].includes(profile) || !(rowData.estado === 48),
                    onClick: (event, rowData) => {
                        props.history.push("/item/dar-comentario-conformidad/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <VerifiedUser />,
                    tooltip: rowData.cs_metodo_seleccion_id!==4 ? 'Evaluación comentario conformidad' : 'Evaluación comentario conformidad para lista corta',
                    hidden: !["4","10"].includes(profile) || !(rowData.estado === 49),
                    onClick: (event, rowData) => {
                        props.history.push("/item/evaluacion-director-no-objecion/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => rowData.estado === 53 ? <FormatListNumbered color="error" /> : <FormatListNumbered />,
                    tooltip: 'Suscripción del contrato',
                    hidden: !["7","10"].includes(profile) || !(rowData.estado === 46 || rowData.estado === 53 || rowData.estado === 70),
                    onClick: (event, rowData) => {
                        props.history.push("/item/registro-del-contrato/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <VerifiedUser />,
                    tooltip: 'Aprobación de contrato del jefe de equipo',
                    hidden: !["4","10"].includes(profile) || !(rowData.estado === 51),
                    onClick: (event, rowData) => {
                        props.history.push("/item/aprobacion-contrato/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <Comment />,
                    tooltip: 'Comentarios Analista operaciones',
                    hidden: !["1","10"].includes(profile) || !(rowData.estado === 52),
                    onClick: (event, rowData) => {
                        props.history.push("/item/comentarios-analista/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <AssignmentTurnedIn />,
                    tooltip: 'Registro del contrato',
                    hidden: !["2","10"].includes(profile) || !(rowData.estado === 71),
                    onClick: (event, rowData) => {
                        props.history.push("/item/registro-contrato/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <EventNote />,
                    tooltip: 'Completar información del contrato',
                    hidden: !["5","10"].includes(profile) || !(rowData.estado === 72) || !(rowData.cs_app_user_id===user),
                    onClick: (event, rowData) => {
                        props.history.push("/item/completar-contrato/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <Equalizer />,
                    tooltip: 'Completar producto',
                    hidden: !["7","10"].includes(profile) || !(rowData.estado === 73),
                    onClick: (event, rowData) => {
                        props.history.push("/item/completar-producto/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <CheckBox />,
                    tooltip: 'Aprobar producto',
                    hidden: !["5","10"].includes(profile) || !(rowData.estado === 73 && rowData.q_supervisor>0),
                    onClick: (event, rowData) => {
                        props.history.push("/item/aprobar-producto/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <DoneAll />,
                    tooltip: 'Aprobar producto director',
                    hidden: !["4","10"].includes(profile) || !(rowData.estado === 73 && rowData.q_director>0),
                    onClick: (event, rowData) => {
                        props.history.push("/item/aprobar-producto-director/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <MonetizationOn />,
                    tooltip: 'Gestión de Pago',
                    hidden: !["6","10"].includes(profile) || !(rowData.estado === 73 && rowData.q_financiero>0),
                    onClick: (event, rowData) => {
                        props.history.push("/item/pago-producto/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),

                rowData => ({
                    icon: () => <ShoppingCartOutlined />,
                    tooltip: 'Llamado licitación lista corta',
                    hidden: !["7","10"].includes(profile) || !((rowData.estado === 45 && rowData.cs_metodo_seleccion_id===4)),
                    onClick: (event, rowData) => {
                        props.history.push("/item/llamado-licitacion-lista-corta/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),

                rowData => ({
                    icon: () => <PostAddSharp />,
                    tooltip: 'Recepción de expresión de interés lista corta',
                    hidden: !["11","10"].includes(profile) || !(rowData.estado === 54 && rowData.licitacion_ended_lista_corta===1), 
                    onClick: (event, rowData) => {
                        props.history.push("/item/recepcion-expresion-interes-lista-corta/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <AssignmentTurnedInTwoTone />,
                    tooltip: 'Evaluación de expresión de interés lista corta',
                    hidden: !["4","10"].includes(profile) || !(rowData.estado === 55), 
                    onClick: (event, rowData) => {
                        props.history.push("/item/evaluacion-ofertas-lista-corta/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <PlayArrowOutlined />,
                    tooltip: 'Inicio Evaluación lista corta',
                    hidden: !["11","4","10"].includes(profile) || !(rowData.estado === 56 || rowData.estado === 60),
                    onClick: (event, rowData) => {
                        props.history.push("/item/inicio-valuacion-lista-corta/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => rowData.estado === 68 ? <VerifiedUserOutlined color="error" /> : <VerifiedUserOutlined />,
                    tooltip: 'Evaluación Director verificación lista corta',
                    hidden: !["4","10"].includes(profile) || !(rowData.estado === 57 || rowData.estado === 68),
                    onClick: (event, rowData) => {
                        props.history.push("/item/evaluacion-director-verificacion-lista-corta/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <LibraryAddCheckOutlined />,
                    tooltip: 'Verificación de información lista corta',
                    hidden: !["7","8","10"].includes(profile) || !(rowData.estado === 59),
                    onClick: (event, rowData) => {
                        props.history.push("/item/verificacion-informacion-evaluacion-lista-corta/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <CommentOutlined />,
                    tooltip: 'Solicitar comentario de conformidad lista corta',
                    hidden: !["4","10"].includes(profile) || !(rowData.estado === 61),
                    onClick: (event, rowData) => {
                        props.history.push("/item/solicitar-comentario-conformidad-lista-corta/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <CommentOutlined />,
                    tooltip: 'Dar comentario de conformidad lista corta',
                    hidden: !["7","10"].includes(profile) || !(rowData.estado === 62),
                    onClick: (event, rowData) => {
                        props.history.push("/item/dar-comentario-conformidad-lista-corta/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <VerifiedUserOutlined />,
                    tooltip: 'Evaluación comentario conformidad lista corta',
                    hidden: !["4","10"].includes(profile) || !(rowData.estado === 63),
                    onClick: (event, rowData) => {
                        props.history.push("/item/evaluacion-director-no-objecion-lista-corta/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <OfflinePinOutlined />,
                    tooltip: 'Verificación Evaluación Jefe de Equipo lista corta',
                    hidden: !["2","10"].includes(profile) || !(rowData.estado === 64),
                    onClick: (event, rowData) => {
                        props.history.push("/item/verificacion-evaluacion-jefe-equipo-lista-corta/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <AssignmentOutlined />,
                    tooltip: 'Concepto obligatorio evaluación lista corta',
                    hidden: !["3","10"].includes(profile) || !(rowData.estado === 65),
                    onClick: (event, rowData) => {
                        props.history.push("/item/concepto-obligatorio-evaluacion-lista-corta/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <VerifiedUserOutlined />,
                    tooltip: 'Otorgar no objeción evaluación lista corta',
                    hidden: !["2","10"].includes(profile) || !(rowData.estado === 66),
                    onClick: (event, rowData) => {
                        props.history.push("/item/otorgar-no-objecion-evaluacion-lista-corta/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <RateReviewOutlined />,
                    tooltip: 'Revisión no objeción evaluación lista corta',
                    hidden: !["4","10"].includes(profile) || !(rowData.estado === 67),
                    onClick: (event, rowData) => {
                        props.history.push("/item/revision-no-objecion-evaluacion-lista-corta/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
                rowData => ({
                    icon: () => <PostAddOutlined />,
                    tooltip: 'Aprobación de informe lista corta',
                    hidden: !((rowData.estado === 69 && rowData.cs_metodo_seleccion_id===4)),
                    onClick: (event, rowData) => {
                        props.history.push("/item/aprobacion-informe-lista-corta/" + rowData.id+"/"+rowData.actividad+"/"+rowData.tipo_plan + "/" + rowData.cs_process_id);
                    },
                }),
            ];
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
                                            search: true,
                                            rowStyle: rowData => {

                                                // if(rowData.estado >=37 && rowData.estado <40) {
                                                //     return {backgroundColor: '#FF7F11',color:'black'}; 
                                                // }

                                                // if(rowData.estado >=26 && rowData.estado!==27) {
                                                //     return {color: '#778967'}; 
                                                // }

                                                // if(rowData.estado >= 17 && rowData.estado!==18 && rowData.estado<28) {
                                                //   return {backgroundColor: '#ADC698',color:'white'};
                                                // }
                                                
                                                return {};
                                            }
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
