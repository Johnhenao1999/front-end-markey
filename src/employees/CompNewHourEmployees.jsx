import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './usuarios.css'
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';



const URI = 'http://localhost:8000/holamundo/'

const CompIngresarHora = () => {
    const [horaEntradaManana, setHoraIngresoManana] = useState('');
    const [horaSalidaManana, setHoraSalidaManana] = useState('');
    const [horaIngreso, setHoraIngreso] = useState('');
    const [horaSalida, setHoraSalida] = useState('');

    const { idEmpleado } = useParams();



    // Procedimiento para guardar ha un usuario

    const submitData = async () => {
        const data = {
            horaEntradaManana: horaEntradaManana,
            horaSalidaManana: horaSalidaManana,
            horaIngreso: horaIngreso,
            horaSalida: horaSalida,
        };

        const prueba = await axios.post(`${URI}ingresar_fecha/${idEmpleado}`, data); // aquí agregamos el idEmpleado a la URL
        console.log('Datos enviados correctamente');
        console.log("que trae data", prueba)
    };
    return (
        <div>
            <input type="text" placeholder="Hora de ingreso mañana" value={horaEntradaManana} onChange={(e) => setHoraIngresoManana(e.target.value)} />
            <input type="text" placeholder="Hora de salida mañana" value={horaSalidaManana} onChange={(e) => setHoraSalidaManana(e.target.value)} />
            <input type="text" placeholder="Hora de ingreso tarde" value={horaIngreso} onChange={(e) => setHoraIngreso(e.target.value)} />
            <input type="text" placeholder="Hora de salida tarde" value={horaSalida} onChange={(e) => setHoraSalida(e.target.value)} />
            <Link to="/empleados">
                <button onClick={submitData}>Guardar</button>
            </Link>
        </div>
    );
};

export default CompIngresarHora;