import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const URI = 'http://localhost:8000/registro-clientes/'

const CompCreateCliente = () => {
    const [id_cliente, setCliente] = useState('');
    const [nombre_comercial, setNombreComercial] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [direccion, setDireccion] = useState('');
    const  [showModal, setShowModal] = useState('');

/* 
    const [errorCedula, setErrorCedula] = useState(false);
    const [errorCampos, setErrorCampos] = useState(false);
    const [errorTelefono, setErrorTelefono] = useState(false); */
    const navigate = useNavigate();

/*     const handleTelefonoChange = (e) => {
        const inputTelefono = e.target.value;

        // Validar que solamente se ingresen números
        if (!/^\d*$/.test(inputTelefono)) {
            setErrorTelefono(true);
        } else {
            setErrorTelefono(false);
            setTelefono(inputTelefono);
        }
    }; */


    // Procedimiento para guardar ha un usuario

    const guardar = async (e) => {
        e.preventDefault();

        await axios.post(URI, {
            id_cliente,
            nombre_comercial,
            departamento,
            ciudad,
            direccion
        });
        setShowModal(true);
    };
    return (
        <div>
            <h3>Crear cliente</h3>
            <form onSubmit={guardar}>
                <div className='cmp-container-crear-usuarios'>
                    <div>
                        <label className='form-label'>Nit</label>
                        <input
                            value={id_cliente}
                            onChange={(e) => {
                                setCliente(e.target.value);
                            }}
                            type="text"
                            className='form-control'
                      /*       maxLength={10}
                            pattern="[0-9]{10}"
                            title="Debe contener exactamente 10 dígitos numéricos"
                            onKeyPress={(e) => {
                                const onlyNumbers = /[0-9]/;
                                const key = String.fromCharCode(e.keyCode || e.which);
                                if (!onlyNumbers.test(key)) {
                                    e.preventDefault();
                                }
                            }} */
                        />
                    </div>
                    <div >
                        <label className='form-label'>Nombre comercial</label>
                        <input
                            value={nombre_comercial}
                            onChange={(e) => setNombreComercial(e.target.value)}
                            type="text"
                            className='form-control'
                        />
                    </div>
                    <div>
                        <label className='form-label'>Departamento</label>
                        <input
                            value={departamento}
                            onChange={(e) => setDepartamento(e.target.value)}
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
                </div>

                <button type='submit' className='btn btn-primary'>Guardar</button>
            </form>
            {showModal && (
                <div className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">El cliente ha sido creado con éxito</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => {
                                        setShowModal(false);
                                        navigate('/');
                                    }}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>El cliente se ha creado exitosamente.</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setShowModal(false);
                                        navigate('/');
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

export default CompCreateCliente;