import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CompHeader from "../header/header";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";

const URI = 'http://localhost:8000/proveedor'

const CompShowProveedor = () => {

    const [proveedores, setProveedores] = useState([])
    const [loading, setLoading] = useState(true) // agregar estado loading
    useEffect(() => {
        getProveedores()
    }, [])



    console.log(proveedores)

    //procedimineto para mostrar todos los empleados
    const getProveedores = async () => {
        const res = await axios.get(URI)
        setProveedores(res.data)
        setLoading(false) 
        console.log("Informacion proveedor", res)
    }

    //procedimineto para eliminar un blog
    const deleteProveedor = async (id_proveedor) => {
        const pruebadelete = await axios.delete(`${URI}/${id_proveedor}`)
        getProveedores()
        console.log("A ver", pruebadelete)
    }


    return (
        <div className='container'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-container-show-employees'>
                <div className='col'>
                    {<Link to="/create-employees" className='btn btn-primary mt-2 mb-2'><i className="fas fa-plus"></i></Link>}
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Cedula</th>
                                <th>Telefono</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proveedores.map((proveedor) => (
                                <tr key={proveedor.id_proveedor}>
                                    <td> {proveedor.nombre_empresa} </td>
                                    <td> {proveedor.email} </td>
                                    <td> {proveedor.telefono} </td>
                                    <td> {proveedor.ciudad} </td>
                                    <td>
                                        <Link to={`/actualizar-proveedor/${proveedor.id_proveedor}`} className='btn btn-info'><i className="fas fa-edit"></i></Link>
                                        <button onClick={() => deleteProveedor(proveedor.id_proveedor)} className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
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

export default CompShowProveedor;