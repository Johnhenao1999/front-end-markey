import { dividerClasses } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import './home.css'
import BarsChart from "./BarsChart";


import CompHeader from "../header/header";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";


const URI = 'http://localhost:8000/pedidos/'
const URI_PEDIDOS_FINALIZADOS = 'http://localhost:8000/pedidos-finalizados/'
const URI_ITEMS_PEDIDOS = 'http://localhost:8000/items-pedidos-finalizados/'
const URI_EMPLEADOS_REGISTRADOS = 'http://localhost:8000/empleados/'
const URI_HORAS_REGISTRADAS = 'http://localhost:8000/registro-horas/'
const URI_CONFIGURACIONES = 'http://localhost:8000/configuracion/'

const CompHomePrincipalAdministrador = () => {

    const [pedidos, setPedidos] = useState([])
    const [pedidosFinalizados, setPedidosFinalizados] = useState([])
    const [totalItemsPedidos, setItemsPedidos] = useState([])
    const [empleados, setEmpleados] = useState([])
    const [horasEmpleados, setHorasEmpleados] = useState([])
    const [loading, setLoading] = useState(false);
    const [totalPrecio, setTotalPrecio] = useState(0);
    const [nombre_admin, setNombreAdmin] = useState('');

    const totalHoras = horasEmpleados.length ? horasEmpleados[0].total_horas : '';
    const totalPagar = horasEmpleados.length ? parseFloat(horasEmpleados[0].total_pagar) : 0;

    useEffect(() => {
        setLoading(true);
        getAllPedidos();
        getAllPedidosFinalizados();
        getAllItemsPedidos();
        getAllEmpleados();
        getAllHoras();
        getConfiguraciones();
    }, []);


    const getAllPedidos = async () => {
        try {
            const res = await axios.get(URI);
            setPedidos(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    let getAllPedidosFinalizados = async () => {
        try {
            const resPedidosFinalizados = await axios.get(URI_PEDIDOS_FINALIZADOS);
            setPedidosFinalizados(resPedidosFinalizados.data);
            console.log("Pedidos finalizados", resPedidosFinalizados);

            const total = resPedidosFinalizados.data.reduce((accumulator, pedido) => {
                return accumulator + parseFloat(pedido.precio_pedido);
            }, 0);
            setTotalPrecio(total);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    let getAllItemsPedidos = async () => {
        try {
            const resItemsPedidos = await axios.get(URI_ITEMS_PEDIDOS);
            setPedidosFinalizados(resItemsPedidos.data);
            console.log("items pedidos", resItemsPedidos);

            const totalItems = resItemsPedidos.data.reduce((accumulator, item) => {
                return accumulator + parseFloat(item.cantidad);
            }, 0);
            setItemsPedidos(totalItems);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getAllEmpleados = async () => {
        try {
            const resEmpleados = await axios.get(URI_EMPLEADOS_REGISTRADOS);
            setEmpleados(resEmpleados.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getAllHoras = async () => {
        try {
            const resHorasEmpleados = await axios.get(URI_HORAS_REGISTRADAS);
            setHorasEmpleados(resHorasEmpleados.data);
            console.log("Como viene horas", horasEmpleados)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    
    const getConfiguraciones = async () => {
        const res = await axios.get(URI_CONFIGURACIONES)
        setNombreAdmin(res.data[0].nombre_admin)
        console.log("que tra res", res)
    }









    return (

        <div className='cmp-container-markey-mostrarUsuarios'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <div className="cmp-screen-container-title">
                    <p className='cmp-title-home-administrador'>¡Bienvenido {nombre_admin}!</p>
                </div>
                <div className="cmp-container-cards">
                    <div className="cmp-section-pedidos">
                        <p className="cmp-title-card">Empleados</p>
                        <p className="cmp-valor-card">{empleados.length}</p>
                    </div>
                    <div className="cmp-section-pedidos">
                        <p className="cmp-title-card">Horas registradas</p>
                        <p className="cmp-valor-card">{totalHoras}</p>
                    </div>
                    <div className="cmp-section-pedidos">
                        <p className="cmp-title-card">Total pagado</p>
                        <p className="cmp-valor-card">{totalPagar.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                    </div>
                    <div className="cmp-section-pedidos">
                        <p className="cmp-title-card">Rendimiento</p>
                        <p className="cmp-valor-card">El esperado...</p>
                    </div>
                </div>
                <div className="cmp-container-cards">
                    <div className="cmp-section-pedidos">
                        <p className="cmp-title-card">Pedidos activos</p>
                        <p className="cmp-valor-card">{pedidos.length}</p>
                    </div>
                    <div className="cmp-section-pedidos">
                        <p className="cmp-title-card">Pedidos finalizados</p>
                        <p className="cmp-valor-card">{pedidosFinalizados.length}</p>
                    </div>
                    <div className="cmp-section-pedidos">
                        <p className="cmp-title-card">Productos vendidos</p>
                        <p className="cmp-valor-card">{totalItemsPedidos}</p>
                    </div>
                    <div className="cmp-section-pedidos">
                        <p className="cmp-title-card">Ingresos</p>
                        <p className="cmp-valor-card">{totalPrecio.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                    </div>
                </div>
                <div >
                    <BarsChart  />
                </div>
            </div>
        </div>

    )

}

export default CompHomePrincipalAdministrador;