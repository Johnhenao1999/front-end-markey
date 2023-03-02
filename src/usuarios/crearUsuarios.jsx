import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './usuarios.css'


const URI = 'http://localhost:8000/holamundo/'

const CompCreateUsuarios = () => {
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [edad, setEdad] = useState('');
    const [estado_civil, setEstadoCivil] = useState('');
    const [enfasis_operacional, setEnfasisOperacional] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    // Procedimiento para guardar ha un usuario

    const guardar = async (e) => {
        e.preventDefault();
        await axios.post(URI, {
            cedula,
            nombre,
            apellido,
            ciudad,
            direccion,
            telefono,
            edad,
            estado_civil,
            enfasis_operacional,
        });
        setShowModal(true);
    };
    return (
        <div>
            <h3>Crear usuario</h3>
            <form onSubmit={guardar}>
                <div className='cmp-container-crear-usuarios'>
                    <div>
                        <label className='form-label'>Cedula</label>
                        <input
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <div >
                        <label className='form-label'>Nombre</label>
                        <input
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <div>
                        <label className='form-label'>Apellido</label>
                        <input
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <div>
                        <label className='form-label'>Ciudad</label>
                        <input
                            value={ciudad}
                            onChange={(e) => setCiudad(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <div>
                        <label className='form-label'>Direccion</label>
                        <input
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
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
                        <label className='form-label'>Edad</label>
                        <input
                            value={edad}
                            onChange={(e) => setEdad(e.target.value)}
                            type="text"
                            className='form-control'
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
                </div>

                <button type='submit' className='btn btn-primary'>Guardar</button>
            </form>
            {showModal && (
                <div className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Usuario creado con éxito</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => {
                                        setShowModal(false);
                                        navigate('/mostrarUsuarios');
                                    }}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>El usuario se ha creado exitosamente.</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setShowModal(false);
                                        navigate('/mostrarUsuarios');
                                    }}
                                >
                                    Aceptar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompCreateUsuarios;