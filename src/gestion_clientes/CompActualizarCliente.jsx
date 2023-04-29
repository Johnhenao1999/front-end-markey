import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";
import ciudadesColombia from '../ciudadesColombia';

const URI = 'http://localhost:8000/clientes/'

const CompActualizarCliente = () => {
    const { id } = useParams();
    const [id_cliente, setCliente] = useState('');
    const [nombre_comercial, setNombreComercial] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [referencia_comercial, setReferenciasComerciales] = useState('');
    const [sugerenciasDepartamento, setSugerenciasDepartamento] = useState([]);
    const [adminNames, setAdminNames] = useState([]);
    const [adminNamesCiudades, setAdminNamesCiudades] = useState([]);
    const [sugerencias, setSugerencias] = useState([]);
    const [showModal, setShowModal] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getCliente();
    }, [])

    const getCliente = async () => {
        const res = await axios.get(URI + id)
        setCliente(res.data[0].id_cliente)
        setNombreComercial(res.data[0].nombre_comercial)
        setDepartamento(res.data[0].departamento)
        setCiudad(res.data[0].ciudad)
        setDireccion(res.data[0].direccion)
        setTelefono(res.data[0].telefono)
        setReferenciasComerciales(res.data[0].referencia_comercial)
        console.log("que tra res", res)
    }

    const actualizar = async (e) => {
        e.preventDefault()
        const cliente = { id_cliente, nombre_comercial, departamento, ciudad, direccion, telefono, referencia_comercial }
        await axios.put(URI + id, cliente)
        window.location.href = "/clientes"
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
                <p className='cmp-title-section-scree'>Ingresa los datos para registrar un nuevo cliente</p>
                <form className='cmp-screem-section-form' onSubmit={actualizar}>
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
                            </li>
                            <li className='cmp-markey-datos-input-container-employees'>
                                <input
                                    value={nombre_comercial}
                                    onChange={(e) => setNombreComercial(e.target.value)}
                                    type="text"
                                    className='markey-input-form'
                                    placeholder='Nombre comercial'
                                />
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
                            </li>
                            <li className='cmp-markey-datos-input-container-employees'>
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
                                        navigate('/empleados');
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
}

export default CompActualizarCliente;