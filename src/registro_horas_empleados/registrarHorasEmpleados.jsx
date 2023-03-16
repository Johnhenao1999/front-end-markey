import axios from "axios";
import { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";

const URI = 'http://localhost:8000/holamundo/'

const CompPruebaRegistro = () => {
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fecha, setFecha] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    //procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault();

            const fechaActual = new Date().toLocaleString();
            setFecha(fechaActual);


        await axios.put(URI + id, {
            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            fecha: fechaActual //enviar la fecha formateada a la base de datos
        })
        navigate('/mostrarUsuarios');
    }

    useEffect(() => {
        getBlogById();
    }, []);

    const getBlogById = async () => {
        const res = await axios.get(URI + id);
        setCedula(res.data[0].cedula);
        setNombre(res.data[0].nombre);
        setApellido(res.data[0].apellido);
        setFecha(res.data[0].prueba_dos); //setear la fecha actual en el estado de fecha
    }

    return (
        <div>
            <h3>Edit POST</h3>
            <form onSubmit={actualizar}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Apellido</label>
                    <input
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha</label>
                    <textarea
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        type="text"
                        className="form-control"
                        disabled //desactivar la edición de la fecha en el formulario
                    />
                </div>
                <button type="submit" className="btn btn-primary">Actualizar</button>
            </form>
        </div>
    )

}

export default CompPruebaRegistro;