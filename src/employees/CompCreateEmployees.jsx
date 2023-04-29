import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './usuarios.css'
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";
import ciudadesColombia from '../ciudadesColombia';


const URI = 'http://localhost:8000/holamundo/'

const CompCreateUsuarios = () => {
    const [idcedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [edad, setEdad] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [direccion, setDireccion] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [estado_civil, setEstadoCivil] = useState('');
    const [estado_empleado, setEstadoEmpleado] = useState('');
    const [numero_emergencia, setNumeroEmergencia] = useState('');
    const [sugerencias, setSugerencias] = useState([]);
    const [showModal, setShowModal] = useState('');
    const [adminNamesCiudades, setAdminNamesCiudades] = useState([]);


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

        const hey = await axios.post(URI, {
            idcedula,
            nombre,
            apellido,
            telefono,
            edad,
            ciudad,
            direccion,
            especialidad,
            estado_civil,
            estado_empleado,
            numero_emergencia

        });
        setShowModal(true);
        console.log(hey)
    };


    const handleChange = (e) => {
        const value = e.target.value;
        setCiudad(value);
        if (value.trim() === '') {
            setSugerencias([]);
            return;
        }
        const suggestions = ciudadesColombia.filter((ciudad) =>
            ciudad.city.toLowerCase().startsWith(value.toLowerCase())
        );
        setSugerencias(suggestions);
    };

    const handleSuggestionClick = (suggestion) => {
        setCiudad(suggestion.city);
        setSugerencias([]);
    };

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
                <p className='cmp-title-section-scree'>Ingresa los datos para registrar un nuevo empleado</p>
                <form className='cmp-screem-section-form' onSubmit={guardar}>
                    <div className='markey-container-form-input'>
                        <ul className='cmp-markey-datos-input-employees'>
                            <li className='cmp-markey-datos-input-container-employees'>
                                <input value={idcedula}
                                    onChange={(e) => {
                                        setCedula(e.target.value);
                                        setErrorCedula(false);
                                    }}
                                    type="text"
                                    className='markey-input-form'
                                    maxLength={10}
                                    placeholder='Cedula'
                               /*      pattern="[0-9]{10}"
                                    title="Debe contener exactamente 10 dígitos numéricos"
                                    onKeyPress={(e) => {
                                        const onlyNumbers = /[0-9]/;
                                        const key = String.fromCharCode(e.keyCode || e.which);
                                        if (!onlyNumbers.test(key)) {
                                            e.preventDefault();
                                        }
                                    }} */ />
                                {errorCedula && (
                                    <p className='text-danger'>Este campo es obligatorio</p>
                                )}
                            </li>
                        </ul>
                        <ul className='cmp-markey-datos-input-employees'>
                            <li className='cmp-markey-datos-input-container-employees'>
                                <input
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    type="text"
                                    placeholder='Nombre'
                                    className='markey-input-form markey-input-form-alt'
                                />
                                {errorCampos && (
                                    <p className='text-danger'>Este campo es obligatorio</p>
                                )}
                            </li>
                            <li className='cmp-markey-datos-input-container-employees'>
                                <input
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    type="text"
                                    className='markey-input-form'
                                    placeholder='Apellido'
                                />
                                {errorCampos && (
                                    <p className='text-danger'>Este campo es obligatorio</p>
                                )}
                            </li>
                        </ul>
                        <ul className='cmp-markey-datos-input-employees'>
                            <li>
                                <input
                                    value={telefono}
                                    // onChange={(e) => setTelefono(e.target.value)} 
                                    onChange={handleTelefonoChange}
                                    type="text"
                                    placeholder='Celular'
                                    className='markey-input-form markey-input-form-alt'
                                    pattern="\d*"
                                    maxLength={10}
                                    onInvalid={() => setErrorTelefono(true)}
                                />
                                {errorTelefono && (
                                    <p className='text-danger'>Ingresa el numero de telefono</p>
                                )}
                            </li>
                            <li>
                                <input
                                    value={edad}
                                    onChange={(e) => setEdad(e.target.value)}
                                    type="text"
                                    className='markey-input-form'
                                    pattern="\d*"
                                    maxLength={10}
                                    placeholder='Edad'
                                />
                                {errorTelefono && (
                                    <p className='text-danger'>Ingresa el numero de telefono</p>
                                )}
                            </li>
                        </ul>
                    </div>
                    <div className='markey-container-form-input'>
                        <ul className='cmp-markey-datos-input-employees'>
                            <li>
                                <input
                                    value={ciudad}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder='Ciudad'
                                    className='markey-input-form markey-input-form-alt'
                                />
                                <ul className='suggestions'>
                                    {sugerencias.map((suggestion) => (
                                        <li className='suggestion-item' key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                                            {suggestion.city}
                                        </li>
                                    ))}
                                </ul>
                                {errorCampos && (
                                    <p className='text-danger'>Este campo es obligatorio</p>
                                )}
                            </li>
                            <li>
                                <input
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                    type="text"
                                    className='markey-input-form'
                                    placeholder='Dirección'
                                />
                                {errorCampos && (
                                    <p className='text-danger'>Este campo es obligatorio</p>
                                )}
                            </li>
                        </ul>
                        <ul className='cmp-markey-datos-input-employees'>
                            <li>
                                <select value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} className='cmp-markey-select cmp-markey-select-alt'>
                                    <option value="">Especialidad</option>
                                    <option value="Maquinaria plana">Maquinara plana</option>
                                    <option value="Collarin">Collarin</option>
                                    <option value="Filetiadora">Filetiadora</option>
                                </select>
                            </li>
                            <li>
                                <select value={estado_civil} onChange={(e) => setEstadoCivil(e.target.value)} className='cmp-markey-select'>
                                    <option value="">Estado civil</option>
                                    <option value="Soltero">Soltero</option>
                                    <option value="Casado">Casado</option>
                                    <option value="Union Libre">Unión Libre</option>
                                </select>
                            </li>
                        </ul>
                        <ul className='cmp-markey-datos-input-employees'>
                            <li>
                                <select value={estado_empleado} onChange={(e) => setEstadoEmpleado(e.target.value)} className='cmp-markey-select cmp-markey-select-alt'>
                                    <option value="">Estado del empleado</option>
                                    <option value="Soltero">Activo</option>
                                    <option value="Casado">Inactivo</option>
                                </select>
                            </li>
                            <li>
                                <input
                                    value={numero_emergencia}
                                    onChange={(e) => setNumeroEmergencia(e.target.value)}
                                    type="text"
                                    className='markey-input-form'
                                    placeholder='Número de emergencia'
                                />
                                {errorCampos && (
                                    <p className='text-danger'>Este campo es obligatorio</p>
                                )}
                            </li>
                        </ul>

                    </div>
                    <div className='container-button-enviar-form'>
                        <button type='submit' className='button-enviar-form'>Confirmar</button>
                    </div>
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
};

export default CompCreateUsuarios;