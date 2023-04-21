import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CompHeader from "../header/header";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";

import imagesEmployees from './imgEmployees';

const URI = 'http://localhost:8000/empleados'

const CompShowUsuarios = () => {

    const [usuarios, setUsuarios] = useState([])
    const [loading, setLoading] = useState(true) // agregar estado loading

    //Busqueda
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsuarios, setFilteredUsuarios] = useState([]);

    useEffect(() => {
        getUsuarios()
    }, [])



    console.log(usuarios)

    //procedimineto para mostrar todos los empleados
    const getUsuarios = async () => {
        const res = await axios.get(URI)
        setUsuarios(res.data)
        setLoading(false) 
        console.log("Informacion empleado", res)
    }

    //Procedimiento para realizar busqueda de empleados
    useEffect(() => {
        const results = usuarios.filter((usuario) =>
            usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsuarios(results);
    }, [searchTerm, usuarios]);

    //procedimineto para eliminar un blog
    const deleteUsuarios = async (idcedula) => {
        const pruebadelete = await axios.delete(`${URI}/${idcedula}`)
        getUsuarios()
        console.log("A ver", pruebadelete)
    }




    return (
        <div className='container'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <div className="cmp-screen-container-title">
                    <p className='cmp-title-section-employees'>Datos de empleados</p>
                    <div className="container-search-add">
                        <div className='search-container'>
                            <input
                                type='text'
                                placeholder='Buscar empleado...'
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />
                            <button type="submit"><img src={imagesEmployees.iconSearch} alt="lupa" /></button>
                        </div>
                        <Link className="btn-add-new-link" to="/create-employees"><button type="submit" className="btn-add-new"><img src={imagesEmployees.iconAdd} alt="lupa" /><p>Agregar empleado</p></button></Link>
                    </div>
                </div>
                
                <div className="table-empleados-container">
                    <table className='table-empleados'>
                            <thead className='table-primary'>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Teléfono</th>
                                    <th>Especialidad</th>
                                    <th>Operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsuarios.map((usuario) => (
                                    <tr key={usuario.idcedula}>
                                        <td> {usuario.nombre} </td>
                                        <td> {usuario.apellido} </td>
                                        <td> {usuario.telefono} </td>
                                        <td> {usuario.especialidad} </td>
                                        <td className="colum-table-actions">
                                            <Link to={`/edit/${usuario.idcedula}`} className='btn-action'><i className="fas fa-edit "></i></Link>
                                            <Link onClick={() => deleteUsuarios(usuario.idcedula)} className='btn-action'><i className="fas fa-trash-alt"></i></Link>
                                            <Link to={`/registro-horas-empleado/${usuario.idcedula}`} className="btn-action"><i className="fas fa-dollar-sign"></i></Link>
                                            <Link to={`/ingresar_fecha/${usuario.idcedula}`} className="btn-action"><i className="fas fa-dollar-sign"></i></Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
            </div>
            
            {/* <div className='cmp-container-show-employees'>
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
                            {usuarios.map((usuario) => (
                                <tr key={usuario.idcedula}>
                                    <td> {usuario.nombre} </td>
                                    <td> {usuario.apellido} </td>
                                    <td> {usuario.idcedula} </td>
                                    <td> {usuario.telefono} </td>
                                    <td>
                                        <Link to={`/edit/${usuario.idcedula}`} className='btn btn-info'><i className="fas fa-edit"></i></Link>
                                        <button onClick={() => deleteUsuarios(usuario.idcedula)} className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
                                        <Link to={`/registro-horas-empleado/${usuario.idcedula}`} className="btn btn-success"><i className="fas fa-dollar-sign"></i></Link>
                                        <Link to={`/ingresar_fecha/${usuario.idcedula}`} className="btn btn-success"><i className="fas fa-dollar-sign"></i></Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div> */}
        </div>

    )

}

export default CompShowUsuarios