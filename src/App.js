import logo from './logo.svg';
import './App.css';

//Importamos el componente 
import CompShowUsuarios from './employees/CompShowEmployees';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompCreateUsuarios from './employees/CompCreateEmployees';
import CompEditarUsuarios from './employees/CompEditEmployees';
import CompHomePrincipalAdministrador from './home_administrador/homePrincipalAdministrador';
import CompMostrarInventario from './gestion_inventario/mostrarInventario';
import CompHomePrincipal from './home_principal/homePrincipal';
import CompPruebaRegistro from './registro_horas_empleados/registrarHorasEmpleados';
import CompMostrarHorasEmpleado from './employees/CompShowEmployeesTime';
import CompIngresarHora from './employees/CompNewHourEmployees';
import CompCreateCliente from './gestion_clientes/crearClientes';
import CompShowClientes from './gestion_clientes/mostrarClientes';
import CompRegistroPedido from './gestion_clientes/crearPedido';
import CompPedidoCliente from './gestion_clientes/mostrarPedidos';
import CompRegistroItemsPedido from './gestion_clientes/registroItemsPedido';
import CompMostrarDetallePedidos from './gestion_clientes/mostrarDetallePedido';
import CompShowPedidos from './gestion_pedidos/CompShowPedidos';
import CompShowPedidosFinalizados from './gestion_pedidos/CompShowPedidosFinalizados';
import CompShowItemsPedido from './gestion_pedidos/CompShowItemsPedido';

  
function App() {
  return (
    <div className="App"> 
      <BrowserRouter> 
        <Routes>
        <Route path='/' element={<CompHomePrincipal />} />
          <Route path='/homeAdministrador' element={<CompHomePrincipalAdministrador />} />
          <Route path='/empleados' element={<CompShowUsuarios />} />
          <Route path='/prueba' element={<CompMostrarInventario />} />
          <Route path='/create-employees' element={<CompCreateUsuarios />} />
          <Route path='/pruebaRegistro/:id' element={<CompPruebaRegistro />} />
          <Route path='/edit/:id' element={<CompEditarUsuarios />} />
          <Route path='/registro-horas-empleado/:idEmpleado' element={<CompMostrarHorasEmpleado />} />
          <Route path='/ingresar_fecha/:idEmpleado' element={<CompIngresarHora />} />
          <Route path='/create-cliente' element={<CompCreateCliente />} />
          <Route path='/clientes' element={<CompShowClientes />} />
          <Route path='/registro-pedidos/:id_cliente' element={<CompRegistroPedido />} />
          <Route path='/pedidos/:id_cliente' element={<CompPedidoCliente />} />
          <Route path='/registro-items/:id_pedido' element={<CompRegistroItemsPedido />} />
          <Route path='/mostrar-items-pedido/:id_cliente' element={<CompMostrarDetallePedidos />} />
          <Route path='/pedidos-activos' element={<CompShowPedidos />} />
          <Route path='/pedidos-finalizados' element={<CompShowPedidosFinalizados />} />
          <Route path='/items-pedido/:id_pedido' element={<CompShowItemsPedido />} />

        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;

