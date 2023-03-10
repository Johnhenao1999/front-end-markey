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
          <Route path='/edit/:id' element={<CompEditarUsuarios />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
