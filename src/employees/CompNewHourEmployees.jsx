import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import './usuarios.css'
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";




const URI = 'http://localhost:8000/holamundo/'
const URIE = 'http://localhost:8000/empleados/'
const URI_CONFIGURACIONES = 'http://localhost:8000/configuracion/'

const CompIngresarHora = () => {
    const [horaEntradaManana, setHoraIngresoManana] = useState('');
    const [horaSalidaManana, setHoraSalidaManana] = useState('');
    const [horaIngreso, setHoraIngreso] = useState('');
    const [horaSalida, setHoraSalida] = useState('');
    const [totalHoras, setTotalHoras] = useState(0);
    const [totalMultiplicado, setTotalMultiplicado] = useState(0);
    const [nombreEmpleado, setNombreEmpleado] = useState([]);
    const [nombre_admin, setNombreAdmin] = useState('');
    const [valor_hora, setValorHora] = useState('');

    const navigate = useNavigate();

    const { idEmpleado } = useParams();

    useEffect(() => {
        if (idEmpleado) {
            getInformacionEmpleado(idEmpleado);
        }
    }, [idEmpleado]);


    const getInformacionEmpleado = async (idEmpleado) => {
        const resprueba = await axios.get(`${URIE}${idEmpleado}`);
        setNombreEmpleado(resprueba.data);
        console.log("Que trae resprueba", resprueba)
    };

    useEffect(() => {
        getConfiguraciones();
    }, [])

    const getConfiguraciones = async () => {
        const res = await axios.get(URI_CONFIGURACIONES)
        setNombreAdmin(res.data[0].nombre_admin)
        setValorHora(res.data[0].valor_hora)
        console.log("que tra res", res)
    }


    useEffect(() => {
        const horasManana = calcularHoras(horaEntradaManana, horaSalidaManana);
        const horasTarde = calcularHoras(horaIngreso, horaSalida);
        const total = horasManana + horasTarde;
        setTotalHoras(total.toFixed(2));
        setTotalMultiplicado(total * valor_hora);
    }, [horaEntradaManana, horaSalidaManana, horaIngreso, horaSalida]);

    // Función para calcular las horas entre dos tiempos en formato 'hh:mm'
    const calcularHoras = (horaInicio, horaFin) => {
        if (!horaInicio || !horaFin) {
            return 0;
        }
        const [hhInicio, mmInicio] = horaInicio.split(':');
        const [hhFin, mmFin] = horaFin.split(':');
        const minutosTotales = (parseInt(hhFin) * 60 + parseInt(mmFin)) - (parseInt(hhInicio) * 60 + parseInt(mmInicio));
        return minutosTotales / 60;
    };



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
        <div className='cmp-markey-container-create-employees'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                {nombreEmpleado.length > 0 && (
                    <p className='cmp-title-section-scree'>
                        Registro horas del empleado - <p className='cmp-markey-nombreEmpleado'>{nombreEmpleado[0].nombre} {nombreEmpleado[0].apellido} </p>
                    </p>)}
                <div className='markey-container-form-input'>
                    <p className='markey-subtitle-employees'>Ingresa las horas de la mañana</p>
                    <ul className='cmp-markey-datos-input-employees'>
                        <li>
                            <input
                                type="text"
                                className='markey-input-form'
                                placeholder="Hora de ingreso"
                                value={horaEntradaManana}
                                onChange={(e) => setHoraIngresoManana(e.target.value)} />
                        </li>
                        <li>
                            <input
                                type="text"
                                className='markey-input-form'
                                placeholder="Hora de salida"
                                value={horaSalidaManana} onChange={(e) => setHoraSalidaManana(e.target.value)} />
                        </li>
                    </ul>
                </div>
                <div className='markey-container-form-input'>
                    <p className='markey-subtitle-employees'>Ingresa las horas de la tarde</p>
                    <ul className='cmp-markey-datos-input-employees'>
                        <li>
                            <input
                                type="text"
                                className='markey-input-form'
                                placeholder="Hora de ingreso"
                                value={horaIngreso} onChange={(e) => setHoraIngreso(e.target.value)} />
                        </li>
                        <li>
                            <input
                                type="text"
                                className='markey-input-form'
                                placeholder="Hora de salida"
                                value={horaSalida} onChange={(e) => setHoraSalida(e.target.value)} />
                        </li>
                    </ul>
                </div>
                <div className='markey-container-form-input'>
                    <p className='markey-subtitle-employees'>Total de horas registradas y valor del día</p>
                    <ul className='cmp-markey-datos-input-employees'>
                        <li>
                            <input
                                type="text"
                                className='markey-input-form'
                                placeholder="Hora de ingreso tarde"
                                value={totalHoras} readOnly />
                        </li>
                        <li>
                            <input
                                type="text"
                                className='markey-input-form'
                                value={`$ ${totalMultiplicado.toFixed(2).replace(/\./g, ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`}
                                readOnly
                            />
                        </li>
                    </ul>
                </div>
                <button className='button-enviar-form' onClick={() => {
                    submitData();
                    navigate('/empleados')
                }}>Guardar</button>
            </div>
        </div>

    );
};

export default CompIngresarHora;