import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './mostrarClientes.css'
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";

import imagesEmployees from './imgEmployees';

const URI = 'http://localhost:8000/clientes'

const CompShowClientes = () => { 

    const [clientes, setClientes] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClientes, setFilteredClientes] = useState([]);
    const [, setLoading] = useState(true) // agregar estado loading
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

    //Procedimiento para realizar busqueda de clientes
    useEffect(() => {
        const results = clientes.filter((cliente) =>
            cliente.nombre_comercial.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredClientes(results);
    }, [searchTerm, clientes]);

    //procedimineto para eliminar un cliente
    const deleteClientes = async (id_cliente) => {
        const pruebadelete = await axios.delete(`${URI}/${id_cliente}`)
        getClientes()
        console.log("A ver", pruebadelete)
    }



    return (

        <div className='cmp-container-markey-mostrarUsuarios'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <div className="cmp-screen-container-title">
                    <p className='cmp-title-section-employees'>Clientes</p>
                    <div className="container-search-add">
                        <div className='search-container'>
                            <input
                                type='text'
                                placeholder='Buscar cliente...'
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />
                            <button type="submit"><img src={imagesEmployees.iconSearch} alt="lupa" /></button>
                        </div>
                        <Link className="btn-add-new-link" to="/crear-cliente"><button type="submit" className="btn-add-new"><img src={imagesEmployees.iconAdd} alt="lupa" /><p>Agregar cliente</p></button></Link>
                    </div>
                </div>

                <div className="table-empleados-container">
                    <table className='table-empleados'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Nit o cédula</th>
                                <th>Nombre comercial</th>
                                <th>Ciudad</th>
                                <th>Teléfono</th>
                                <th>Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClientes.map((cliente) => (
                                <tr key={cliente.id_cliente}>
                                    <td> {cliente.id_cliente} </td>
                                    <td> {cliente.nombre_comercial} </td>
                                    <td> {cliente.ciudad} </td>
                                    <td> {cliente.telefono} </td>
                                    <td className="colum-table-actions">
                                        <Link to={`/editar-cliente/${cliente.id_cliente}`} className='btn-action'><i className="fas fa-edit "></i></Link>
                                        <Link onClick={() => deleteClientes(cliente.id_cliente)} className='btn-action'><i className="fas fa-trash-alt"></i></Link>
                                        <Link to={`/pedidos/${cliente.id_cliente}`} className="btn-action"><i className="fas fa-dollar-sign"></i></Link>
                                        <Link to={`/registro-pedidos/${cliente.id_cliente}`} className="btn-action"><i className="fas fa-dollar-sign"></i></Link>
                 {/*                        <Link to={`/mostrar-items-pedido/${cliente.id_cliente}`} className="btn-action"><i className="fas fa-dollar-sign"></i></Link> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )

}

export default CompShowClientes;