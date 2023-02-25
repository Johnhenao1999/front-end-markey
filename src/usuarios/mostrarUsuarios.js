import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const URI = 'http://localhost:8000/holamundo/'

const CompShowUsuarios = () => {
    
    const [usuarios, setUsuarios] = useState([])
    useEffect( ()=>{
        getUsuarios()
    },[])

    //procedimineto para mostrar todos los blogs
    const getUsuarios = async () => {
        const res = await axios.get(URI)
        setUsuarios(res.data)
    }

       //procedimineto para eliminar un blog
       const deleteUsuarios = async (id) => {
        await axios.delete(`${URI}${id}`)
        getUsuarios()
     }
 

  
    return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                  {<Link to="/create" className='btn btn-primary mt-2 mb-2'><i className="fas fa-plus"></i></Link> }
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Telefono</th>
                                <th>Horas trabajadas</th>
                                <th>Precio hora</th>
                                <th>Total a pagar</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { usuarios.map ( (usuario) => (
                                <tr key={ usuario.id}>
                                    <td> { usuario.nombre } </td>
                                    <td> { usuario.apellido } </td>
                                    <td> { usuario.email } </td>
                                    <td> { usuario.telefono } </td>
                                    <td> { usuario.total_horas } </td>
                                    <td> { usuario.precio_hora } </td>
                                    <td> { usuario.total_horas * usuario.precio_hora} </td>
                                    <td>
                                        <Link to={`/edit/${usuario.id}`} className='btn btn-info'><i className="fas fa-edit"></i></Link>
                                       <button onClick={ ()=>deleteUsuarios(usuario.id) } className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>    
            </div>
        </div>
    )

}

export default CompShowUsuarios