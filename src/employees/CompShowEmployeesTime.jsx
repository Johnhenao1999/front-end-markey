import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import CompHeader from "../header/header";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";

let currentUrl = window.location.href;


let URI = 'https://markey-confecciones.up.railway.app/registro-horas-empleado/'


if (currentUrl.includes('localhost')) {
  URI = 'http://localhost:8000/registro-horas-empleado/';
}



const CompMostrarHorasEmpleado = () => {
  const [ingresos, setIngresos] = useState([]);
  const { idEmpleado } = useParams(); // obtiene el parámetro de la URL (el ID del empleado)
  const [nombre, setNombre] = useState(''); // Agregamos el estado de nombre
  const [fechaInicial, setFechaInicial] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');

  useEffect(() => {
    if (idEmpleado) {
      getIngresos(idEmpleado, fechaInicial, fechaFinal);
    }
  }, [idEmpleado, fechaInicial, fechaFinal]);

  useEffect(() => {
    // Agrega el filtro automático cuando cambia la fechaInicial
    setFechaFinal(fechaInicial);
  }, [fechaInicial]);


  const getIngresos = async (idEmpleado, fechaInicial, fechaFinal) => {
    const resprueba = await axios.get(`${URI}${idEmpleado}?fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`);
    setIngresos(resprueba.data);
    setNombre(resprueba.data[0].nombre)
  };

  const eliminarRegistro = async (idRegistro) => {
    try {
      await axios.delete(`https://markey-confecciones.up.railway.app/ingreso_empleados/${idRegistro}`);
      setIngresos(ingresos.map((empleado) => {
        return {
          ...empleado,
          registros: empleado.registros.filter(registro => registro.idingreso !== idRegistro)
        };
      }));
    } catch (error) {
      console.error(error);
    }
  }

  const renderRegistros = (empleado) => {

    const registrosFiltrados = empleado.registros.filter((registro) => {
      if (!fechaInicial || !fechaFinal) {
        return true;
      }
      const fechaRegistro = new Date(registro.fecha_registro);
      fechaRegistro.setHours(0, 0, 0, 0); // Establece la hora a medianoche
      const fechaInicialConHora = new Date(fechaInicial);
      fechaInicialConHora.setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), new Date().getMilliseconds());
      const fechaFinalConHora = new Date(fechaFinal);
      fechaFinalConHora.setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), new Date().getMilliseconds());
      return fechaRegistro >= fechaInicialConHora && fechaRegistro <= fechaFinalConHora.getTime() + 86399999
    });

    const registrosConTotal = registrosFiltrados.map((registro) => ({
      ...registro,
      total_pagar: Number(registro.total_pagar)
    }));

    const gruposDeCincoRegistros = [];

    for (let i = 0; i < registrosConTotal.length; i += 5) {
      const grupo = registrosConTotal.slice(i, i + 5);
      gruposDeCincoRegistros.push(grupo);
    }

    return (
      <>
        {gruposDeCincoRegistros.map((grupo, indice) => (
          <>
            {grupo.map((registro) => (
              <tr key={registro.idingreso}>
                <td>{registro.fecha_registro ? new Date(registro.fecha_registro).getDate() + ' ' + new Date(registro.fecha_registro).toLocaleString('default', { month: 'long' }) + ' de ' + new Date(registro.fecha_registro).getFullYear() : ''}</td>
                <td>{registro.hora_ingreso_manana} AM</td>
                <td>{registro.hora_salida_manana} AM</td>
                <td>{registro.hora_ingreso} PM</td>
                <td>{registro.hora_salida} PM</td>
                <td>{registro.total_pagar.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                <td className="colum-table-actions-hours">
                  <Link onClick={() => eliminarRegistro(registro.idingreso)} className='btn-action'><i className="fas fa-trash-alt"></i></Link>
                </td>
              </tr>
            ))}
            <tr key={`total-${indice}`}>
              <td colSpan={1} style={{ textAlign: 'right', verticalAlign: 'middle', fontWeight: 700 }}>Total a pagar:</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td style={{ verticalAlign: 'middle', fontWeight: 700 }}>
                {grupo.reduce((total, registro) => total + registro.total_pagar, 0).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
              </td>
            </tr>
          </>
        ))}
      </>
    );
  };
  return (
    <div className='container'>
      <CompHeader />
      <CompNavegacionVertical />

      <div className='cmp-screen-container'>
        <div className='table-empleados-container'>
          <nav class="breadcrumb">
            <ul>
              <li><Link to={'/homeAdministrador'}>Inicio</Link></li>
              <li><Link to={'/empleados'}>Empleados</Link></li>
              <li><Link to={''}>Historial de horas</Link></li>
            </ul>
          </nav>
          <p className='cmp-title-section-scree'>
            Registro horas de <p className='cmp-markey-nombreEmpleado'>{nombre} </p>
          </p>
          <div style={{ display: "flex" }}>
            <div>
              <p style={{marginBottom:"4px"}}>Fecha inicial</p>
              <input
                type='date'
                id='fecha-inicial'
                value={fechaInicial}
                onChange={(e) => setFechaInicial(e.target.value)}
                class='input-field'
              />
            </div>
            <div>
            <p style={{marginBottom:"4px"}}>Fecha final</p>
              <input
                type='date'
                id='fecha-final'
                value={fechaFinal}
                onChange={(e) => setFechaFinal(e.target.value)}
                class='input-field'
              />
            </div>
            <div>
              <p style={{color:"transparent", marginBottom:"4px"}}>Hola</p>
              <button onClick={() => {
                setFechaInicial('');
                setFechaFinal('');
              }} class='clear-button'>
                <i class='fa fa-arrow-left'></i>
              </button>
            </div>
          </div>
          <table className='table-empleados'>
            <thead className='table-primary'>
              <tr>
                <th>Registro</th>
                <th>Hora entrada</th>
                <th>Hora salida</th>
                <th>Hora entrada</th>
                <th>Hora salida</th>
                <th>Valor día</th>
                <th>Operaciones</th>
              </tr>
            </thead>
            <tbody>
              {ingresos.map((empleado) => (
                renderRegistros(empleado)
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompMostrarHorasEmpleado;