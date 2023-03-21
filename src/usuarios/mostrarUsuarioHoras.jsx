import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const URI = 'http://localhost:8000/holamundo/'

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
    const resprueba = await axios.get(`${URI}empleados-ingresos/${idEmpleado}`);
    setIngresos(resprueba.data);
    console.log("horas ingresos new", resprueba)
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <table className='table'>
            <thead className='table-primary'>
              <tr>
                <th>Nombre</th>
                <th>Hora entrada</th>
                <th>Hora salida</th>
                <th>Total a pagar</th>
              </tr>
            </thead>
            <tbody>
              {ingresos.map((ingreso) => (
                <tr key={ingreso.idempleado}>
                  <td> {ingreso.nombre} </td>
                  <td> {ingreso.hora_ingreso} </td>
                  <td> {ingreso.hora_salida} </td>
                  <td> {ingreso.total_pagar} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompMostrarHorasEmpleado 