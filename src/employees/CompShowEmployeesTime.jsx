/* import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const URI = 'http://localhost:8000/registro-horas-empleado/'

const CompMostrarHorasEmpleado = () => {
  const [ingresos, setIngresos] = useState([]);
  const { idEmpleado } = useParams(); // obtiene el parámetro de la URL (el ID del empleado)

  useEffect(() => {
    if (idEmpleado) {
      getIngresos(idEmpleado);
    }
  }, [idEmpleado]);
  console.log("horas ingresos new", idEmpleado)

  const getIngresos = async (idEmpleado) => {
    const resprueba = await axios.get(`${URI}${idEmpleado}`);
    setIngresos(resprueba.data);
    console.log("horas prueba new", resprueba)
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <table className='table'>
            <thead className='table-primary'>
              <tr>
                <th>Nombre</th>
                <th>Fecha registro</th>
                <th>Hora entrada mañana</th>
                <th>Hora salida mañana</th>
                <th>Hora entrada tarde</th>
                <th>Hora salida tarde</th>
                <th>Total a pagar</th>
              </tr>
            </thead>
            <tbody>
              {ingresos.map((empleado) => (
                empleado.registros.map((registro) => (
                  <tr key={registro.idingreso}>
                    <td>{empleado.nombre}</td>
                    <td>{registro.fecha_registro ? new Date(registro.fecha_registro).toLocaleDateString('es-ES') : ''}</td>
                    <td>{registro.hora_ingreso_manana}</td>
                    <td>{registro.hora_salida_manana}</td>
                    <td>{registro.hora_ingreso}</td>
                    <td>{registro.hora_salida}</td>
                    <td>{registro.total_pagar}</td>
                  </tr>
                ))
              ))} 
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompMostrarHorasEmpleado  */

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const URI = 'http://localhost:8000/registro-horas-empleado/'

const CompMostrarHorasEmpleado = () => {
  const [ingresos, setIngresos] = useState([]);
  const { idEmpleado } = useParams(); // obtiene el parámetro de la URL (el ID del empleado)

  useEffect(() => {
    if (idEmpleado) {
      getIngresos(idEmpleado);
    }
  }, [idEmpleado]);

  const getIngresos = async (idEmpleado) => {
    const resprueba = await axios.get(`${URI}${idEmpleado}`);
    setIngresos(resprueba.data);
    console.log("Que trae resprueba" ,resprueba)
  };

  const eliminarRegistro = async (idRegistro) => {
    try {
      await axios.delete(`http://localhost:8000/ingreso_empleados/${idRegistro}`);
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
    const registrosConTotal = empleado.registros.map((registro) => ({
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
                <td>{empleado.nombre}</td>
                <td>{registro.fecha_registro ? new Date(registro.fecha_registro).toLocaleDateString('es-ES') : ''}</td>
                <td>{registro.hora_ingreso_manana} AM</td>
                <td>{registro.hora_salida_manana} AM</td>
                <td>{registro.hora_ingreso} PM</td>
                <td>{registro.hora_salida} PM</td>
                <td>{registro.total_horas} HRS</td>
                <td>{registro.total_pagar.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                <td>
                  <button onClick={() => eliminarRegistro(registro.idingreso)}>Eliminar</button>
                </td>
              </tr>
            ))}
            <tr key={`total-${indice}`}>
              <td colSpan={4} style={{ textAlign: 'right' }}>Total a pagar:</td>
              <td>
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
      <div className='row'>
        <div className='col'>
          <table className='table'>
            <thead className='table-primary'>
              <tr>
                <th>Nombre</th>
                <th>Fecha registro</th>
                <th>Hora entrada mañana</th>
                <th>Hora salida mañana</th>
                <th>Hora entrada tarde</th>
                <th>Hora salida tarde</th>
                <th>Total horas</th>
                <th>Valor dia</th>
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