import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";

const URI = 'http://localhost:8000/empleados/'

const CompEditarUsuarios = () => {
    const { id } = useParams();
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
    const [showModal, setShowModal] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getEmpleadoById();
    }, [])

    const getEmpleadoById = async () => {
        const res = await axios.get(URI + id)
        setCedula(res.data[0].idcedula)
        setNombre(res.data[0].nombre)
        setApellido(res.data[0].apellido)
        setTelefono(res.data[0].telefono)
        setEdad(res.data[0].edad)
        setCiudad(res.data[0].ciudad)
        setDireccion(res.data[0].direccion)
        setEspecialidad(res.data[0].especialidad)
        setEstadoCivil(res.data[0].estado_civil)
        setEstadoEmpleado(res.data[0].estado_empleado)
        setNumeroEmergencia(res.data[0].numero_emergencia)
        console.log("que tra res", res)
    }

    const actualizar = async (e) => {
        e.preventDefault()
        const empleado = { idcedula, nombre, apellido, telefono }
        await axios.put(URI + id, empleado)
        window.location.href = "/empleados"
    }

    return (
        <div className='cmp-markey-container-create-employees'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-markey-container-input-employees'>
                <p className='markey-title-create-employees'>Actualizar información del empleado</p>
                <form onSubmit={actualizar} className='cmp-markey-form-create-employees'>
                    <div className='markey-container-form-input'>
                        <ul className='cmp-markey-datos-input-employees'>
                            <li>
                            <p className='cmp-subtitle-create-pedido'>Cédula</p>
                                <input
                                    value={idcedula}
                                    onChange={(e) => {
                                        setCedula(e.target.value);
                                    }}
                                    type="text"
                                    className='markey-input-form'
                                    maxLength={10}
                                    placeholder='Cedula'
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
                            </li>
                        </ul>
                        <ul className='cmp-markey-datos-input-employees'>
                            <li>
                            <p className='cmp-subtitle-create-pedido'>Nombre</p>
                                <input
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    type="text"
                                    placeholder='Nombre'
                                    className='markey-input-form'
                                />
                            </li>
                            <li>
                            <p className='cmp-subtitle-create-pedido'>Apellido</p>
                                <input
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    type="text"
                                    className='markey-input-form'
                                    placeholder='Apellido'
                                />
                            </li>
                        </ul>
                        <ul className='cmp-markey-datos-input-employees'>
                            <li>
                            <p className='cmp-subtitle-create-pedido'>Télefono</p>
                                <input
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    type="text"
                                    placeholder='Celular'
                                    className='markey-input-form'
                                    pattern="\d*"
                                    maxLength={10}
                                />
                            </li>
                            <li>
                            <p className='cmp-subtitle-create-pedido'>Edad</p>
                                <input
                                    value={edad}
                                    onChange={(e) => setEdad(e.target.value)}
                                    type="text"
                                    className='markey-input-form'
                                    pattern="\d*"
                                    maxLength={10}
                                    placeholder='Edad'
                                />
                            </li>
                        </ul>
                    </div>
                    <div className='markey-container-form-input'>
                        <ul className='cmp-markey-datos-input-employees'>
                            <li>
                            <p className='cmp-subtitle-create-pedido'>Ciudad</p>
                                <input
                                    value={ciudad}
                                    onChange={(e) => setCiudad(e.target.value)}
                                    type="text"
                                    placeholder='Ciudad'
                                    className='markey-input-form'
                                />
                            </li>
                            <li>
                            <p className='cmp-subtitle-create-pedido'>Dirección</p>
                                <input
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                    type="text"
                                    className='markey-input-form'
                                    placeholder='Dirección'
                                />
                            </li>
                        </ul>
                        <ul className='cmp-markey-datos-input-employees'>
                            <li>
                        <p className='cmp-subtitle-create-pedido'>Especialidad</p>
                                <select value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} className='cmp-markey-select'>
                                    <option value="">Especialidad</option>
                                    <option value="Maquinaria plana">Maquinara plana</option>
                                    <option value="Collarin">Collarin</option>
                                    <option value="Filetiadora">Filetiadora</option>
                                </select>
                            </li>
                            <li>
                        <p className='cmp-subtitle-create-pedido'>Estado civil</p>
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
                        <p className='cmp-subtitle-create-pedido'>Estado del empleado</p>
                                <select value={estado_empleado} onChange={(e) => setEstadoEmpleado(e.target.value)} className='cmp-markey-select'>
                                    <option value="">Estado del empleado</option>
                                    <option value="Soltero">Activo</option>
                                    <option value="Casado">Inactivo</option>
                                </select>
                            </li>
                            <li>
                        <p className='cmp-subtitle-create-pedido'>Número de emergencia</p>
                                <input
                                    value={numero_emergencia}
                                    onChange={(e) => setNumeroEmergencia(e.target.value)}
                                    type="text"
                                    className='markey-input-form'
                                    placeholder='Número de emergencia'
                                />
                            </li>
                        </ul>

                    </div>
                    <button type='submit' className='button-create-employees'>Confirmar</button>


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

export default CompEditarUsuarios