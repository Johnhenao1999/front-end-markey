import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";

const URI = 'http://localhost:8000/registro-pedidos/'
const uriInfoCliente = 'http://localhost:8000/clientes/'

const CompCrearPedido = () => {
    const [descripcion_pedido, setDescripcionPedido] = useState('');
    const [fecha_finalizacion, setFechaFinalizacion] = useState(new Date());
    const [estado_pedido, setEstadoPedido] = useState('');
    const [anticipoPedido, setAnticipoPedido] = useState('');
    const [precioPedido, setPrecioPedido] = useState('');
    const [precioFaltantePedido, setPrecioFaltante] = useState('');
    const [nombreCliente, setNombreCliente] = useState([]);

    const { id_cliente } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (id_cliente) {
            getInformacionCliente(id_cliente);
        }
    }, [id_cliente]);

    useEffect(() => {
        const precio = parseFloat(precioPedido.replace(/\D/g, ""));
        const anticipo = parseFloat(anticipoPedido.replace(/\D/g, ""));
        const precioFaltante = precio - anticipo > 0 ? precio - anticipo : 0;
        setPrecioFaltante(formatoValor(precioFaltante));
    }, [precioPedido, anticipoPedido]);

    const getInformacionCliente = async (id_cliente) => {
        const resprueba = await axios.get(`${uriInfoCliente}${id_cliente}`);
        setNombreCliente(resprueba.data);
        console.log("Que trae resprueba", resprueba)
    };


    // Procedimiento para guardar ha un usuario
    const submitData = async () => {
        const data = {
            estado_pedido: estado_pedido,
            descripcion_pedido: descripcion_pedido,
            fecha_finalizacion: fecha_finalizacion.toISOString().slice(0, 10),
            precio_pedido: precioPedido,
            anticipo_pedido: anticipoPedido,
            precio_faltante: precioFaltantePedido.replace(/\D/g, "")

        };

        console.log("Que se esta enviando", data)

        const prueba = await axios.post(`${URI}${id_cliente}`, data); // aquí agregamos el idEmpleado a la URL
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

        if (event.target.name === "precioPedido") {
            setPrecioPedido(valor);
        } else if (event.target.name === "anticipoPedido") {
            setAnticipoPedido(valor);
        }
    }

    return (
        <div className='cmp-markey-container-add-pedido'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                {nombreCliente.length > 0 && (
                    <p className='cmp-title-section-scree'>
                        Registro de pedido - <p className='cmp-markey-nombreEmpleado'>{nombreCliente[0].nombre_comercial} </p>
                    </p>)}
                {/*   <p className='cmp-markey-title-add-pedido'>Registro de pedido - <p className='cmp-markey-nombreCliente'> {nombreCliente[0].nombre_comercial}</p>  </p>  */}
                <div className='markey-container-form-input'>
                    <p className='markey-subtitle-employees'>Detalles iniciales del pedido</p>
                    <ul className='cmp-markey-datos-input-employees'>
                        <li>
                            <p className='cmp-subtitle-create-pedido'>Escribe el valor del pedido</p>
                            <input
                                type="text"
                                className='markey-input-form'
                                name="precioPedido"
                                value={formatoValor(precioPedido)}
                                onChange={handleChange}
                            />
                        </li>
                        <li>
                            <p className='cmp-subtitle-create-pedido'>Escribe el valor del anticipo</p>
                            <input
                                type="text"
                                name="anticipoPedido"
                                className='markey-input-form'
                                value={formatoValor(anticipoPedido)}
                                onChange={handleChange}
                            />
                        </li>
                    </ul>
                    <ul className='cmp-markey-datos-input-employees'>
                        <li>
                            <p className='cmp-subtitle-create-pedido'>Saldo faltante del pedido</p>
                            <input
                                type="text"
                                className='markey-input-form'
                                name="precioFaltantePedido"
                                value={precioFaltantePedido}
                                onChange={(e) => setPrecioFaltante(e.target.value)} readOnly
                            />
                        </li>
                        <li>
                            <p style={{ color: "transparent" }}>Saldo faltante del pedido</p>
                            <select value={estado_pedido} onChange={(e) => setEstadoPedido(e.target.value)} className='cmp-markey-select'>
                                <option value="">Estado del pedido</option>
                                <option value="Compra de materia prima">Compra de materia prima</option>
                                <option value="Corte">Corte</option>
                                <option value="Confección">Confección</option>
                                <option value="Control de calidad">Control de calidad</option>
                                <option value="Empaque">Empaque</option>
                                <option value="Entrega del producto">Pedido finalizado</option>
                            </select>
                        </li>
                    </ul>
                </div>
                <div className='markey-container-form-input'>
                    <p className='markey-subtitle-employees'>Fecha prevista finalización del pedido</p>
                    <DatePicker
                        selected={fecha_finalizacion}
                        onChange={(date) => setFechaFinalizacion(date)}
                        inline
                        calendarClassName="custom-calendar"
                    />
                </div>
                <div className='markey-container-form-input'>
                    <p className='markey-subtitle-employees'>Ingresa una obsersavación del pedido</p>
                    <textarea
                        className='cmp-markey-textarea'
                        type="text"
                        placeholder='Escribe una obsersevación del pedido'
                        value={descripcion_pedido}
                        onChange={(e) => setDescripcionPedido(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        className='button-enviar-form'
                        onClick={() => {
                            submitData();
                            navigate(`/pedidos/${id_cliente}`);
                        }}
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompCrearPedido;