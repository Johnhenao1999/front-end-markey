import logo from './logo.svg';
import './App.css';

//Importamos el componente 
import CompShowUsuarios from './usuarios/mostrarUsuarios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompCreateUsuarios from './usuarios/crearUsuarios';
import CompEditarUsuarios from './usuarios/editarUsuarios';
import CompHomePrincipalAdministrador from './home_administrador/homePrincipalAdministrador';
import CompMostrarInventario from './gestion_inventario/mostrarInventario';
import CompHomePrincipal from './home_principal/homePrincipal';
import CompPruebaRegistro from './registro_horas_empleados/registrarHorasEmpleados';
import CompMostrarHorasEmpleado from './usuarios/mostrarUsuarioHoras';
import CompIngresarHora from './usuarios/agregarHoraEmpleado';
import CompCreateCliente from './gestion_clientes/crearClientes';
import CompShowClientes from './gestion_clientes/mostrarClientes';
import CompRegistroPedido from './gestion_clientes/crearPedido';
import CompPedidoCliente from './gestion_clientes/mostrarPedidos';
import CompRegistroItemsPedido from './gestion_clientes/registroItemsPedido';
import CompMostrarDetallePedidos from './gestion_clientes/mostrarDetallePedido';

  
function App() {
  return (
    <div className="App"> 
      <BrowserRouter> 
        <Routes>
        <Route path='/' element={<CompHomePrincipal />} />
          <Route path='/homeAdministrador' element={<CompHomePrincipalAdministrador />} />
          <Route path='/empleados' element={<CompShowUsuarios />} />
          <Route path='/prueba' element={<CompMostrarInventario />} />
          <Route path='/create' element={<CompCreateUsuarios />} />
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

        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;

