import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";

const URI = 'http://localhost:8000/pedidos-finalizados/'

const CompShowPedidosFinalizados = () => {
  
    const [pedidosFinalizados, setPedidosFinalizados] = useState([])
    useEffect(() => {
        getPedidosFinalizados()
    }, [])


  const getPedidosFinalizados = async () => {
    const resprueba = await axios.get(URI);
    setPedidosFinalizados(resprueba.data);
    console.log("Que trae resprueba" ,resprueba)
  };

  return (
    <div className='cmp-markey-container-all-pedidos'>
             <CompNavegacionVertical />
        <div className='row'>
            <div className='col'>
                {<Link to="/create" className='btn btn-primary mt-2 mb-2'><i className="fas fa-plus"></i></Link>}
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
                        {pedidosFinalizados.map((pedido) => (
                            <tr key={pedido.id_pedido}>
                                <td>{pedido.nombre_comercial}</td>
                                <td>{pedido.descripcion_pedido}</td>
                                <td> {pedido.fecha ? new Date(pedido.fecha).toLocaleDateString('es-ES') : ''} </td>
                                <td>{pedido.fecha_finalizacion  ? new Date(pedido.fecha_finalizacion).toLocaleDateString('es-ES') : ''}</td>
                                <td> {pedido.estado_pedido} </td>
                                {<td>
                                    <Link to={`/items-pedido/${pedido.id_pedido}`} className='btn btn-info'><i className="fas fa-edit"></i></Link>
{/*                                     <Link to={`/pedidos/${cliente.id_cliente}`} className='btn btn-info'><i className="fas fa-edit"></i></Link> */}
{/*                                     <button onClick={() => deleteClientes(cliente.id_cliente)} className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
                                    <Link to={`/registro-pedidos/${cliente.id_cliente}`} className="btn btn-success"><i className="fas fa-dollar-sign"></i></Link>
                                    <Link to={`/registro-items/${cliente.id_cliente}`} className="btn btn-success"><i className="fas fa-dollar-sign"></i></Link> */}
                                </td>}
                            </tr>
                        ))}
                    </tbody>}
                </table>
            </div>
        </div>
    </div>

)

};

export default CompShowPedidosFinalizados;