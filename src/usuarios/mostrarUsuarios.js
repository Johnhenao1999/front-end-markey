import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const URI = 'http://localhost:8000/holamundo/'

const CompShowUsuarios = () => {

    const [usuarios, setUsuarios] = useState([])
    const [loading, setLoading] = useState(true) // agregar estado loading
    useEffect(() => {
        getUsuarios()
    }, [])

    //procedimineto para mostrar todos los blogs
    const getUsuarios = async () => {
        const res = await axios.get(URI)
        setUsuarios(res.data)
        setLoading(false) // actualizar loading a false cuando se cargan los datos
    }

    //procedimineto para eliminar un blog
    const deleteUsuarios = async (id) => {
        await axios.delete(`${URI}${id}`)
        getUsuarios()
    }



    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    {<Link to="/create" className='btn btn-primary mt-2 mb-2'><i className="fas fa-plus"></i></Link>}
              {/*       <PDFDownloadLink document={generatePDF()} fileName="usuarios.pdf">
                        {({ blob, url, loading: pdfLoading, error }) => // cambiar nombre de loading a pdfLoading para no confundir con loading de estado
                            pdfLoading ? 'Cargando documento...' : 'Descargar PDF'
                        }
                    </PDFDownloadLink> */}
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Cedula</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Edad</th>
                                <th>Ciudad</th>
                                <th>Direccion</th>
                                <th>Telefono</th>
                                <th>Estado civil</th>
                                <th>Enfasis operacional</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td> {usuario.cedula} </td>
                                    <td> {usuario.nombre} </td>
                                    <td> {usuario.apellido} </td>
                                    <td> {usuario.edad} </td>
                                    <td> {usuario.ciudad} </td>
                                    <td> {usuario.direccion} </td>
                                    <td> {usuario.telefono} </td>
                                    <td> {usuario.estado_civil} </td>
                                    <td> {usuario.enfasis_operacional} </td>
                                    <td>
                                        <Link to={`/edit/${usuario.id}`} className='btn btn-info'><i className="fas fa-edit"></i></Link>
                                        <button onClick={() => deleteUsuarios(usuario.id)} className='btn btn-danger'><i className="fas fa-trash-alt"></i></button>
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