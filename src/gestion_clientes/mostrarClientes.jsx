import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './mostrarClientes.css'
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";
import Tooltip from '../ComponentTooltip/Tooltip';

import imagesEmployees from './imgEmployees';



let currentUrl = window.location.href;

let URI = 'https://markey-confecciones.up.railway.app/clientes';

if (currentUrl.includes('localhost')) {
    URI = 'http://localhost:8000/clientes'
}


const CompShowClientes = () => {

    const [clientes, setClientes] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClientes, setFilteredClientes] = useState([]);
    const [, setLoading] = useState(true) // agregar estado loading
    const [showDeleteErrorModal, setShowDeleteErrorModal] = useState(false);
    const navigate = useNavigate();
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

    const deleteClientes = async (idCliente) => {
        try {
            await axios.delete(`URI/${idCliente}`);
            // Eliminar el cliente de la lista
        } catch (error) {
            setShowDeleteErrorModal(true);
        }
    };




    return (

        <div className='cmp-container-markey-mostrarUsuarios'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <nav class="breadcrumb">
                    <ul>
                        <li><Link to={'/homeAdministrador'}>Inicio</Link></li>
                        <li><Link to={'/clientes'}>Clientes</Link></li>
                    </ul>
                </nav>
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
                                <th>Nombre</th>
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
                                        <Tooltip text="Gestionar">
                                            <Link to={`/editar-cliente/${cliente.id_cliente}`} className='btn-action'><i className="fas fa-edit "></i></Link>
                                        </Tooltip>
                                        <Tooltip text="Registrar">
                                            <Link to={`/registro-pedidos/${cliente.id_cliente}`} className="btn-action"><i class="fa-solid fa-share-from-square" style={{
                                                color
                                                    : "white"
                                            }}></i></Link>
                                        </Tooltip>
                                        <Tooltip text="Historial">
                                            <Link to={`/pedidos/${cliente.id_cliente}`} className="btn-action"><i class="fa-solid fa-cart-shopping" style={{
                                                color
                                                    : "white"
                                            }}></i></Link>
                                        </Tooltip>
                                        <Tooltip text="Eliminar">
                                            <Link onClick={() => deleteClientes(cliente.id_cliente)} className='btn-action'><i className="fas fa-trash-alt"></i></Link>
                                            {/*                        <Link to={`/mostrar-items-pedido/${cliente.id_cliente}`} className="btn-action"><i className="fas fa-dollar-sign"></i></Link> */}
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 {showDeleteErrorModal && (
                <div className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Error al eliminar cliente</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => {
                                        setShowDeleteErrorModal(false);
                                        navigate('/clientes');
                                    }}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Se ha producido un error al eliminar el cliente, ya que cuenta con pedidos registrados completamente.</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setShowDeleteErrorModal(false);
                                        navigate('/clientes');
                                    }}
                                >
                                    Aceptar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>

    )

}

export default CompShowClientes;