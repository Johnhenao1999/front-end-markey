import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";

const URI = 'http://localhost:8000/pedidos/'

const CompShowPedidos = () => {

    const [pedidos, setPedidos] = useState([])
    useEffect(() => {
        getAllPedidos()
    }, [])


    const getAllPedidos = async () => {
        const resprueba = await axios.get(URI);
        setPedidos(resprueba.data);
        console.log("Que trae resprueba", resprueba)
    };

        //procedimineto para eliminar un pedido
        const deletePedidos = async (id_pedido) => {
            const pruebadelete = await axios.delete(`${URI}/${id_pedido}`)
            getAllPedidos()
            console.log("A ver", pruebadelete)
        }
    

    return (
        <div className='cmp-markey-container-all-pedidos'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <div className="cmp-screen-container-title">
                    <p className='cmp-title-section-employees'>Pedidos activos</p>
                </div>

                <div className="table-empleados-container">
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
                            {pedidos.map((pedido) => (
                                <tr key={pedido.id_pedido}>
                                    <td>{pedido.nombre_comercial}</td>
                                    <td> {pedido.fecha ? new Date(pedido.fecha).getDate() + ' ' + new Date(pedido.fecha).toLocaleString('default', { month: 'long' }) + ' de ' + new Date(pedido.fecha).getFullYear() : ''} </td>
                                    <td> {pedido.fecha_finalizacion ? new Date(pedido.fecha_finalizacion).getDate() + ' ' + new Date(pedido.fecha_finalizacion).toLocaleString('default', { month: 'long' }) + ' de ' + new Date(pedido.fecha_finalizacion).getFullYear() : ''} </td>
                                    <td> {pedido.estado_pedido} </td>
                                    <td className="colum-table-actions">
                                        <Link to={`/editar-pedido/${pedido.id_pedido}`} className='btn-action'><i className="fas fa-edit "></i></Link>
                                        <Link onClick={() => deletePedidos(pedido.id_pedido)} className='btn-action'><i className="fas fa-trash-alt"></i></Link>
                                        <Link to={`/items-pedido/${pedido.id_pedido}`} className='btn-action'><i className="fas fa-dollar-sign"></i></Link>
                                    
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <div className='row'>
                <div className='col'>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Nombre del cliente</th>
                                <th>Descripcion del pedido</th>
                                <th>Fecha registro del pedido</th>
                                <th>Fecha prevista finalizacion del pedido</th>
                                <th>Estado del pedido</th>
                            </tr>
                        </thead>
                        {<tbody>
                            {pedidos.map((pedido) => (
                                <tr key={pedido.id_pedido}>
                                    <td>{pedido.nombre_comercial}</td>
                                    <td>{pedido.descripcion_pedido}</td>
                                    <td> {pedido.fecha ? new Date(pedido.fecha).toLocaleDateString('es-ES') : ''} </td>
                                    <td>{pedido.fecha_finalizacion ? new Date(pedido.fecha_finalizacion).toLocaleDateString('es-ES') : ''}</td>
                                    <td> {pedido.estado_pedido} </td>
                                    {<td>
                                        <Link to={`/items-pedido/${pedido.id_pedido}`} className='btn btn-info'><i className="fas fa-edit"></i></Link>
                                    </td>}
                                </tr>
                            ))}
                        </tbody>}
                    </table>
                </div>
            </div> */}
        </div>

    )

};

export default CompShowPedidos;