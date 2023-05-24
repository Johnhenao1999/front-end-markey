import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";
import ciudadesColombia from '../ciudadesColombia';

let currentUrl = window.location.href;

let URI = 'https://markey-confecciones.up.railway.app/create-proveedor/';

if (currentUrl.includes('localhost')) {
    URI = 'http://localhost:8000/create-proveedor/';
}

const CompCreateProveedores = () => {

    const [nombre_empresa, setNombreProveedor] = useState('');
    const [tipo_producto, setTipoProducto] = useState('');
    const [telefono, setTelefono] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [sugerencias, setSugerencias] = useState([]);
    const [sugerenciasDepartamento, setSugerenciasDepartamento] = useState([]);
    const [adminNames, setAdminNames] = useState([]);
    const [, setAdminNamesCiudades] = useState([]);
    const [showModal, setShowModal] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();



    // Procedimiento para guardar ha un usuario

    const guardar = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
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
            setLoading(false);
            console.log("Que envia provee", prueba)
        } catch (error) {

        }
    };

    /*     const handleChange = (e) => {
            const value = e.target.value;
            setCiudad(value);
    
            if (value.trim() === '') {
                setSugerencias([]);
                return;
            }
    
    
            // filtrar ciudades que coinciden con la entrada del usuario
            const suggestions = ciudadesColombia.filter((ciudad) =>
                ciudad.city.toLowerCase().startsWith(value.toLowerCase())
            );
    
            setSugerencias(suggestions);
    
    
        };
    
        const handleSuggestionClick = (suggestion) => {
            setCiudad(suggestion.city);
            setSugerencias([]);
        }; */


    /*   const adminNames = ciudadesColombia.map(ciudad => ciudad.admin_name);
      const uniqueAdminNames = [...new Set(adminNames)];
      const sortedAdminNames = uniqueAdminNames.sort((a, b) => a.localeCompare(b));
      console.log(sortedAdminNames); */

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
                        <li><Link to={''}>Registrar proveedor</Link></li>
                    </ul>
                </nav>
                <p className='cmp-title-section-scree'>Ingresa los datos para registrar un proveedor</p>
                <form onSubmit={guardar} className='cmp-screem-section-form'>
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
                                <h5 className="modal-title">Proveedor creado con éxito</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => {
                                        setShowModal(false);
                                        navigate('/proveedores');
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
                                        guardar();
                                        setShowModal(false);
                                        navigate('/proveedores');
                                    }}
                                >
                                    {loading ? "Guardando..." : "Aceptar"}
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