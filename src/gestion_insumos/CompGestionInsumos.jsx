import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";

let currentUrl = window.location.href;

let URI = 'https://markey-confecciones.up.railway.app/insumos/';

if (currentUrl.includes('localhost')) {
    URI = 'http://localhost:8000/insumos/'
}

const CompGestionInsumos = () => {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [fechaActualiacion, setFechaActualizacion] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [color, setColor] = useState('');
    const [tamaño, setTamañoTela] = useState('');
    const [diasTranscurridos, setDiasTranscurridos] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const getInsumos = async () => {
            let infoInsumos = await axios.get(URI + id);
            setNombre(infoInsumos.data[0].nombre);
            setFechaActualizacion(infoInsumos.data[0].fecha_ingreso);
            setCantidad(infoInsumos.data[0].cantidad);
            setColor(infoInsumos.data[0].color);
            setTamañoTela(infoInsumos.data[0].tamaño);
            const fechaActual = new Date();
            const diasDiferencia = Math.floor((fechaActual - new Date(infoInsumos.data[0].fecha_ingreso)) / (1000 * 60 * 60 * 24));
            setDiasTranscurridos(diasDiferencia);
            console.log("que tra maquinas", infoInsumos)
            console.log("diasTranscurridos", diasTranscurridos)
        }
        getInsumos();
    }, [id, diasTranscurridos])


    const actualizar = async () => {
        const fechaActual = new Date(fechaActualiacion).toISOString().slice(0, 10);
        const maquinaria = { nombre, fecha_ingreso: fechaActual, cantidad, color, tamaño }
        let oe = await axios.put(URI + id, maquinaria)
        /*         window.location.href = "/insumos" */
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
                        <li><Link to={'/insumos'}>Insumos</Link></li>
                        <li><Link to={''}>Gestionar insumo</Link></li>
                    </ul>
                </nav>
                <p className='cmp-title-section-scree'>Gestionar información del insumo</p>
                <div>
                    <p style={{ color: "#4481eb", fontWeight: 700 }}>Última actualización: {fechaActualiacion ? new Date(fechaActualiacion).getDate() + ' ' + new Date(fechaActualiacion).toLocaleString('default', { month: 'long' }) + ' de ' + new Date(fechaActualiacion).getFullYear() : ''}</p>
                    {diasTranscurridos && (
                        <p style={{ color: "#4481eb", fontWeight: 700 }}>{diasTranscurridos} días han pasado desde la última actualización.</p>
                    )}
                </div>
                <div className='markey-container-form-input'>
                    <ul className='cmp-markey-datos-input-employees'>
                        <li>
                            <p className='cmp-subtitle-create-pedido'>Tipo de insumo</p>
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
                            <p className='cmp-subtitle-create-pedido'>Cantidad</p>
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
                            <p className='cmp-subtitle-create-pedido'>Color</p>
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
                            <p className='cmp-subtitle-create-pedido'>Selecciona el tamaño</p>
                            <select value={tamaño} onChange={(e) => setTamañoTela(e.target.value)} className='cmp-markey-select'>
                                <option value="">Selecciona el tamaño</option>
                                <option value="Grande">Grande</option>
                                <option value="Mediano">Mediano</option>
                                <option value="Pequeño">Pequeño</option>

                            </select>
                        </li>
                    </ul>
                </div>
                <div>
                    <button
                        className='button-enviar-form'
                        onClick={() => {
                            actualizar();
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

export default CompGestionInsumos;