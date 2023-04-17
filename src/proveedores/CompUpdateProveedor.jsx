import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";


const URI = 'http://localhost:8000/proveedor/'

const CompUpdateProveedor = () => {

    const { id } = useParams();
    const [nombre_empresa, setNombreProveedor] = useState('');
    const [tipo_producto, setTipoProducto] = useState('');
    const [telefono, setTelefono] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getProveedor();
    }, [])

    const getProveedor = async () => {
        const res = await axios.get(URI + id)
        setNombreProveedor(res.data[0].nombre_empresa)
        setTipoProducto(res.data[0].tipo_producto)
        setTelefono(res.data[0].telefono)
        setDepartamento(res.data[0].departamento)
        setCiudad(res.data[0].ciudad)
        setDireccion(res.data[0].direccion)
        setEmail(res.data[0].email)
        console.log("que tra res", res)
    }

    const actualizar = async (e) => {
        e.preventDefault()
        const empleado = { nombre_empresa, tipo_producto, telefono, departamento, ciudad, direccion, email }
        let hola = await axios.put(URI + id, empleado)
        window.location.href = "/proveedores"
        console.log("Que envia actualizar", hola)
    }


    return (
        <div className='cmp-markey-container-create-employees'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <p className='cmp-title-section-scree'>Ingresa los datos para registrar un proveedor</p>
                <form onSubmit={actualizar} className='cmp-screem-section-form'>
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
                                    placeholder='Teléfono'
                                />
                            </li>
                        </ul>
                    </div>
                    <div className='markey-container-form-input'>
                    <p className='markey-subtitle-employees'>Ingresa el tipo de producto</p>
                        <ul className='cmp-markey-datos-input-employees'>
                            <textarea
                                className='cmp-markey-textarea'
                                type="text"
                                placeholder='Escribe una descripciòn de los productos...'
                                value={tipo_producto}
                                onChange={(e) => setTipoProducto(e.target.value)}
                            />
                        </ul>
                    </div>
                    <button type='submit' className='button-enviar-form'>Guardar</button>


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

export default CompUpdateProveedor;