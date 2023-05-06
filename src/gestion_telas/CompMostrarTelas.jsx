import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";
import imagesEmployees from './imgEmployees';


const URI = 'http://localhost:8000/telas/'

const CompMostrarTelas = () => {

    const [telas, setTelas] = useState([])
    useEffect(() => {
        getTelas()
    }, [])

    //Busqueda
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTelas, setFilteredTelas] = useState([]);

    //procedimineto para mostrar todos los blogs
    const getTelas = async () => {
        const res = await axios.get(URI)
        setTelas(res.data)
    }

    //procedimineto para eliminar una maquina
    const deleteTelas = async (id_telas) => {
        const prueba = await axios.delete(`${URI}${id_telas}`)
        getTelas()
        console.log(prueba)
    }

    //Procedimiento para realizar busqueda de empleados
    useEffect(() => {
        const results = telas.filter((tela) =>
            tela.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tela.color.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTelas(results);
    }, [searchTerm, telas]);



    return (
        <div className='container'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <nav class="breadcrumb">
                    <ul>
                        <li><Link to={'/homeAdministrador'}>Inicio</Link></li>
                        <li><Link to={''}>Telas</Link></li>
                    </ul>
                </nav>
                <div className="cmp-screen-container-title">
                    <p className='cmp-title-section-employees'>Telas</p>
                    <div className="container-search-add">
                        <div className='search-container'>
                            <input
                                type='text'
                                placeholder='Buscar por nombre o color...'
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />
                            <button type="submit"><img src={imagesEmployees.iconSearch} alt="lupa" /></button>
                        </div>
                        <Link className="btn-add-new-link" to="/registrar-telas"><button type="submit" className="btn-add-new"><img src={imagesEmployees.iconAdd} alt="lupa" /><p>Agregar telas</p></button></Link>
                    </div>
                </div>
                <div className='table-empleados-container'>
                    <table className='table-empleados'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Nombre</th>
                                <th>Color</th>
                                <th>Cantidad (mts)</th>
                                <th>Fecha actualización</th>
                                <th>Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTelas.map((tela) => (
                                <tr key={tela.id}>
                                    <td> {tela.nombre} </td>
                                    <td> {tela.color} </td>
                                    <td> {tela.metros} </td>
                                    <td> {tela.fecha_registro ? new Date(tela.fecha_registro).getDate() + ' ' + new Date(tela.fecha_registro).toLocaleString('default', { month: 'long' }) + ' de ' + new Date(tela.fecha_registro).getFullYear() : ''} </td>
                                    <td className="colum-table-actions">
                                        <Link to={`/gestionar-telas/${tela.id_telas}`} className='btn-action'><i className="fas fa-edit "></i></Link>
                                        <Link style={{background:"red"}} onClick={() => deleteTelas(tela.id_telas)} className='btn-action'><i className="fas fa-trash-alt"></i></Link>
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

export default CompMostrarTelas;