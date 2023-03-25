import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const URI = 'http://localhost:8000/clientes'

const CompShowClientes = () => {

    const [clientes, setClientes] = useState([])
    const [loading, setLoading] = useState(true) // agregar estado loading
    useEffect(() => {
        getClientes()
    }, [])


    //procedimineto para mostrar todos los empleados
    const getClientes = async () => {
        const res = await axios.get(URI)
        setClientes(res.data)
        setLoading(false) // actualizar loading a false cuando se cargan los datos
        console.log("Que trae res", res)
    }

    //procedimineto para eliminar un cliente
    const deleteClientes = async (id_cliente) => {
        await axios.delete(`${URI}${id_cliente}`)
        getClientes()
    }


    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    {<Link to="/create" className='btn btn-primary mt-2 mb-2'><i className="fas fa-plus"></i></Link>}
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>NIT</th>
                                <th>Nombre comercial</th>
                                <th>Departamento</th>
                                <th>Ciudad</th>
                                <th>Direccion</th>
                            </tr>
                        </thead>
                        {<tbody>
                            {clientes.map((cliente) => (
                                <tr key={cliente.id_cliente}>
                                    <td>{cliente.id_cliente}</td>
                                    <td> {cliente.nombre_comercial} </td>
                                    <td> {cliente.departamento} </td>
                                    <td> {cliente.ciudad} </td>
                                    <td> {cliente.direccion} </td>
                                    {<td>
{/*                                         <Link to={`/edit/${cliente.id_cliente}`} className='btn btn-info'><i className="fas fa-edit"></i></Link> */}
                                        <Link to={`/registro-pedidos/${cliente.id_cliente}`} className="btn btn-success"><i className="fas fa-dollar-sign">REGISTRAR PEDIDO</i></Link>
                                        <Link to={`/pedidos/${cliente.id_cliente}`} className='btn btn-info'><i className="fas fa-edit"></i>VER PEDIDO</Link>
              {/*                           <button onClick={() => deleteClientes(cliente.id_cliente)} className='btn btn-danger'><i className="fas fa-trash-alt"></i></button> */}
                                        <Link to={`/mostrar-items-pedido/${cliente.id_cliente}`} className="btn btn-success"><i className="fas fa-dollar-sign">VER DETALLE PEDIDO</i></Link>
                                    </td>}
                                </tr>
                            ))}
                        </tbody>}
                    </table>
                </div>
            </div>
        </div>

    )

}

export default CompShowClientes;