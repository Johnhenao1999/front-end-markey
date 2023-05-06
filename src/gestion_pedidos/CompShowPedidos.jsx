import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";

const URI = 'http://localhost:8000/pedidos/'

const CompShowPedidos = () => {
    const [pedidos, setPedidos] = useState([])
    const [showModal, setShowModal] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getAllPedidos();
    }, []);

    useEffect(() => {
        if (!loading && pedidos.length === 0) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    }, [pedidos, loading]);

    const getAllPedidos = async () => {
        try {
            const res = await axios.get(URI);
            setPedidos(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    //procedimineto para eliminar un pedido
/*     const deletePedidos = async (id_pedido) => {
        const pruebadelete = await axios.delete(`${URI}${id_pedido}`)
        getAllPedidos()
        console.log("A ver", pruebadelete)
    } */


    return (
        <div className='cmp-markey-container-all-pedidos'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <nav class="breadcrumb">
                    <ul>
                        <li><Link to={'/homeAdministrador'}>Inicio</Link></li>
                        <li><Link to={'/pedidos-activos'}>Pedidos activos</Link></li>
                    </ul>
                </nav>
                <div className="cmp-screen-container-title">
                    <p className='cmp-title-section-employees'>Pedidos activos</p>
                </div>
                <div className="table-empleados-container">
                    <table className='table-empleados'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Empresa</th>
                                <th>Factura</th>
                                <th>Fecha registro</th>
                                <th>Fecha finalización</th>
                                <th>Estado</th>
                                <th>Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos.map((pedido) => (
                                <tr key={pedido.id_pedido}>
                                    <td>{pedido.nombre_comercial}</td>
                                    <td>{pedido.factura_venta}</td>
                                    <td> {pedido.fecha ? new Date(pedido.fecha).getDate() + ' ' + new Date(pedido.fecha).toLocaleString('default', { month: 'long' }) + ' de ' + new Date(pedido.fecha).getFullYear() : ''} </td>
                                    <td> {pedido.fecha_finalizacion ? new Date(pedido.fecha_finalizacion).getDate() + ' ' + new Date(pedido.fecha_finalizacion).toLocaleString('default', { month: 'long' }) + ' de ' + new Date(pedido.fecha_finalizacion).getFullYear() : ''} </td>
                                    <td> {pedido.estado_pedido} </td>
                                    <td className="colum-table-actions">
                                        <Link to={`/gestionar-pedido/${pedido.id_pedido}`} className='btn-action'><i className="fas fa-edit"></i></Link>
                                        <Link to={`/items-pedido/${pedido.id_pedido}`} className='btn-action'><i class="fa-solid fa-tag "></i></Link>
                                     {/*    <Link style={{background:"red"}} onClick={() => deletePedidos(pedido.id_pedido)} className='btn-action'><i className="fas fa-trash-alt" ></i></Link> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
          {/*       {showModal && (
                    <div class="modal-pedidos">
                        <div class="modal-content-pedidos">
                            <div class="modal-body-pedidos">
                                <p>Actualmente no tienes pedidos activos.</p>
                            </div>
                            <div class="modal-footer-pedidos">
                                <button onClick={() => {
                                    setShowModal(false);
                                    navigate('/clientes')
                                }}>Cerrar modal</button>
                            </div>
                        </div>
                    </div>
                )} */}
                {showModal && (
                <div className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Actualmente no tienes pedidos activos.</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => {
                                        setShowModal(false);
                                        navigate('/mostrarUsuarios');
                                    }}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Los pedidos se encuentran finalizados o no has registrado ningun pedido.</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setShowModal(false);
                                        navigate('/clientes');
                                    }}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    );


};

export default CompShowPedidos;