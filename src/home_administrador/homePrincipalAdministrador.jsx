import axios from "axios";
import { useState, useEffect } from "react";
import './home.css'
import BarsChart from "./BarsChart";
import PiesChart from "./PiesChart";


import CompHeader from "../header/header";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";

let currentUrl = window.location.href;

let URI_CONFIGURACIONES = 'https://markey-confecciones.up.railway.app/configuracion/'
let URI = 'https://markey-confecciones.up.railway.app/pedidos/'
let URI_PEDIDOS_FINALIZADOS = 'https://markey-confecciones.up.railway.app/pedidos-finalizados/'
let URI_ITEMS_PEDIDOS = 'https://markey-confecciones.up.railway.app/items-pedidos-finalizados/'
let URI_EMPLEADOS_REGISTRADOS = 'https://markey-confecciones.up.railway.app/empleados/'
let URI_HORAS_REGISTRADAS = 'https://markey-confecciones.up.railway.app/registro-horas/'

if (currentUrl.includes('localhost')) {
  URI_CONFIGURACIONES = 'http://localhost:8000/configuracion/'
  URI = 'http://localhost:8000/pedidos/'
  URI_PEDIDOS_FINALIZADOS = 'http://localhost:8000/pedidos-finalizados/'
  URI_ITEMS_PEDIDOS = 'http://localhost:8000/items-pedidos-finalizados/'
  URI_EMPLEADOS_REGISTRADOS = 'http://localhost:8000/empleados/'
  URI_HORAS_REGISTRADAS = 'http://localhost:8000/registro-horas/'
}


const CompHomePrincipalAdministrador = () => {

    const [pedidos, setPedidos] = useState([])
    const [pedidosFinalizados, setPedidosFinalizados] = useState([])
    const [totalItemsPedidos, setItemsPedidos] = useState([])
    const [empleados, setEmpleados] = useState([])
    const [horasEmpleados, setHorasEmpleados] = useState([])
    const [totalPagarEmpleados, setTotalPagarEmpleados] = useState([])
    const [, setLoading] = useState(false);
    const [totalPrecio, setTotalPrecio] = useState(0);
    const [nombre_admin, setNombreAdmin] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);

                let token = localStorage.getItem('token');
                if (!token) {
                  // Si el token no está presente, redirige al usuario a la página de inicio de sesión
                  window.location.href = '/';
                  return;
                }
        

                const [pedidosResponse, pedidosFinalizadosResponse, itemsPedidosResponse, empleadosResponse, horasEmpleadosResponse, configuracionesResponse] = await Promise.all([
                    axios.get(URI, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }),
                    axios.get(URI_PEDIDOS_FINALIZADOS, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }),
                    axios.get(URI_ITEMS_PEDIDOS, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }),
                    axios.get(URI_EMPLEADOS_REGISTRADOS, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }),
                    axios.get(URI_HORAS_REGISTRADAS, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }),
                    axios.get(URI_CONFIGURACIONES, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }),
                  ]);

                setPedidos(pedidosResponse.data);
                setPedidosFinalizados(pedidosFinalizadosResponse.data);
                setTotalPrecio(
                    pedidosFinalizadosResponse.data.reduce(
                        (accumulator, pedido) => accumulator + parseFloat(pedido.precio_pedido),
                        0
                    )
                );
                setItemsPedidos(
                    itemsPedidosResponse.data.reduce(
                        (accumulator, item) => accumulator + parseFloat(item.cantidad),
                        0
                    )
                );

                setEmpleados(empleadosResponse.data);
                setHorasEmpleados(horasEmpleadosResponse.data.reduce(
                    (accumulator, hora) => accumulator + parseFloat(hora.total_horas),
                    0
                ));

                setTotalPagarEmpleados(horasEmpleadosResponse.data.reduce(
                    (accumulator, hora) => accumulator + parseFloat(hora.total_pagar),
                    0
                ));

                setNombreAdmin(configuracionesResponse.data[0].nombre_admin);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);


    return (

        <div className='cmp-container-markey-mostrarUsuarios'>
            <CompHeader />
            <CompNavegacionVertical />
            <div className='cmp-screen-container'>
                <div className="cmp-screen-container-title">
                    <p className='cmp-markey-nombre-admin'>¡Bienvenido {nombre_admin}!</p>
                </div>
                <div className="cmp-container-cards">
                    <div className="cmp-section-pedidos">
                        <p className="cmp-title-card">Empleados</p>
                        <p className="cmp-valor-card">{empleados.length}</p>
                    </div>
                    <div className="cmp-section-pedidos">
                        <p className="cmp-title-card">Horas registradas</p>
                        <p className="cmp-valor-card">{parseFloat(horasEmpleados).toFixed(2)}</p>
                    </div>
                    <div className="cmp-section-pedidos">
                        <p className="cmp-title-card">Total pagado</p>
                        <p className="cmp-valor-card">{totalPagarEmpleados.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
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
                <div className="cmp-container-graficas">
                    <div className="cmp-markey-graficos">
                    <p className='cmp-markey-title-graficos'>Ingresos mensuales</p>
                        <BarsChart />
                    </div>
                    <div className="cmp-markey-graficos">
                    <p className='cmp-markey-title-graficos'>Productos más solicitados</p>
                        <PiesChart />
                    </div>
                </div>
            </div>
        </div>

    )

}

export default CompHomePrincipalAdministrador;