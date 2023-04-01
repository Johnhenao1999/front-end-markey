import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


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
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Descripcion del pedido"
                    value={descripcion_pedido}
                    onChange={(e) => setDescripcionPedido(e.target.value)}
                />
            </div>
            <div>
                <DatePicker
                    selected={fecha_finalizacion}
                    onChange={(date) => setFechaFinalizacion(date)}
                    inline
                    calendarClassName="custom-calendar"
                />
            </div>
            <div>
                <select value={estado_pedido} onChange={(e) => setEstadoPedido(e.target.value)}>
                    <option value="">Seleccione una opción</option>
                    <option value="Compra de materia prima">Compra de materia prima</option>
                    <option value="Corte">Corte</option>
                    <option value="Confección">Confección</option>
                    <option value="Control de calidad">Control de calidad</option>
                    <option value="Empaque">Empaque</option>
                    <option value="Entrega del producto">Entrega del producto</option>
                </select>
            </div>
            <div>
                <button
                    onClick={() => {
                        submitData();
                        navigate(`/pedidos/${id_cliente}`);
                    }}
                >
                    Guardar
                </button>
            </div>
        </div>
    );
};

export default CompRegistroPedido;