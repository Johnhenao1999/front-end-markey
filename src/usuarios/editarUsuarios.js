import { responsiveFontSizes } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";

const URI = 'http://localhost:8000/holamundo/'

const CompEditarUsuarios = () => {
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [edad, setEdad] = useState('');
    const [estado_civil, setEstadoCivil] = useState('');
    const [enfasis_operacional, setEnfasisOperacional] = useState('');
    const navigate = useNavigate()
    const { id } = useParams()

    //procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault()
        await axios.put(URI + id, {
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            ciudad: ciudad,
            direccion: direccion,
            telefono: telefono,
            edad: edad,
            estado_civil: estado_civil,
            enfasis_operacional: enfasis_operacional
        })
        navigate('/mostrarUsuarios')
    }

    useEffect(() => {

        getBlogById()
    }, [])

    const getBlogById = async () => {
        const res = await axios.get(URI + id)
        setCedula(res.data[0].cedula)
        setNombre(res.data[0].nombre)
        setApellido(res.data[0].apellido)
        setCiudad(res.data[0].ciudad)
        setDireccion(res.data[0].direccion)
        setTelefono(res.data[0].telefono)
        setEdad(res.data[0].edad)
        setEstadoCivil(res.data[0].estado_civil)
        setEnfasisOperacional(res.data[0].enfasis_operacional)
    }

    return (
        <div>
            <h3>Edit POST</h3>
            <form onSubmit={actualizar}>
                <div className="mb-3">
                    <label className="form-label">Cedula</label>
                    <input
                        value={cedula}
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
                    <label className="form-label">Edad</label>
                    <textarea
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ciudad</label>
                    <textarea
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Direccion</label>
                    <textarea
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
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
                <div>
                    <label className='form-label'>Estado civil</label>
                    <select value={estado_civil} onChange={(e) => setEstadoCivil(e.target.value)} className='form-select'>
                        <option value="">Seleccione su estado civil</option>
                        <option value="Soltero">Soltero</option>
                        <option value="Casado">Casado</option>
                        <option value="Union Libre">Unión Libre</option>
                    </select>
                </div>
                <div>
                    <label className='form-label'>Enfasis operacional</label>
                    <select value={enfasis_operacional} onChange={(e) => setEnfasisOperacional(e.target.value)} className='form-select'>
                        <option value="">Seleccione enfasis operacional</option>
                        <option value="Maquinaria plana">Maquinara plana</option>
                        <option value="Collarin">Collarin</option>
                        <option value="Filetiadora">Filetiadora</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Actualizar</button>
            </form>
        </div>
    )

}

export default CompEditarUsuarios