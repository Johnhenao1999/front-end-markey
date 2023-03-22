import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const URI = 'http://localhost:8000/empleados'

const CompShowUsuarios = () => {

    const [usuarios, setUsuarios] = useState([])
    const [loading, setLoading] = useState(true) // agregar estado loading
    useEffect(() => {
        getUsuarios()
    }, [])



    console.log(usuarios)

    //procedimineto para mostrar todos los empleados
    const getUsuarios = async () => {
        const res = await axios.get(URI)
        setUsuarios(res.data)
        setLoading(false) // actualizar loading a false cuando se cargan los datos
    }

    //procedimineto para eliminar un blog
    const deleteUsuarios = async (idcedula) => {
        await axios.delete(`${URI}${idcedula}`)
        getUsuarios()
    }


    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    {<Link to="/create" className='btn btn-primary mt-2 mb-2'><i className="fas fa-plus"></i></Link>}
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
            </div>
        </div>

    )

}

export default CompShowUsuarios