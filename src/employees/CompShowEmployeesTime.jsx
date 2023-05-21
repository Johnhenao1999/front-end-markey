import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import CompHeader from "../header/header";
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import logo from "../assets/logo.png";


let currentUrl = window.location.href;


let URI = 'https://markey-confecciones.up.railway.app/registro-horas-empleado/'
let URI_DELETE = 'https://markey-confecciones.up.railway.app/ingreso_empleados'


if (currentUrl.includes('localhost')) {
  URI = 'http://localhost:8000/registro-horas-empleado/';
  URI_DELETE = 'http://localhost:8000/ingreso_empleados';
}

const CompMostrarHorasEmpleado = () => {
  const [ingresos, setIngresos] = useState([]);
  const { idEmpleado } = useParams(); // obtiene el parámetro de la URL (el ID del empleado)
  const [nombre, setNombre] = useState(''); // Agregamos el estado de nombre
  const [apellido, setApellido] = useState(''); // Agregamos el estado de apellido
  const [fechaInicial, setFechaInicial] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');
  const [showDeleteErrorModal, setShowDeleteErrorModal] = useState(false);
  const navigate = useNavigate();

  const generarYDescargarPDF = async () => {
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();

      const imageUrl = logo;

      // Descargar la imagen desde la URL
      const response = await fetch(imageUrl);
      const imageBytes = await response.arrayBuffer();


      // Agregar la imagen al PDF
      const image = await pdfDoc.embedPng(imageBytes);

      // Dibuja la imagen en una posición específica del PDF
      const imageOptions = {
        x: 420, // Coordenada X del origen de la imagen
        y: 740, // Coordenada Y del origen de la imagen
        width: 150, // Ancho de la imagen
        height: 100, // Altura de la imagen
      };

      page.drawImage(image, imageOptions);

      const titulo = `Registro horas de ${nombre} ${apellido}`;

      // Dibujar el título en el PDF
      const tituloOptions = {
        x: 50,
        y: page.getHeight() - 60,
        size: 16,
        font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
        color: rgb(0, 0, 0),
      };

      page.drawText(titulo, tituloOptions);


      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontSize = 10;

      let y = page.getHeight() - 30;

      const encabezados = 'Fecha registro      Ingreso mañana      Salida mañana      Ingreso tarde      Salida tarde      Valor del día';
      const encabezadosY = y - 80;

      const tablaEstilos = {
        encabezado: {
          textColor: rgb(0, 0, 0),
          font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
          fontSize: 10,
        },
        registro: {
          textColor: rgb(0, 0, 0),
          font: await pdfDoc.embedFont(StandardFonts.Helvetica),
          fontSize: 10,
        },
      };

      const drawTextWithOptions = (text, options) => {
        const { x, y, font, fontSize, textColor } = options;
        page.setFont(font);
        page.setFontSize(fontSize);
        page.drawText(text, { x, y, color: textColor });
      };

      drawTextWithOptions(encabezados, { x: 50, y: encabezadosY, ...tablaEstilos.encabezado });

      y -= 100; // Espacio valores

      ingresos.forEach((empleado) => {

        const registrosFiltrados = empleado.registros.filter((registro) => {
          if (!fechaInicial || !fechaFinal) {
            return true;
          }
          const fechaRegistro = new Date(registro.fecha_registro);
          fechaRegistro.setHours(0, 0, 0, 0);
          const fechaInicialConHora = new Date(fechaInicial);
          fechaInicialConHora.setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), new Date().getMilliseconds());
          const fechaFinalConHora = new Date(fechaFinal);
          fechaFinalConHora.setHours(new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), new Date().getMilliseconds());
          return fechaRegistro >= fechaInicialConHora && fechaRegistro <= fechaFinalConHora.getTime() + 86399999;
        });

        let totalPagarSuma = 0;

        registrosFiltrados.forEach((registro) => {

          const fecha = registro.fecha_registro ? new Date(registro.fecha_registro).toLocaleDateString('es-ES') : '';
          const horaIngresoManana = registro.hora_ingreso_manana ? registro.hora_ingreso_manana + ' AM' : '';
          const horaSalidaManana = registro.hora_salida_manana ? registro.hora_salida_manana + ' AM' : '';
          const horaIngreso = registro.hora_ingreso ? registro.hora_ingreso + ' PM' : '';
          const horaSalida = registro.hora_salida ? registro.hora_salida + ' PM' : '';
          const totalPagar = registro.total_pagar ? parseFloat(registro.total_pagar.replace(/[^0-9.-]+/g, "")) : 0;
          const totalPagarFormateado = totalPagar.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });

          const text = `     ${fecha}                 ${horaIngresoManana}                 ${horaSalidaManana}              ${horaIngreso}              ${horaSalida}              ${totalPagarFormateado}`;
          page.drawText(text, { x: 50, y, size: fontSize, font });

          y -= 20; //Espacio entre filas
          // Sumar el valor al totalPagarSuma
          if (registro.total_pagar) {
            totalPagarSuma += totalPagar;
          }
        });

        // Mostrar la suma total en la última fila
        const totalPagarTexto = `     Total a Pagar: ${totalPagarSuma.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}`;
        page.drawText(totalPagarTexto, { x: 50, y, size: fontSize, font });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'registro_horas.pdf';
      link.click();

      console.log('PDF generado y descargado con éxito');
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };

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
    if (resprueba.data.length === 0) {
      setShowDeleteErrorModal(true);
    }
    setIngresos(resprueba.data);
    setNombre(resprueba.data[0].nombre)
    setApellido(resprueba.data[0].apellido)
    console.log(resprueba)
  };

  const eliminarRegistro = async (idRegistro) => {
    try {
      await axios.delete(`${URI_DELETE}/${idRegistro}`);
      setIngresos(ingresos.map((empleado) => {
        return {
          ...empleado,
          registros: empleado.registros.filter(registro => registro.idingreso !== idRegistro)
        };
      }));
    } catch (error) {
      console.error(error);
    }
  };

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
        {gruposDeCincoRegistros.length === 0 && (
          <tr>
            <td colSpan="7">No hay registros para la fecha seleccionada.</td>
          </tr>
        )}
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
                  <Link onClick={() => eliminarRegistro(registro.idingreso)} style={{ background: "#4481eb" }} className='btn-action'><i className="fas fa-trash-alt"></i></Link>
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
            Registro horas de <p className='cmp-markey-nombreEmpleado'>{nombre} {apellido} </p>
          </p>
          <div style={{ display: "flex" }}>
            <div>
              <p style={{ marginBottom: "4px" }}>Fecha inicial</p>
              <input
                type='date'
                id='fecha-inicial'
                value={fechaInicial}
                onChange={(e) => setFechaInicial(e.target.value)}
                class='input-field'
              />
            </div>
            <div>
              <p style={{ marginBottom: "4px" }}>Fecha final</p>
              <input
                type='date'
                id='fecha-final'
                value={fechaFinal}
                onChange={(e) => setFechaFinal(e.target.value)}
                class='input-field'
              />
            </div>
            <div className="cmp-container-buttons-pdf">
              <button onClick={() => {
                setFechaInicial('');
                setFechaFinal('');
              }} class='clear-button'>
                <i class='fa fa-arrow-left'></i>
              </button>
              <button onClick={generarYDescargarPDF} className='button-pdf'>
                <i className='fa fa-download'></i> Descargar PDF
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
        {showDeleteErrorModal && (
          <div className="modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Error al visualizar el historial de horas del empleado.</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={() => {
                      setShowDeleteErrorModal(false);
                      navigate('/clientes');
                    }}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Actualmente este empleado no tienes horas registradas.</p>
                </div>
                <div className="modal-footer">
                  {<button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setShowDeleteErrorModal(false);
                      navigate(`/empleados`);
                    }}
                  >
                    Aceptar
                  </button>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompMostrarHorasEmpleado;