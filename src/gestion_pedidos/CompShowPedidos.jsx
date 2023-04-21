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
    const deletePedidos = async (id_pedido) => {
        const pruebadelete = await axios.delete(`${URI}${id_pedido}`)
        getAllPedidos()
        console.log("A ver", pruebadelete)
    }

    const handleCloseModal = () => {
        setShowModal(false);
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
                                        <Link onClick={() => deletePedidos(pedido.id_pedido)} className='btn-action'><i className="fas fa-trash-alt"></i></Link>
                                        <Link to={`/items-pedido/${pedido.id_pedido}`} className='btn-action'><i className="fas fa-dollar-sign"></i></Link>
                                        <Link to={`/gestionar-pedido/${pedido.id_pedido}`}>Abrir modal</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {showModal && (
                    <div class="modal-pedidos">
                        <div class="modal-content-pedidos">
                            <div class="modal-body-pedidos">
                                <p>Actualmente no tienes pedidos activos.</p>
                            </div>
                            <div class="modal-footer-pedidos">
                                <button onClick={()=>{
                                    setShowModal(false);
                                    navigate('/clientes')
                                }}>Cerrar modal</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );


};

export default CompShowPedidos;