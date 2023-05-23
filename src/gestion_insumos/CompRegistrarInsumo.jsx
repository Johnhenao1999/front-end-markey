import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";

let currentUrl = window.location.href;

let URI = 'https://markey-confecciones.up.railway.app/registrar-insumo';

if (currentUrl.includes('localhost')) {
    URI = 'http://localhost:8000/registrar-insumo'
}


const CompRegistrarInsumos = () => {
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [color, setColor] = useState('');
    const [tamaño, setTamaño] = useState('');
    const [loading, setLoading] = useState(false); 

    const navigate = useNavigate();



    // Procedimiento para guardar una maquina
/*     const submitData = async () => {
        const data = await axios.post(URI, {
            nombre: nombre,
            cantidad: cantidad,
            color: color,
            tamaño: tamaño
        });

        console.log("Que se esta enviando", data)
    }; */
    const submitData = async () => {
        setLoading(true); // Establecer el estado de carga en true antes de hacer la solicitud
        try {
            const response = await axios.post(URI, {
                nombre: nombre,
                cantidad: cantidad,
                color: color,
                tamaño: tamaño
            });
            console.log("Datos enviados", response.data);
            setLoading(false); // Establecer el estado de carga en false después de recibir la respuesta
            navigate('/insumos');
        } catch (error) {
            setLoading(false); // Establecer el estado de carga en false en caso de error
            console.error("Error al enviar los datos", error);
        }
    };


    return (
        <div className='cmp-markey-container-add-pedido'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <nav class="breadcrumb">
                    <ul>
                        <li><Link to={'/homeAdministrador'}>Inicio</Link></li>
                        <li><Link to={'/insumos'}>Insumos</Link></li>
                        <li><Link to={''}>Registrar insumo</Link></li>
                    </ul>
                </nav>
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
                        }}
                    >
                        {loading ? "Guardando..." : "Guardar"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompRegistrarInsumos;