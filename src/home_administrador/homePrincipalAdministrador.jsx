import { dividerClasses } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './home.css'
import CompNavegacionVertical from "../navegacion_vertical/navegacion";



const CompHomePrincipalAdministrador = () => {

    return (
        <div>
            <header className="header-home">
                Bienvenido administrador
            </header>
            <CompNavegacionVertical />
        </div>
    )

}

export default CompHomePrincipalAdministrador;