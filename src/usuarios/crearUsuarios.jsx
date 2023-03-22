import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './usuarios.css'


const URI = 'http://localhost:8000/holamundo/'

const CompCreateUsuarios = () => {
    const [idcedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const  [showModal, setShowModal] = useState('');


    const [errorCedula, setErrorCedula] = useState(false);
    const [errorCampos, setErrorCampos] = useState(false);
    const [errorTelefono, setErrorTelefono] = useState(false);
    const navigate = useNavigate();

    const handleTelefonoChange = (e) => {
        const inputTelefono = e.target.value;

        // Validar que solamente se ingresen números
        if (!/^\d*$/.test(inputTelefono)) {
            setErrorTelefono(true);
        } else {
            setErrorTelefono(false);
            setTelefono(inputTelefono);
        }
    };


    // Procedimiento para guardar ha un usuario

    const guardar = async (e) => {
        e.preventDefault();

        if (!idcedula) {
            // Muestra un mensaje de error si se omitió la cédula o el teléfono
            setErrorCedula(true);
            return;
        }

        await axios.post(URI, {
            idcedula,
            nombre,
            apellido,
            telefono
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
                            value={idcedula}
                            onChange={(e) => {
                                setCedula(e.target.value);
                                setErrorCedula(false);
                            }}
                            type="text"
                            className='form-control'
                            maxLength={10}
                            pattern="[0-9]{10}"
                            title="Debe contener exactamente 10 dígitos numéricos"
                            onKeyPress={(e) => {
                                const onlyNumbers = /[0-9]/;
                                const key = String.fromCharCode(e.keyCode || e.which);
                                if (!onlyNumbers.test(key)) {
                                    e.preventDefault();
                                }
                            }}
                        />
                          {errorCedula && (
                            <p className='text-danger'>Este campo es obligatorio</p>
                        )}
                    </div>
                    <div >
                        <label className='form-label'>Nombre</label>
                        <input
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                        {errorCampos && (
                            <p className='text-danger'>Este campo es obligatorio</p>
                        )}
                    </div>
                    <div>
                        <label className='form-label'>Apellido</label>
                        <input
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                        {errorCampos && (
                            <p className='text-danger'>Este campo es obligatorio</p>
                        )}
                    </div>
                    <div>
                        <label className='form-label'>Telefono</label>
                        <input
                            value={telefono}
                            /*   onChange={(e) => setTelefono(e.target.value)} */
                            onChange={handleTelefonoChange}
                            type="text"
                            className='form-control'
                            pattern="\d*"
                            maxLength={10}
                            onInvalid={() => setErrorTelefono(true)}
                        />
                        {errorTelefono && (
                            <p className='text-danger'>Ingresa el numero de telefono</p>
                        )}
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