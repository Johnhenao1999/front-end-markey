import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";



const URI_CONFIGURACIONES = 'http://localhost:8000/configuracion/'

const CompConfiguraciones = () => {
    const [nombre_admin, setNombreAdmin] = useState('');
    const [valor_hora, setValorHora] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getConfiguraciones();
    }, [])

    const getConfiguraciones = async () => {
        const res = await axios.get(URI_CONFIGURACIONES)
        setNombreAdmin(res.data[0].nombre_admin)
        setValorHora(res.data[0].valor_hora)
        console.log("que tra res", res)
    }

    const actualizar = async (e) => {
        e.preventDefault()
        const configuracion = { nombre_admin, valor_hora }
        const id = '1' // Reemplazar 'config1' con el ID de la configuración que deseas actualizar
        let holaaa = await axios.put(`${URI_CONFIGURACIONES}${id}`, configuracion)
        window.location.href = "/homeAdministrador"
        console.log("qUE ENVIA", holaaa)
    }

    function formatoValor(valor) {
        const formatter = new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        });
        return formatter.format(valor).replace("COP", "").trim();
    }

    function handleChange(event) {
        const valor = event.target.value.replace(/\D/g, "");

        if (event.target.name === "ValorHora") {
            setValorHora(valor);
        }
    }



    return (
        <div className='cmp-markey-container-create-employees'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <p className='cmp-title-section-scree'>Configuraciones generales del aplicativo</p>
                <form className='cmp-screem-section-form' onSubmit={actualizar}>
                    <div className='markey-container-form-input'>
                        <ul className='cmp-markey-datos-input-employees'>
                            <li>
                                <p className='cmp-subtitle-create-pedido'>¿Quien esta usando el sistema actualmente?</p>
                                <input
                                    value={nombre_admin}
                                    onChange={(e) => setNombreAdmin(e.target.value)}
                                    type="text"
                                    placeholder='NombreAdmin'
                                    className='markey-input-form markey-input-form-alt'
                                />
                            </li>
                        </ul>
                    </div>
                    <div className='markey-container-form-input'>
                        <ul className='cmp-markey-datos-input-employees'>
                            <li>
                                <p className='cmp-subtitle-create-pedido'>Valor de la hora a pagar a los empleados</p>
                                <input
                                    value={formatoValor(valor_hora)}
                                    onChange={handleChange}
                                    type="text"
                                    className='markey-input-form'
                                    placeholder='ValorHora'
                                />
                            </li>
                        </ul>
                    </div>
                    <div className='container-button-enviar-form'>
                        <button type='submit' className='button-enviar-form'>Confirmar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompConfiguraciones;