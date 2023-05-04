
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";

const URI = 'http://localhost:8000/pedidos/'

const CompPedidoCliente = () => {
    const [pedidos, setPedidos] = useState([]);
    const { id_cliente } = useParams(); // obtiene el parámetro de la URL (el ID del empleado)

    useEffect(() => {
        if (id_cliente) {
            getPedidos(id_cliente); 
        }
    }, [id_cliente]);



    const getPedidos = async (id_cliente) => {
        const resprueba = await axios.get(`${URI}${id_cliente}`);
        const sortedPedidos = resprueba.data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        setPedidos(sortedPedidos);
        console.log("Que trae resprueba", resprueba)
    };

    const validarItemsRegistrados = async (id_pedido) => {
        const respuesta = await axios.get(`http://localhost:8000/detalle-pedido/${id_pedido}`);
        if (respuesta.data.items.length > 0) {
            alert('Este pedido ya tiene items registrados.');
            // deshabilitar el formulario para registrar nuevos items
        }
    }

    const totalPedidos = pedidos.reduce((total, pedido) => {
        return total + parseFloat(pedido.precio_pedido);
    }, 0);


    return (
        <div className='container'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <div className="cmp-screen-container-title">
                    <p className='cmp-title-section-employees'>Historial de pedidos</p>
                </div>
                <p className="cmp-markey-nombreCliente">{pedidos.length > 0 && pedidos[0].nombre_comercial}</p>
                <div className='table-empleados-container'>
                    <table className='table-empleados'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Fecha registro</th>
                                <th>Fecha finalización</th>
                                <th>Estado del pedido</th>
                                <th>Precio del pedido</th>
                                <th>Operaciones</th>
                            </tr>
                        </thead>
                        {<tbody>
                            {pedidos.map((pedido) => (
                                <tr key={pedido.id_pedido}>
                                    <td>{pedido.fecha ? new Date(pedido.fecha).getDate() + ' ' + new Date(pedido.fecha).toLocaleString('default', { month: 'long' }) + ' de ' + new Date(pedido.fecha).getFullYear() : ''}</td>
                                    <td> {pedido.fecha_finalizacion ? new Date(pedido.fecha_finalizacion).getDate() + ' ' + new Date(pedido.fecha_finalizacion).toLocaleString('default', { month: 'long' }) + ' de ' + new Date(pedido.fecha_finalizacion).getFullYear() : ''} </td>
                                    <td> {pedido.estado_pedido} </td>
                                    <td> {parseFloat(pedido.precio_pedido).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} </td>
                                    <td>
                                        <Link to={`/registro-items/${pedido.id_pedido}`} className='btn btn-info' onClick={() => validarItemsRegistrados(pedido.id_pedido)}><i className="fas fa-edit"></i></Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>}
                        <tr>
                            <td style={{ fontWeight: 700 }}>Total:</td>
                            <td></td>
                            <td></td>
                            <td style={{ fontWeight: 700 }}>{totalPedidos.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CompPedidoCliente;