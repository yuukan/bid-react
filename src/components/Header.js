import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Header extends Component {
    constructor(props) {
        super(props);
        this.changeMenuStatus = this.changeMenuStatus.bind(this);
        this.state = {
            showMenu: false
        };
    }

    // Change the menu status
    changeMenuStatus() {
        this.setState({ showMenu: !this.state.showMenu });
    }

    
    render() {
        let name = localStorage.getItem("bidName");

        // We check if the user is logged in
        if (!this.props.isLoggedIn) {
            return (
                ""
            );
        }

        let profile = localStorage.getItem("bidProfile");

        let active = !this.state.showMenu ? "" : "active";
        //If it's logged in we display the menu
        return (
            <React.Fragment>
                <header>
                    <img src="images/logo.png" alt="Logo" />
                    <button type="button" className={`bars ${active}`} onClick={this.changeMenuStatus}>
                        <FontAwesomeIcon icon="bars" />
                    </button>
                    <Link className="sign-out" to="/landing" onClick={() => { this.props.changeCurrent("select-evento-live"); this.changeMenuStatus(); this.props.logOff(); }}>
                        <FontAwesomeIcon icon="sign-out" />
                        Salir
                    </Link>
                    <span className="nombre">
                        {name}
                    </span>
                </header>
                <div className={`navbar-container ${active}`}>
                    <div className={`navbar`}>
                        <div className="nav-title">
                            ROP
                        </div>
                        <ul>
                            {
                                ["3", "2", "1", "10"].includes(profile) ?
                                (
                                    <li>
                                        <Link className={this.props.current === "crear" ? "active" : ""} to="/crear-operacion" onClick={() => { this.props.changeCurrent("crear"); this.changeMenuStatus(); }}>
                                            <FontAwesomeIcon icon="plus" />
                                            Crear Operación
                                        </Link>
                                    </li>
                                ) : ""
                            }
                            <li>
                                <Link className={this.props.current === "list" ? "active" : ""} to="/lista" onClick={() => { this.props.changeCurrent("list"); this.changeMenuStatus(); }}>
                                    <FontAwesomeIcon icon="list" />
                                    Listado Ordenes
                                </Link>
                            </li>
                            <li>
                                <Link className={this.props.current === "enmiendas" ? "active" : ""} to="/enmiendas" onClick={() => { this.props.changeCurrent("enmiendas"); this.changeMenuStatus(); }}>
                                    <FontAwesomeIcon icon="tools" />
                                    Enmiendas
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="empty-clickable" onClick={this.changeMenuStatus}></div>
                </div>
            </React.Fragment >
        );
    }
}
export default Header;