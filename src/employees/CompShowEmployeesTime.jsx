import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import CompHeader from "../header/header";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";


const URI = 'http://localhost:8000/registro-horas-empleado/'

const CompMostrarHorasEmpleado = () => {
  const [ingresos, setIngresos] = useState([]);
  const { idEmpleado } = useParams(); // obtiene el parámetro de la URL (el ID del empleado)
  const [nombre, setNombre] = useState(''); // Agregamos el estado de nombre

  useEffect(() => {
    if (idEmpleado) {
      getIngresos(idEmpleado);
    }
  }, [idEmpleado]);

  const getIngresos = async (idEmpleado) => {
    const resprueba = await axios.get(`${URI}${idEmpleado}`);
    setIngresos(resprueba.data);
    setNombre(resprueba.data[0].nombre)
    console.log("Que trae resprueba", resprueba)
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
        <p className='cmp-title-section-scree'>
                        Empleado - <p className='cmp-markey-nombreEmpleado'>{nombre} </p>
                    </p>
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