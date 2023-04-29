import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";

const URI = 'http://localhost:8000/registrar-insumo'

const CompRegistrarInsumos = () => {
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [color, setColor] = useState('');
    const [tamaño, setTamaño] = useState('');

    const navigate = useNavigate();



    // Procedimiento para guardar una maquina
    const submitData = async () => {
        const data = await axios.post(URI, {
            nombre: nombre,
            cantidad: cantidad,
            color: color,
            tamaño: tamaño
        });

        console.log("Que se esta enviando", data)
    };


    return (
        <div className='cmp-markey-container-add-pedido'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <p className='cmp-title-section-scree'>Registro de insumos</p>
                <div className='markey-container-form-input'>
                    <ul className='cmp-markey-datos-input-employees'>
                        <li>
                            <input
                                type="text"
                                className='markey-input-form'
                                name="nombre"
                                placeholder='Nombre'
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </li>
                        <li>
                            <input
                                type="text"
                                name="modelo"
                                className='markey-input-form'
                                placeholder='Cantidad'
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                            />
                        </li>
                    </ul>
                    <ul className='cmp-markey-datos-input-employees'>
                        <li>
                            <input
                                type="text"
                                className='markey-input-form'
                                name="marca"
                                placeholder='Color'
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </li>
                        <li>
                            <select value={tamaño} onChange={(e) => setTamaño(e.target.value)} className='cmp-markey-select'>
                                <option value="">Selecciona el tamaño</option>
                                <option value="Buena">Pequeño</option>
                                <option value="Regular">Mediano</option>
                                <option value="Mala">Grande</option>
                            </select>
                        </li>
                    </ul>
                </div>
                <div>
                    <button
                        className='button-enviar-form'
                        onClick={() => {
                            submitData();
                            navigate('/insumos');
                        }}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompRegistrarInsumos;