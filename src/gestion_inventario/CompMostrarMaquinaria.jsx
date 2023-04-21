import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";

const URI = 'http://localhost:8000/maquinas/'

const CompMaquinaria = () => {

    const [inventarios, setInventario] = useState([])
    useEffect(() => {
        getInventario()
    }, [])

    //procedimineto para mostrar todos los blogs
    const getInventario = async () => {
        const res = await axios.get(URI)
        setInventario(res.data)
    }

    //procedimineto para eliminar una maquina
    const deleteInventario = async (id_maquina) => {
        const prueba = await axios.delete(`${URI}${id_maquina}`)
        getInventario()
        console.log(prueba)
    }



    return (
        <div className='container'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <div className='table-empleados-container'>
                    <Link to="/registrar-maquinaria" className='btn btn-primary mt-2 mb-2'><i className="fas fa-plus"></i></Link>
                    <table className='table-empleados'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Nombre</th>
                                <th>Marca</th>
                                <th>Referencia agujas</th>
                                <th>Estado</th>
                                <th>Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventarios.map((inventario) => (
                                <tr key={inventario.id}>
                                    <td> {inventario.nombre} </td>
                                    <td> {inventario.marca} </td>
                                    <td> {inventario.referencia_agujas} </td>
                                    <td> {inventario.estado} </td>
                                    <td className="colum-table-actions">
                                        <Link to={`/gestionar-maquinaria/${inventario.id_maquina}`} className='btn-action'><i className="fas fa-edit "></i></Link>
                                        <Link onClick={() => deleteInventario(inventario.id_maquina)} className='btn-action'><i className="fas fa-trash-alt"></i></Link>
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

export default CompMaquinaria