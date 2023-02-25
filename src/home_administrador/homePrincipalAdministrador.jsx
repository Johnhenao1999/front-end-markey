import { dividerClasses } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './home.css'

const URI = 'http://localhost:8000/holamundo/'


const CompHomePrincipalAdministrador = () => {

    return (
        <div>
            <header className="header-home">
                Bienvenido administrador
            </header>
            <div className="boton-usuarios">
            {<Link className="boton-usuarios" to="/prueba">CLICK AQUI</Link>}  
            </div>
        </div>
    )

}

export default CompHomePrincipalAdministrador;