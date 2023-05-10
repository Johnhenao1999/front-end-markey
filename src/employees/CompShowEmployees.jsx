import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CompHeader from "../header/header";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";

import imagesEmployees from './imgEmployees';

let currentUrl = window.location.href;

let URL = 'https://markey-confecciones.up.railway.app/empleados';

if (currentUrl.includes('localhost')) {
  URL = 'http://localhost:8000/empleados';
}

const CompShowUsuarios = () => {

    const [usuarios, setUsuarios] = useState([])
    const [, setLoading] = useState(true) // agregar estado loading

    //Busqueda 
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsuarios, setFilteredUsuarios] = useState([]);


    useEffect(() => {
        let token = localStorage.getItem('token');
        if (!token) {
            // Si el token no está presente, redirige al usuario a la página de inicio de sesión
            window.location.href = '/';
        } else {
            // Si el token está presente, llama a la función getUsuarios para obtener la información del empleado
            getUsuarios(token).catch((error) => { });
        }
    }, []);



    const getUsuarios = async (token) => {

        // Verificar si el token es válido antes de continuar
        if (!token) {
            return;
        }

        try {
            const res = await axios.get(URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsuarios(res.data);
            setLoading(false);
            console.log("Informacion empleado", res);
        } catch (error) {
            // Si hay un error al obtener la información del empleado, redirige al usuario a la página de inicio de sesión
            window.location.href = '/';
        }
    };

    //Procedimiento para realizar busqueda de empleados
    useEffect(() => {
        const results = usuarios.filter((usuario) =>
            usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsuarios(results);
    }, [searchTerm, usuarios]);

    //procedimineto para eliminar un blog
    const deleteUsuarios = async (idcedula) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${URL}/${idcedula}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Espera a que se complete la eliminación antes de llamar a getUsuarios
            await getUsuarios(token);
            console.log('Usuario eliminado');
        } catch (error) {
            console.error(error);
        }
    }




    return (
        <div className='container'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <nav class="breadcrumb">
                    <ul>
                        <li><Link to={'/homeAdministrador'}>Inicio</Link></li>
                        <li><Link to={'/empleados'}>Empleados</Link></li>
                    </ul>
                </nav>
                <div className="cmp-screen-container-title">
                    <p className='cmp-title-section-employees'>Empleados</p>
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
                                    <td>     {usuario.telefono} </td>
                                    <td> {usuario.especialidad} </td>
                                    <td className="colum-table-actions">
                                        <Link to={`/edit/${usuario.idcedula}`} className='btn-action'><i className="fas fa-edit"></i></Link>
                                        <Link to={`/ingresar_fecha/${usuario.idcedula}`} className="btn-action"><i class="fa-solid fa-share-from-square" style={{
                                            color
                                                : "white"
                                        }}></i></Link>
                                        <Link to={`/registro-horas-empleado/${usuario.idcedula}`} className="btn-action"><i class="fa-regular fa-clock"></i></Link>
                                        {/*   <Link onClick={() => deleteUsuarios(usuario.idcedula)} className='btn-action'><i className="fas fa-trash-alt"></i></Link> */}
                                        {/* <Link to={`/registro-horas-empleado/${usuario.idcedula}`} className="btn-action"><i class="fa-sharp fa-regular fa-clock fa-2xl"></i></Link> */}
                                        <Link onClick={() => deleteUsuarios(usuario.idcedula)} className='btn-action'><i className="fas fa-trash-alt"></i></Link>
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