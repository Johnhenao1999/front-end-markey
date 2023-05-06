import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";
import ciudadesColombia from '../ciudadesColombia';


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
    const [sugerencias, setSugerencias] = useState([]);
    const [sugerenciasDepartamento, setSugerenciasDepartamento] = useState([]);
    const [, setAdminNamesCiudades] = useState([]);
    const [adminNames, setAdminNames] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
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
        getProveedor();
    }, [id])

    const actualizar = async (e) => {
        e.preventDefault()
        const empleado = { nombre_empresa, tipo_producto, telefono, departamento, ciudad, direccion, email }
        let hola = await axios.put(URI + id, empleado)
        window.location.href = "/proveedores"
        console.log("Que envia actualizar", hola)
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setCiudad(value);
        if (value.trim() === '') {
            setSugerencias([]);
            setDepartamento(''); // Agrega esta línea para borrar el departamento
            return;
        }
        const suggestions = ciudadesColombia.filter((ciudad) =>
            ciudad.city.toLowerCase().startsWith(value.toLowerCase())
        );
        setSugerencias(suggestions);
        const departamento = suggestions.length > 0 ? suggestions[0].admin_name : '';
        setDepartamento(departamento);
    };

    const handleSuggestionClick = (suggestion) => {
        setCiudad(suggestion.city);
        setDepartamento(suggestion.admin_name);
        setSugerencias([]);
    };

    const handleChangeDepartamento = (e) => {
        const value = e.target.value;
        setDepartamento(value);

        if (value.trim() === '') {
            setSugerenciasDepartamento([]);
            return;
        }

        const suggestions = adminNames.filter((nombreDepartamento) =>
            nombreDepartamento.toLowerCase().startsWith(value.toLowerCase())
        );
        setSugerenciasDepartamento(suggestions);
    };

    const handleSuggestionClickDepartamento = (suggestion) => {
        setDepartamento(suggestion);
        setSugerenciasDepartamento([]);
    };

    useEffect(() => {
        const nombresDepartamentos = Array.from(
            new Set(ciudadesColombia.map((ciudad) => ciudad.admin_name))
        ).sort();
        setAdminNames(nombresDepartamentos);
    }, []);

    useEffect(() => {
        const nombresCiudades = Array.from(
            new Set(ciudadesColombia.map((ciudad) => ciudad.city))
        ).sort();
        setAdminNamesCiudades(nombresCiudades);
    }, []);



    return (
        <div className='cmp-markey-container-create-employees'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
            <nav class="breadcrumb">
                    <ul>
                        <li><Link to={'/homeAdministrador'}>Inicio</Link></li>
                        <li><Link to={'/proveedores'}>Proveedores</Link></li>
                        <li><Link to={''}>Gestionar proveedor</Link></li>
                    </ul>
                </nav>
                <p className='cmp-title-section-scree'>Gestionar información del proveedor</p>
                <form onSubmit={actualizar} className='cmp-screem-section-form'>
                    <div className='markey-container-form-input'>
                        <ul className='cmp-markey-datos-input-employees'>
                            <li>
                                <p className='cmp-subtitle-create-pedido'>Nombre</p>
                                <input
                                    value={nombre_empresa}
                                    onChange={(e) => setNombreProveedor(e.target.value)}
                                    type="text"
                                    placeholder='Nombre del proveedor'
                                    className='markey-input-form'
                                />
                            </li>
                            <li>
                                <p className='cmp-subtitle-create-pedido'>Correo eléctronico</p>
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
                                <p className='cmp-subtitle-create-pedido'>Ciudad</p>
                                <input
                                    value={ciudad}
                                    onChange={handleChange}
                                    type="text"
                                    className='markey-input-form'
                                    placeholder='Ciudad'
                                />
                                <ul className='suggestions'>
                                    {sugerencias.map((suggestion) => (
                                        <li className='suggestion-item' key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                                            {suggestion.city}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li>
                                <p className='cmp-subtitle-create-pedido'>Departamento</p>
                                <input
                                    value={departamento}
                                    onChange={handleChangeDepartamento}
                                    type="text"
                                    placeholder="Departamento"
                                    className="markey-input-form"
                                />
                                <ul className="suggestions">
                                    {sugerenciasDepartamento.map((suggestion) => (
                                        <li
                                            className="suggestion-item"
                                            key={suggestion}
                                            onClick={() => handleSuggestionClickDepartamento(suggestion)}
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                        <ul className='cmp-markey-datos-input-employees'>
                            <li>
                                <p className='cmp-subtitle-create-pedido'>Dirección</p>
                                <input
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                    type="text"
                                    placeholder='Direcciòn'
                                    className='markey-input-form'
                                />
                            </li>
                            <li>
                                <p className='cmp-subtitle-create-pedido'>Teléfono</p>
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