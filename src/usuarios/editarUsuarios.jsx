import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const URI = 'http://localhost:8000/empleados/'

const CompEditarUsuarios = () => {
    const { id } = useParams();
    const [idcedula, setCedula] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [telefono, setTelefono] = useState('')

    useEffect(() => {
        getEmpleadoById();
    }, [])

    const getEmpleadoById = async () => {
        const res = await axios.get(URI + id)
        setCedula(res.data[0].idcedula)
        setNombre(res.data[0].nombre)
        setApellido(res.data[0].apellido)
        setTelefono(res.data[0].telefono)
        console.log("que tra res", res)
    }

    const actualizar = async (e) => {
        e.preventDefault()
        const empleado = { idcedula, nombre, apellido, telefono }
        await axios.put(URI + id, empleado)
        window.location.href = "/empleados"
    }

    return (
        <div>
            <h3>Edit POST</h3>
            <form onSubmit={actualizar}>
                <div className="mb-3">
                    <label className="form-label">Cedula</label>
                    <input
                        value={idcedula}
                        onChange={(e) => setCedula(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <textarea
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Apellido</label>
                    <textarea
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Telefono</label>
                    <textarea
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Actualizar</button>
            </form>
        </div>
    )
}

export default CompEditarUsuarios