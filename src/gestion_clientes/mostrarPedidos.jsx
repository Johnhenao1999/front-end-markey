import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

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
    setPedidos(resprueba.data);
    console.log("Que trae resprueba" ,resprueba)
  };

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                {<Link to="/create" className='btn btn-primary mt-2 mb-2'><i className="fas fa-plus"></i></Link>}
                <table className='table'>
                    <thead className='table-primary'>
                        <tr>
                            <th>Nombre comercial</th>
                            <th>Fecha ingreso del pedido</th>
                            <th>Estado del pedido</th>
                        </tr>
                    </thead>
                    {<tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido.id_pedido}>
                                <td>{pedido.nombre_comercial}</td>
                                <td> {pedido.fecha} </td>
                                <td> {pedido.estado_pedido} </td>
                                {<td>
                                    <Link to={`/registro-items/${pedido.id_pedido}`} className='btn btn-info'><i className="fas fa-edit"></i></Link>
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

export default CompPedidoCliente;