import { dividerClasses } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './home.css'

import CompHeader from "../header/header";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";




const CompHomePrincipalAdministrador = () => {

    return (
        <div>
            <CompHeader />
            <CompNavegacionVertical />
        </div>
    )

}

export default CompHomePrincipalAdministrador;