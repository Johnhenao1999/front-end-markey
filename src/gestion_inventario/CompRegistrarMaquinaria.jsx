import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";


let currentUrl = window.location.href;

let URI = 'https://markey-confecciones.up.railway.app/registrar-maquinaria';

if (currentUrl.includes('localhost')) {
    URI = 'http://localhost:8000/registrar-maquinaria'
}

const CompRegistrarMaquinaria = () => {
    const [nombre, setNombre] = useState('');
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');
    const [fecha_funcionamiento, setFechaFuncionamiento] = useState(new Date());
    const [referencia_agujas, setReferenciaAgujas] = useState('');
    const [estado, setEstadoMaquina] = useState('');

    const navigate = useNavigate();



    // Procedimiento para guardar una maquina
    const submitData = async () => {
        const data = await axios.post(URI, {
            nombre: nombre,
            modelo: modelo,
            marca: marca,
            fecha_funcionamiento: fecha_funcionamiento.toISOString().slice(0, 10),
            referencia_agujas: referencia_agujas,
            estado: estado

        });

        console.log("Que se esta enviando", data)
    };


    return (
        <div className='cmp-markey-container-add-pedido'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <nav class="breadcrumb">
                    <ul>
                        <li><Link to={'/homeAdministrador'}>Inicio</Link></li>
                        <li><Link to={'/maquinaria'}>Máquinaria</Link></li>
                        <li><Link to={'/proveedores'}>Registrar máquinaria</Link></li>
                    </ul>
                </nav>
                <p className='cmp-title-section-scree'>Registrar máquinaria</p>
                <div className='markey-container-form-input'>
                    <ul className='cmp-markey-datos-input-employees'>
                        <li>
                            <input
                                type="text"
                                className='markey-input-form'
                                name="nombre"
                                placeholder='Nombre máquina'
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </li>
                    </ul>
                    <ul className='cmp-markey-datos-input-employees'>
                        <li>
                            <input
                                type="text"
                                name="modelo"
                                className='markey-input-form'
                                placeholder='Nombre del modelo'
                                value={modelo}
                                onChange={(e) => setModelo(e.target.value)}
                            />
                        </li>
                        <li>
                            <input
                                type="text"
                                className='markey-input-form'
                                name="marca"
                                placeholder='Marca'
                                value={marca}
                                onChange={(e) => setMarca(e.target.value)}
                            />
                        </li>
                    </ul>
                    <ul className='cmp-markey-datos-input-employees'>
                        <li>
                            <select value={estado} onChange={(e) => setEstadoMaquina(e.target.value)} className='cmp-markey-select'>
                                <option value="">Estado de la maquina</option>
                                <option value="Buena">Buena</option>
                                <option value="Regular">Regular</option>
                                <option value="Mala">Mala</option>
                            </select>
                        </li>
                        <li>
                            <input
                                type="text"
                                className='markey-input-form'
                                name="agujas"
                                placeholder='Referencia agujas'
                                value={referencia_agujas}
                                onChange={(e) => setReferenciaAgujas(e.target.value)}
                            />
                        </li>
                    </ul>
                </div>
                <div className='markey-container-form-input'>
                    <p className='markey-subtitle-employees'>Fecha de funcionamiento de la máquina</p>
                    <DatePicker
                        selected={fecha_funcionamiento}
                        onChange={(date) => setFechaFuncionamiento(date)}
                        inline
                        dateFormat="dd/MM/yyyy"
                        showYearDropdown
                        yearDropdownItemNumber={10}
                    />
                </div>
                <div>
                    <button
                        className='button-enviar-form'
                        onClick={() => {
                            submitData();
                            navigate('/maquinaria');
                        }}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompRegistrarMaquinaria;