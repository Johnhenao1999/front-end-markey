import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";
import ciudadesColombia from '../ciudadesColombia';


let currentUrl = window.location.href;

let URI = 'https://markey-confecciones.up.railway.app/registro-clientes/';

if (currentUrl.includes('localhost')) {
    URI = 'http://localhost:8000/registro-clientes/'
}


const CompCreateCustomer = () => {
    const [id_cliente, setCliente] = useState('');
    const [nombre_comercial, setNombreComercial] = useState('');
    const [telefono, setTelefono] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [referencia_comercial, setReferenciasComerciales] = useState('');
    const [sugerenciasDepartamento, setSugerenciasDepartamento] = useState([]);
    const [adminNames, setAdminNames] = useState([]);
    const [, setAdminNamesCiudades] = useState([]);
    const [sugerencias, setSugerencias] = useState([]);
    const [showModal, setShowModal] = useState('');

    const [errorIdCliente, setErrorIdCliente] = useState(false);
    const [errorNombre, setErrorNombre] = useState(false);
    const [errorCiudad, setErrorCiudad] = useState(false);
    const [errorDepartamento, setErrorDepartamento] = useState(false);
    const [errorTelefono, setErrorTelefono] = useState(false);
    const [errorDireccion, setErrorDireccion] = useState(false);
    const [loading, setLoading] = useState(false);


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

        // Verificar que todos los campos obligatorios estén llenos
        if (!id_cliente || !nombre_comercial || !ciudad || !departamento || !direccion || !telefono) {
            setErrorIdCliente(!id_cliente);
            setErrorNombre(!nombre_comercial);
            setErrorCiudad(!ciudad);
            setErrorDepartamento(!departamento)
            setErrorDireccion(!direccion);
            setErrorTelefono(!telefono);
            setErrorDireccion(!direccion);
            return;
        }
        setLoading(true);
        try {
            await axios.post(URI, {
                id_cliente,
                nombre_comercial,
                departamento,
                ciudad,
                direccion,
                telefono,
                referencia_comercial
            });
            setShowModal(true);
            setLoading(false);
        }
        catch (error) {
            setLoading(false); // Establecer el estado de carga en false en caso de error
            console.error("Error al enviar los datos", error);
        }

    };

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
        <div>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <nav class="breadcrumb">
                    <ul>
                        <li><Link to={'/homeAdministrador'}>Inicio</Link></li>
                        <li><Link to={'/clientes'}>Clientes</Link></li>
                        <li><Link to={''}>Registrar cliente</Link></li>
                    </ul>
                </nav>
                <p className='cmp-title-section-scree'>Ingresa los datos para registrar un nuevo cliente</p>
                <form className='cmp-screem-section-form' onSubmit={guardar}>
                    <div className='markey-container-form-input'>
                        <ul className='cmp-markey-datos-input-employees'>
                            <li className='cmp-markey-datos-input-container-employees'>
                                <input
                                    value={id_cliente}
                                    onChange={(e) => {
                                        setCliente(e.target.value);
                                    }}
                                    type="text"
                                    className='markey-input-form'
                                    placeholder='Nit o Cédula'
                                />
                                {errorIdCliente && (
                                    <p className='text-danger'>Este campo es obligatorio</p>
                                )}
                            </li>
                            <li className='cmp-markey-datos-input-container-employees'>
                                <input
                                    value={nombre_comercial}
                                    onChange={(e) => setNombreComercial(e.target.value)}
                                    type="text"
                                    className='markey-input-form'
                                    placeholder='Nombre comercial'
                                />
                                {errorNombre && (
                                    <p className='text-danger'>Este campo es obligatorio</p>
                                )}
                            </li>
                        </ul>
                        <ul className='cmp-markey-datos-input-employees'>
                            <li className='cmp-markey-datos-input-container-employees'>
                                <input
                                    value={ciudad}
                                    onChange={handleChange}
                                    type="text"
                                    className='markey-input-form'
                                    placeholder='Ciudad'
                                />
                                {errorCiudad && (
                                    <p className='text-danger'>Este campo es obligatorio</p>
                                )}
                                <ul className='suggestions'>
                                    {sugerencias.map((suggestion) => (
                                        <li className='suggestion-item' key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                                            {suggestion.city}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className='cmp-markey-datos-input-container-employees'>
                                <input
                                    value={departamento}
                                    onChange={handleChangeDepartamento}
                                    type="text"
                                    className='markey-input-form'
                                    placeholder='Departamento'
                                />
                                {errorDepartamento && (
                                    <p className='text-danger'>Este campo es obligatorio</p>
                                )}
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
                            <li className='cmp-markey-datos-input-container-employees'>
                                <input
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                    type="text"
                                    className='markey-input-form'
                                    placeholder='Dirección'
                                />
                                {errorDireccion && (
                                    <p className='text-danger'>Este campo es obligatorio</p>
                                )}
                            </li>
                            <li className='cmp-markey-datos-input-container-employees'>
                                <input
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    type="text"
                                    className='markey-input-form'
                                    placeholder='Teléfono'
                                />
                                {errorTelefono && (
                                    <p className='text-danger'>Este campo es obligatorio</p>
                                )}
                            </li>

                        </ul>
                    </div>
                    <div className='markey-container-form-input'>
                        <p className='markey-subtitle-employees'>Referencias comerciales</p>
                        <textarea
                            className='cmp-markey-textarea'
                            type="text"
                            placeholder='Escribe las referencias comerciales del cliente...'
                            value={referencia_comercial}
                            onChange={(e) => setReferenciasComerciales(e.target.value)}
                        />
                    </div>

                    <button type='submit' className='button-enviar-form'>Guardar</button>
                </form>
            </div>
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
                                        guardar();
                                        setShowModal(false);
                                        navigate('/clientes')
                                    }}
                                >
                                    {loading ? "Guardando..." : "Guardar"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompCreateCustomer;