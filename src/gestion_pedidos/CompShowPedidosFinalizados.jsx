import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";

const URI = 'http://localhost:8000/pedidos-finalizados/'

const CompShowPedidosFinalizados = () => {

    const [pedidosFinalizados, setPedidosFinalizados] = useState([])
    useEffect(() => {
        getPedidosFinalizados()
    }, [])


    const getPedidosFinalizados = async () => {
        const resprueba = await axios.get(URI);
        setPedidosFinalizados(resprueba.data);
        console.log("Que trae resprueba", resprueba)
    };

    return (
        <div className='cmp-markey-container-all-pedidos'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <div className="cmp-screen-container-title">
                    <p className='cmp-title-section-employees'>Pedidos finalizados</p>
                </div>
                <div className='table-empleados-container'>
                    <table className='table-empleados'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Empresa</th>
                                <th>Fecha registro</th>
                                <th>Fecha finalización</th>
                                <th>Estado del pedido</th>
                                <th>Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidosFinalizados.map((pedido) => (
                                <tr key={pedido.id_pedido}>
                                    <td>{pedido.nombre_comercial}</td>
                                    <td>{pedido.fecha ? new Date(pedido.fecha).getDate() + ' ' + new Date(pedido.fecha).toLocaleString('default', { month: 'long' }) + ' de ' + new Date(pedido.fecha).getFullYear() : ''}</td>
                                    <td> {pedido.fecha_finalizacion ? new Date(pedido.fecha_finalizacion).getDate() + ' ' + new Date(pedido.fecha_finalizacion).toLocaleString('default', { month: 'long' }) + ' de ' + new Date(pedido.fecha_finalizacion).getFullYear() : ''} </td>
                                    <td> {pedido.estado_pedido} </td>
                                    <td className="colum-table-actions">
                                        <Link to={`/items-pedido/${pedido.id_pedido}`} className='btn btn-info'><i className="fas fa-edit"></i></Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )

};

export default CompShowPedidosFinalizados;