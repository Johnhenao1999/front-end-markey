import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const URI = 'http://localhost:8000/maquinas/'

const CompMostrarInventario = () => {
    
    const [inventarios, setInventario] = useState([])
    useEffect( ()=>{
        getInventario() 
    },[])

    //procedimineto para mostrar todos los blogs
    const getInventario = async () => {
        const res = await axios.get(URI)
        setInventario(res.data)
    }

   /*     //procedimineto para eliminar un blog
       const deleteInventario = async (id) => {
        await axios.delete(`${URI}${id}`)
        getInventario()
     } */
 

  
    return(
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Modelo</th>
                                <th>Color</th>
                                <th>Enfoque operativo</th>
                                <th>Estado de la maquina</th>
                            </tr>
                        </thead>
                        <tbody>
                            { inventarios.map ( (inventario) => (
                                <tr key={ inventario.id}>
                                    <td> { inventario.modelo } </td>
                                    <td> { inventario.color} </td>
                                    <td> { inventario.enfoque_operativo } </td>
                                    <td> { inventario.estado_maquina} </td>
                                    <td>
                                       <button onClick={ ()=>(inventario.id) } className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
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

export default CompMostrarInventario