import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import './pedidos.css'

const URI = 'http://localhost:8000/registro-pedidos/';

const CompRegistroPedido = () => {
    const [descripcion_pedido, setDescripcionPedido] = useState('');
    const [fecha_finalizacion, setFechaFinalizacion] = useState(new Date());
    const [estado_pedido, setEstadoPedido] = useState('');

    const { id_cliente } = useParams();

    const navigate = useNavigate();

    // Procedimiento para guardar ha un usuario
    const submitData = async () => {
        const data = {
            estado_pedido: estado_pedido,
            descripcion_pedido: descripcion_pedido,
            fecha_finalizacion: fecha_finalizacion.toISOString().slice(0, 10)
        };

        const prueba = await axios.post(`${URI}${id_cliente}`, data); // aquí agregamos el idEmpleado a la URL
        console.log('Datos enviados correctamente');
        console.log('que trae data', prueba);
    };

    return (
        <div className='cmp-markey-container-add-pedido'>
            <CompNavegacionVertical />
            <div className='cmp-container-input-add-pedido'>
            <p className='cmp-markey-title-add-pedido'>Selecciona el estado y fecha de finalización del pedido</p>
                    <div className='cmp-markey-textarea'>
                        <textarea
                            className='cmp-markey-text-observacion-pedido'
                            type="text"
                            placeholder='Escribe una obsersevación del pedido'
                            value={descripcion_pedido}
                            onChange={(e) => setDescripcionPedido(e.target.value)}
                        />
                    </div>
                    <div className='cmp-markey-container-calendario'>
                        <DatePicker
                            selected={fecha_finalizacion}
                            onChange={(date) => setFechaFinalizacion(date)}
                            inline
                            calendarClassName="custom-calendar"
                        />
                    </div>
                <div className='cmp-markey-container-estado-pedido'>
                    <select value={estado_pedido} onChange={(e) => setEstadoPedido(e.target.value)} className='cmp-markey-select-estado'>
                        <option value="">Estado del pedido</option>
                        <option value="Compra de materia prima">Compra de materia prima</option>
                        <option value="Corte">Corte</option>
                        <option value="Confección">Confección</option>
                        <option value="Control de calidad">Control de calidad</option>
                        <option value="Empaque">Empaque</option>
                        <option value="Entrega del producto">Pedido finalizado</option>
                    </select>
                </div>
                <div>
                    <button
                        className='cmp-markey-button-guardar-pedido'
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

export default CompRegistroPedido;