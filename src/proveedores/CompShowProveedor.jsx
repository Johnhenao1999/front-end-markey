import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CompHeader from "../header/header";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import imagesEmployees from './imgEmployees';

const URI = 'http://localhost:8000/proveedor'

const CompShowProveedor = () => {

    const [proveedores, setProveedores] = useState([])
    const [loading, setLoading] = useState(true) // agregar estado loading

    //Busqueda
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProveedores, setFilteredUsuarios] = useState([]);


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

    //Procedimiento para realizar busqueda de por nombre y productos
    useEffect(() => {
        const results = proveedores.filter((proveedor) =>
            proveedor.tipo_producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
            proveedor.nombre_empresa.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsuarios(results);
    }, [searchTerm, proveedores]);


    return (
        <div className='container'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
            <div className="cmp-screen-container-title">
                    <p className='cmp-title-section-employees'>Proveedores</p>
                    <div className="container-search-add">
                        <div className='search-container'>
                            <input
                                type='text'
                                placeholder='Buscar proveedor o tipo de producto...'
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />
                            <button type="submit"><img src={imagesEmployees.iconSearch} alt="lupa" /></button>
                        </div>
                        <Link className="btn-add-new-link" to="/create-proveedores"><button type="submit" className="btn-add-new"><img src={imagesEmployees.iconAdd} alt="lupa" /><p>Agregar proveedor</p></button></Link>
                    </div>
                </div>
                <div className='table-empleados-container'>
                    <table className='table-empleados'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Nombre</th>
                                <th>Ciudad</th>
                                <th>Dirección</th>
                                <th>Telefono</th>
                                <th>Tipo de productos</th>
                                <th>Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProveedores.map((proveedor) => (
                                <tr key={proveedor.id_proveedor}>
                                    <td> {proveedor.nombre_empresa} </td>
                                    <td> {proveedor.ciudad} </td>
                                    <td> {proveedor.direccion} </td>
                                    <td> {proveedor.telefono} </td>
                                    <td> {proveedor.tipo_producto} </td>
                                    <td className="colum-table-actions">
                                        <Link to={`/actualizar-proveedor/${proveedor.id_proveedor}`} className='btn btn-info'><i className="fas fa-edit"></i></Link>
                                        <Link onClick={() => deleteProveedor(proveedor.id_proveedor)} className='btn-action'><i className="fas fa-trash-alt"></i></Link>
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