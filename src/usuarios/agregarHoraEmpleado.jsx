import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './usuarios.css'
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';



const URI = 'http://localhost:8000/holamundo/'

const CompIngresarHora = () => {
    const [horaIngreso, setHoraIngreso] = useState('');
    const [horaSalida, setHoraSalida] = useState('');
    const { idEmpleado } = useParams();




    // Procedimiento para guardar ha un usuario

    const submitData = async () => {
        const data = {
            horaIngreso: horaIngreso,
            horaSalida: horaSalida,
            totalPagar: 0 // Este campo no está en los inputs, así que lo dejamos en 0 por ahora
        };

        const prueba = await axios.post(`${URI}ingresar_fecha/${idEmpleado}`, data); // aquí agregamos el idEmpleado a la URL

        console.log('Datos enviados correctamente');
        console.log("que trae data", prueba)
    };
    return (
        <div>
            <input type="text" placeholder="Hora de ingreso" value={horaIngreso} onChange={(e) => setHoraIngreso(e.target.value)} />
            <input type="text" placeholder="Hora de salida" value={horaSalida} onChange={(e) => setHoraSalida(e.target.value)} />
            <button onClick={submitData}>Enviar</button>
        </div>
    );
};

export default CompIngresarHora;