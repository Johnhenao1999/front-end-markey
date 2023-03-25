import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';



const URI = 'http://localhost:8000/registro-pedidos/'

const CompRegistroPedido = () => {
    const [fecha, setFecha] = useState('');
    const [estado_pedido, setEstadoPedido] = useState('');

    const { id_cliente } = useParams();

    const navigate = useNavigate();

    // Procedimiento para guardar ha un usuario

    const submitData = async () => {
        const data = {
            fecha: fecha,
            estado_pedido: estado_pedido,

        };

        const prueba = await axios.post(`${URI}${id_cliente}`, data); // aquí agregamos el idEmpleado a la URL
        console.log('Datos enviados correctamente');
        console.log("que trae data", prueba)
    };
    return (
        <div>
            <input type="text" placeholder="Fecha de ingreso pedido" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            <input type="text" placeholder="Estado del pedido" value={estado_pedido} onChange={(e) => setEstadoPedido(e.target.value)} />
            <button onClick={() => {
                submitData();
                navigate(`/pedidos/${id_cliente}`);
            }}>Guardar</button>
        </div>
    );
};

export default CompRegistroPedido;