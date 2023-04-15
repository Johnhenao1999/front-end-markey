import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";


const URI = 'http://localhost:8000/create-proveedores/'

const CompCreateProveedores = () => {

    const [nombre_empresa, setNombreProveedor] = useState('');
    const [tipo_producto, setTipoProducto] = useState('');
    const [telefono, setTelefono] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState('');

    const navigate = useNavigate();



    // Procedimiento para guardar ha un usuario

    const guardar = async (e) => {
        e.preventDefault();

        const prueba = await axios.post(URI, {
            nombre_empresa,
            email,
            telefono,
            departamento,
            ciudad,
            direccion,
            tipo_producto
        });
        setShowModal(true);
        console.log("Que envia provee", prueba)
    };
    return (
        <div className='cmp-markey-container-create-employees'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-markey-container-input-employees'>
                <p className='markey-title-create-employees'>Ingresa los datos para registrar un proveedor</p>
                <form onSubmit={guardar} className='cmp-markey-form-create-employees'>
                    <div className='markey-container-form-input'>
                        <ul className='cmp-markey-datos-input-employees'>
                            <li>
                                <input
                                    value={nombre_empresa}
                                    onChange={(e) => setNombreProveedor(e.target.value)}
                                    type="text"
                                    placeholder='Nombre del proveedor'
                                    className='markey-input-form'
                                />
                            </li>
                            <li>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="text"
                                    className='markey-input-form'
                                    placeholder='Email'
                                />
                            </li>
                        </ul>
                        <ul className='cmp-markey-datos-input-employees'>
                            <li>
                                <input
                                    value={departamento}
                                    onChange={(e) => setDepartamento(e.target.value)}
                                    type="text"
                                    placeholder='Departamento'
                                    className='markey-input-form'
                                />
                            </li>
                            <li>
                                <input
                                    value={ciudad}
                                    onChange={(e) => setCiudad(e.target.value)}
                                    type="text"
                                    className='markey-input-form'
                                    placeholder='Ciudad'
                                />
                            </li>
                        </ul>
                        <ul className='cmp-markey-datos-input-employees'>
                            <li>
                                <input
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                    type="text"
                                    placeholder='Direcciòn'
                                    className='markey-input-form'
                                />
                            </li>
                            <li>
                                <input
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    type="text"
                                    className='markey-input-form'
                                    placeholder='Telefono'
                                />
                            </li>
                        </ul>
                    </div>
                    <div className='markey-container-form-input'>
                    <p className='markey-subtitle-employees'>Ingresa el tipo de producto</p>
                        <ul className='cmp-markey-datos-input-employees'>
                            <textarea
                                className='cmp-markey-text-observacion-pedido'
                                type="text"
                                placeholder='Escribe una descripciòn de los productos...'
                                value={tipo_producto}
                                onChange={(e) => setTipoProducto(e.target.value)}
                            />
                        </ul>
                    </div>
                    <button type='submit' className='button-create-employees'>Guardar</button>


                </form>
            </div>
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
                                <p>El proveedor ha sido creado exitosamente.</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setShowModal(false);
                                        navigate('/proveedores');
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

export default CompCreateProveedores;