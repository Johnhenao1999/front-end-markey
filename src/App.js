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
import CompCreateCustomer from './gestion_clientes/CompCreateCustomer';
import CompShowClientes from './gestion_clientes/mostrarClientes';
import CompCrearPedido from './gestion_clientes/CompCrearPedido';
import CompPedidoCliente from './gestion_clientes/mostrarPedidos';
import CompRegistroItemsPedido from './gestion_clientes/registroItemsPedido';
import CompMostrarDetallePedidos from './gestion_clientes/mostrarDetallePedido';
import CompShowPedidos from './gestion_pedidos/CompShowPedidos';
import CompShowPedidosFinalizados from './gestion_pedidos/CompShowPedidosFinalizados';
import CompShowItemsPedido from './gestion_pedidos/CompShowItemsPedido';
import CompCreateProveedores from './proveedores/CompCreateProveedores';
import CompShowProveedor from './proveedores/CompShowProveedor';
import CompUpdateProveedor from './proveedores/CompUpdateProveedor';
import CompActualizarCliente from './gestion_clientes/CompActualizarCliente';
import CompGestionarPedido from './gestion_pedidos/CompGestionPedido';

  
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
          <Route path='/crear-cliente' element={<CompCreateCustomer />} />
          <Route path='/clientes' element={<CompShowClientes />} />
          <Route path='/registro-pedidos/:id_cliente' element={<CompCrearPedido />} />
          <Route path='/pedidos/:id_pedido' element={<CompPedidoCliente />} />
          <Route path='/registro-items/:id_pedido' element={<CompRegistroItemsPedido />} />
          <Route path='/mostrar-items-pedido/:id_cliente' element={<CompMostrarDetallePedidos />} />
          <Route path='/pedidos-activos' element={<CompShowPedidos />} />
          <Route path='/pedidos-finalizados' element={<CompShowPedidosFinalizados />} />
          <Route path='/items-pedido/:id_pedido' element={<CompShowItemsPedido />} />
          <Route path='/create-proveedores' element={<CompCreateProveedores />} />
          <Route path='/proveedores' element={<CompShowProveedor />} />
          <Route path='/actualizar-proveedor/:id' element={<CompUpdateProveedor />} />
          <Route path='/editar-cliente/:id' element={<CompActualizarCliente />} />
          <Route path='/gestionar-pedido/:id' element={<CompGestionarPedido />} />
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;

