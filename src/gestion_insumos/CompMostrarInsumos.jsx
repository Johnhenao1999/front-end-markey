import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";
import imagesEmployees from './imgEmployees';


const URI = 'http://localhost:8000/insumos/'

const CompMostrarInsumos = () => {

    const [insumos, setInsumos] = useState([])
    useEffect(() => {
        getInsumos()
    }, [])

    //Busqueda
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredInsumos, setFilteredInsumos] = useState([]);

    //procedimineto para mostrar todos los blogs
    const getInsumos = async () => {
        const res = await axios.get(URI)
        setInsumos(res.data)
    }

    //procedimineto para eliminar una maquina
    const deleteInsumos = async (id_maquina) => {
        const prueba = await axios.delete(`${URI}${id_maquina}`)
        getInsumos()
        console.log(prueba)
    }

    //Procedimiento para realizar busqueda de empleados
    useEffect(() => {
        const results = insumos.filter((insumo) =>
            insumo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            insumo.color.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredInsumos(results);
    }, [searchTerm, insumos]);



    return (
        <div className='container'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <div className="cmp-screen-container-title">
                    <p className='cmp-title-section-employees'>Insumos</p>
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
                        <Link className="btn-add-new-link" to="/registrar-insumos"><button type="submit" className="btn-add-new"><img src={imagesEmployees.iconAdd} alt="lupa" /><p>Agregar insumo</p></button></Link>
                    </div>
                </div>
                <div className='table-empleados-container'>
                    <table className='table-empleados'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Color</th>
                                <th>Tamaño</th>
                                <th>Fecha actualización</th>
                                <th>Operaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInsumos.map((insumo) => (
                                <tr key={insumo.id}>
                                    <td> {insumo.nombre} </td>
                                    <td> {insumo.cantidad} </td>
                                    <td> {insumo.color} </td>
                                    <td> {insumo.tamaño} </td>
                                    <td> {insumo.fecha_ingreso ? new Date(insumo.fecha_ingreso).getDate() + ' ' + new Date(insumo.fecha_ingreso).toLocaleString('default', { month: 'long' }) + ' de ' + new Date(insumo.fecha_ingreso).getFullYear() : ''} </td>
                                    <td className="colum-table-actions">
                                        <Link to={`/gestionar-insumos/${insumo.id_insumo}`} className='btn-action'><i className="fas fa-edit "></i></Link>
                                        <Link onClick={() => deleteInsumos(insumo.id_insumo)} className='btn-action'><i className="fas fa-trash-alt"></i></Link>
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

export default CompMostrarInsumos;