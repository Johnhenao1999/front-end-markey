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

  
function App() {
  return (
    <div className="App"> 
      <BrowserRouter> 
        <Routes>
        <Route path='/' element={<CompHomePrincipal />} />
          <Route path='/homeAdministrador' element={<CompHomePrincipalAdministrador />} />
          <Route path='/mostrarUsuarios' element={<CompShowUsuarios />} />
          <Route path='/prueba' element={<CompMostrarInventario />} />
          <Route path='/create' element={<CompCreateUsuarios />} />
          <Route path='/pruebaRegistro/:id' element={<CompPruebaRegistro />} />
          <Route path='/edit/:id' element={<CompEditarUsuarios />} />
          <Route path='/empleados-ingresos/:idEmpleado' element={<CompMostrarHorasEmpleado />} />
          <Route path='/ingresar_fecha/:idEmpleado' element={<CompIngresarHora />} />
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;

