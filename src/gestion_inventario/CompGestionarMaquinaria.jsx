import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";

const URI = 'http://localhost:8000/maquinas/'

const CompGestionarMaquinaria = () => {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [modelo, setModelo] = useState('');
    const [marca, setMarca] = useState('');
    const [fecha_funcionamiento, setFechaFuncionamiento] = useState(null);
    const [referencia_agujas, setReferenciaAgujas] = useState('');
    const [estado, setEstadoMaquina] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const getMaquinaria = async () => {
            let infoMaquinas = await axios.get(URI + id)
            setNombre(infoMaquinas.data[0].nombre)
            setModelo(infoMaquinas.data[0].modelo)
            setMarca(infoMaquinas.data[0].marca)
            const fechaFuncionamientoString = infoMaquinas.data[0].fecha_funcionamiento;
            const fechaFuncionamientoDate = new Date(fechaFuncionamientoString);
            setFechaFuncionamiento(fechaFuncionamientoDate);
            setReferenciaAgujas(infoMaquinas.data[0].referencia_agujas)
            setEstadoMaquina(infoMaquinas.data[0].estado)
            console.log("que tra maquinas", infoMaquinas)
        }
        getMaquinaria();
    }, [id])

    const actualizar = async () => {
        const fechaFuncionamientoMaquinaria = new Date(fecha_funcionamiento).toISOString().slice(0, 10);
        const maquinaria = { nombre, modelo, marca, fecha_funcionamiento: fechaFuncionamientoMaquinaria, referencia_agujas, estado }
        let oe = await axios.put(URI + id, maquinaria)
        window.location.href = "/maquinaria"
        console.log("Que envia maquina", oe)
    }


    return (
        <div className='cmp-markey-container-add-pedido'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <nav class="breadcrumb">
                    <ul>
                        <li><Link to={'/homeAdministrador'}>Inicio</Link></li>
                        <li><Link to={'/maquinaria'}>Máquinaria</Link></li>
                        <li><Link to={'/proveedores'}>Gestionar máquinaria</Link></li>
                    </ul>
                </nav>
                <p className='cmp-title-section-scree'>Gestionar información de la máquina</p>
                <div className='markey-container-form-input'>
                    <ul className='cmp-markey-datos-input-employees'>
                        <li>
                            <p className='cmp-subtitle-create-pedido'>Nombre</p>
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
                            <p className='cmp-subtitle-create-pedido'>Modelo</p>
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
                            <p className='cmp-subtitle-create-pedido'>Marca</p>
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
                            <p className='cmp-subtitle-create-pedido'>Estado</p>
                            <select value={estado} onChange={(e) => setEstadoMaquina(e.target.value)} className='cmp-markey-select'>
                                <option value="">Estado de la maquina</option>
                                <option value="Buena">Buena</option>
                                <option value="Regular">Regular</option>
                                <option value="Mala">Mala</option>
                            </select>
                        </li>
                        <li>
                            <p className='cmp-subtitle-create-pedido'>Referencia de agujas</p>
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
                    <p className='markey-subtitle-employees'>Fecha de funcionamiento</p>
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
                            actualizar();
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

export default CompGestionarMaquinaria;