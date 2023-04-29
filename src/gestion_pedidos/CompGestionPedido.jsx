import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";
import DatePicker from 'react-datepicker';

const URI = 'http://localhost:8000/pedidos-cliente/'

const CompGestionarPedido = () => {
    const { id } = useParams();
    const [id_cliente, setCliente] = useState('');
    const [fecha, setFecha] = useState('');
    const [descripcion_pedido, setDescripcionPedido] = useState('');
    const [fecha_finalizacion, setFechaFinalizacion] = useState(null);
    const [estado_pedido, setEstadoPedido] = useState('');
    const [anticipo_pedido, setanticipo_pedido] = useState('');
    const [precio_pedido, setprecio_pedido] = useState('');
    const [precioFaltantePedido, setPrecioFaltante] = useState('');
    const [nombreCliente, setNombreCliente] = useState([]);
    const [showModal, setShowModal] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getPedido();
    }, [])

    const getPedido = async () => {
        const res = await axios.get(URI + id)
        const fechaString = res.data[0].fecha;
        const fechaDate = new Date(fechaString);
        setFecha(fechaDate);
        setprecio_pedido(res.data[0].precio_pedido)
        setanticipo_pedido(res.data[0].anticipo_pedido)
        setEstadoPedido(res.data[0].estado_pedido)
        setDescripcionPedido(res.data[0].descripcion_pedido)
        const fechaFinalizacionString = res.data[0].fecha_finalizacion;
        const fechaFinalizacionDate = new Date(fechaFinalizacionString);
        setFechaFinalizacion(fechaFinalizacionDate);
        console.log("Que tra gestion pedido", res)
    }


    const actualizar = async (e) => {
        e.preventDefault();
        const fechaFinalizacionPedido = new Date(fecha_finalizacion).toISOString().slice(0, 10);
        const rutaDestino = estado_pedido === "Pedido finalizado" ? "/pedidos-finalizados" : "/pedidos-activos"; // aquí se define la ruta de destino según el estado del pedido
        const pedidosActivos = { precio_pedido, anticipo_pedido, estado_pedido, descripcion_pedido, fecha_finalizacion: fechaFinalizacionPedido };
        await axios.put(URI + id, pedidosActivos);
        window.location.href = rutaDestino; // se utiliza la variable rutaDestino para redirigir a la página correcta
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

        if (event.target.name === "precio_pedido") {
            setprecio_pedido(valor);
        } else if (event.target.name === "anticipo_pedido") {
            setanticipo_pedido(valor);
        }
    }

    useEffect(() => {
        const precio = parseFloat(precio_pedido.replace(/\D/g, ""));
        const anticipo = parseFloat(anticipo_pedido.replace(/\D/g, ""));
        const precioFaltante = precio - anticipo > 0 ? precio - anticipo : 0;
        setPrecioFaltante(formatoValor(precioFaltante));
    }, [precio_pedido, anticipo_pedido]);

    const diasRestantes = Math.ceil((fecha_finalizacion - fecha) / 86400000);
    console.log(diasRestantes)
    


    return (
        <div className='cmp-markey-container-add-pedido'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <form className='cmp-screem-section-form' onSubmit={actualizar}>
                    {/*   {nombreCliente.length > 0 && (
                    <p className='cmp-title-section-scree'>
                        Registro de pedido - <p className='cmp-markey-nombreEmpleado'>{nombreCliente[0].nombre_comercial} </p>
                    </p>)} */}
                    {/*   <p className='cmp-markey-title-add-pedido'>Registro de pedido - <p className='cmp-markey-nombreCliente'> {nombreCliente[0].nombre_comercial}</p>  </p>  */}
                    <div className='markey-container-form-input'>
                        <p className='markey-subtitle-employees'>Gestión del pedido</p>
                        <p>Faltan <span style={{color: '#4481eb', fontWeight: 700}}>{diasRestantes}</span> días para que se cumpla con el pedido</p>
                        <ul className='cmp-markey-datos-input-employees'>
                            <li>
                                <p className='cmp-subtitle-create-pedido'>Escribe el valor del pedido</p>
                                <input
                                    type="text"
                                    className='markey-input-form'
                                    name="precio_pedido"
                                    value={formatoValor(precio_pedido)}
                                    onChange={handleChange}
                                />
                            </li>
                            <li>
                                <p className='cmp-subtitle-create-pedido'>Escribe el valor del anticipo</p>
                                <input
                                    type="text"
                                    name="anticipo_pedido"
                                    className='markey-input-form'
                                    value={formatoValor(anticipo_pedido)}
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
                                <p className='cmp-subtitle-create-pedido'>Estado del pedido</p>
                                <select value={estado_pedido} onChange={(e) => setEstadoPedido(e.target.value)} className='cmp-markey-select'>
                                    <option value="">Estado del pedido</option>
                                    <option value="Compra de materia prima">Compra de materia prima</option>
                                    <option value="Corte">Corte</option>
                                    <option value="Confección">Confección</option>
                                    <option value="Control de calidad">Control de calidad</option>
                                    <option value="Empaque">Empaque</option>
                                    <option value="Pedido finalizado">Pedido finalizado</option>
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
                        <button type='submit' className='button-enviar-form'>Actualizar</button>
                    </div>
                </form>
            </div>
        </div >
    );
}

export default CompGestionarPedido;