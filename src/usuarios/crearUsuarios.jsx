import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const URI = 'http://localhost:8000/holamundo/'

const CompCreateUsuarios = () => {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [total_horas, setHorasTrabajadas] = useState('')
    const [precio_hora, setPrecioHora] = useState('')
    const navigate = useNavigate();

    // Procedimiento para guardar ha un usuario

    const guardar = async (e) => {
        e.preventDefault()
        await axios.post(URI, { nombre: nombre, apellido: apellido, email: email, telefono: telefono, total_horas: total_horas, precio_hora: precio_hora })
        navigate('/')
    }
    return (
        <div>
            <h3>Crear usuario</h3>
            <form onSubmit={guardar}>
                <div className='cmp-container-crear-usuarios'>
                    <div>
                        <label className='form-label'>Nombre</label>
                        <input
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <div >
                        <label className='form-label'>Apellido</label>
                        <input
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <div>
                        <label className='form-label'>Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <div>
                        <label className='form-label'>Telefono</label>
                        <input
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <div>
                        <label className='form-label'>Horas trabajadas</label>
                        <input
                            value={total_horas}
                            onChange={(e) => setHorasTrabajadas(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <div>
                        <label className='form-label'>Precio hora</label>
                        <input
                            value={precio_hora}
                            onChange={(e) => setPrecioHora(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>
                </div>

                <button type='submit' className='btn btn-primary'>Guardar</button>
            </form>
        </div>
    )
}

export default CompCreateUsuarios;