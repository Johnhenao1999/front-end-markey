import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";

const URI = 'http://localhost:8000/telas/'

const CompGestionTelas = () => {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [color, setColor] = useState('');
    const [metros, setMetros] = useState('');
    const [precio, setPrecio] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [precio_total, setPrecioTotal] = useState('');
    const [fechaActualiacion,] = useState('');
    const [, setDiasTranscurridos] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const getTelas = async () => {
            let infoTelas = await axios.get(URI + id);
            setNombre(infoTelas.data[0].nombre);
            setColor(infoTelas.data[0].color);
            setMetros(infoTelas.data[0].metros);
            setPrecio(infoTelas.data[0].precio);
            setObservaciones(infoTelas.data[0].observaciones);
            setPrecioTotal(infoTelas.data[0].precio_total);
            const fechaActual = new Date();
            const diasDiferencia = Math.floor((fechaActual - new Date(infoTelas.data[0].fecha_registro)) / (1000 * 60 * 60 * 24));
            setDiasTranscurridos(diasDiferencia);
            console.log("que tra telas", infoTelas)
        }
    
        getTelas();
    }, [id])

    const actualizar = async () => {
        const fechaActual = new Date(fechaActualiacion).toISOString().slice(0, 10);
        const telas = { nombre, color, metros, precio, observaciones, fecha_registro: fechaActual, precio_total }
        let oe = await axios.put(URI + id, telas)
        /*         window.location.href = "/insumos" */
        console.log("Que envia telas", oe)
    }

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
                <p className='cmp-title-section-scree'>Registro de telas</p>
                <div className='markey-container-form-input'>
                    <ul className='cmp-markey-datos-input-employees'>
                        <li>
                        <p className='cmp-subtitle-create-pedido'>Nombre de la tela</p>
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
                        <p className='cmp-subtitle-create-pedido'>Color</p>
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
                        <p className='cmp-subtitle-create-pedido'>Cantidad (mts)</p>
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
                    <p className='markey-subtitle-employees'>Observación registrada</p>
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
                            actualizar();
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

export default CompGestionTelas;