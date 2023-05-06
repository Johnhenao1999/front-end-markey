import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";

const URI = 'http://localhost:8000/registrar-telas'

const CompRegistrarTelas = () => {
    const [nombre, setNombre] = useState('');
    const [color, setColor] = useState('');
    const [metros, setMetros] = useState('');
    const [precio, setPrecio] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [precio_total, setPrecioTotal] = useState('');
    const [, setPrecioTotalFormateado] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const total = metros * precio;
        setPrecioTotal(total);
        setPrecioTotalFormateado(formatoValor(total));
    }, [metros, precio]);

    // Procedimiento para guardar una maquina
    const submitData = async () => {
        const data = await axios.post(URI, {
            nombre: nombre,
            color: color,
            metros: metros,
            precio: precio,
            observaciones: observaciones,
            precio_total: precio_total
        });

        console.log("Que se esta enviando", data)
    };

    function formatoValor(valor) {
        const formatter = new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        });
        return formatter.format(valor).replace("COP", "").trim();
    }

    function handleChange(event) {
        const valor = event.target.value.replace(/\D/g, "");

        if (event.target.name === "Precio") {
            setPrecio(valor);
        }
    }


    return (
        <div className='cmp-markey-container-add-pedido'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
            <nav class="breadcrumb">
                    <ul>
                        <li><Link to={'/homeAdministrador'}>Inicio</Link></li>
                        <li><Link to={'/telas'}>Telas</Link></li>
                        <li><Link to={''}>Registrar telas</Link></li>
                    </ul>
                </nav>
                <p className='cmp-title-section-scree'>Registro de telas</p>
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
                                placeholder='Color'
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </li>
                    </ul>
                    <ul className='cmp-markey-datos-input-employees'>
                        <li>
                            <p className='cmp-subtitle-create-pedido' style={{ color: "transparent" }}>Camtidad</p>
                            <input
                                type="text"
                                className='markey-input-form'
                                name="marca"
                                placeholder='Cantidad (mts)'
                                value={metros}
                                onChange={(e) => setMetros(e.target.value)}
                            />
                        </li>
                        <li>
                            <p className='cmp-subtitle-create-pedido'>Precio x metro</p>
                            <input
                                type="text"
                                className='markey-input-form'
                                name="Precio"
                                placeholder='Precio x metro'
                                value={formatoValor(precio)}
                                onChange={handleChange}
                            />
                        </li>
                    </ul>
                    <ul className='cmp-markey-datos-input-employees'>
                        <li>
                            <p className='cmp-subtitle-create-pedido'>Precio total</p>
                            <input
                                type="text"
                                className='markey-input-form'
                                name="precio_total"
                                placeholder='Precio total'
                                value={formatoValor(precio_total)}
                                onChange={(e) => setPrecioTotal(e.target.value)}
                            />
                        </li>
                    </ul>
                </div>
                <div className='markey-container-form-input'>
                    <p className='markey-subtitle-employees'>Ingresa una obsersavación de la tela</p>
                    <textarea
                        className='cmp-markey-textarea'
                        type="text"
                        placeholder='Escribe una obsersevación de la tela...'
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        className='button-enviar-form'
                        onClick={() => {
                            submitData();
                            navigate('/telas');
                        }}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompRegistrarTelas;