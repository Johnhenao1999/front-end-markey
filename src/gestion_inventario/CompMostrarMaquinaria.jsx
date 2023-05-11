import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";
import imagesEmployees from './imgEmployees';


let currentUrl = window.location.href;

let URI = 'https://markey-confecciones.up.railway.app/maquinas/';

if (currentUrl.includes('localhost')) {
    URI = 'http://localhost:8000/maquinas/'
}

const CompMaquinaria = () => {

    const [inventarios, setInventario] = useState([])
    useEffect(() => {
        getInventario()
    }, [])

    //Busqueda
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMaquinaria, setFilteredMaquinaria] = useState([]);

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

    //Procedimiento para realizar busqueda de empleados
    useEffect(() => {
        const results = inventarios.filter((inventario) =>
            inventario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMaquinaria(results);
    }, [searchTerm, inventarios]);



    return (
        <div className='container'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <nav class="breadcrumb">
                    <ul>
                        <li><Link to={'/homeAdministrador'}>Inicio</Link></li>
                        <li><Link to={''}>Máquinaria</Link></li>
                    </ul>
                </nav>
                <div className="cmp-screen-container-title">
                    <p className='cmp-title-section-employees'>Máquinaria</p>
                    <div className="container-search-add">
                        <div className='search-container'>
                            <input
                                type='text'
                                placeholder='Buscar máquina...'
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />
                            <button type="submit"><img src={imagesEmployees.iconSearch} alt="lupa" /></button>
                        </div>
                        <Link className="btn-add-new-link" to="/registrar-maquinaria"><button type="submit" className="btn-add-new"><img src={imagesEmployees.iconAdd} alt="lupa" /><p>Agregar máquina</p></button></Link>
                    </div>
                </div>
                <div className='table-empleados-container'>
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
                            {filteredMaquinaria.map((inventario) => (
                                <tr key={inventario.id}>
                                    <td> {inventario.nombre} </td>
                                    <td> {inventario.marca} </td>
                                    <td> {inventario.referencia_agujas} </td>
                                    <td> {inventario.estado} </td>
                                    <td className="colum-table-actions">
                                        <Link to={`/gestionar-maquinaria/${inventario.id_maquina}`} className='btn-action'><i className="fas fa-edit "></i></Link>
                                        <Link style={{ background: "red" }} onClick={() => deleteInventario(inventario.id_maquina)} className='btn-action'><i className="fas fa-trash-alt"></i></Link>
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