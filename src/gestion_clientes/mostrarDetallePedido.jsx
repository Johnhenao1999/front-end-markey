import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const URI = 'http://localhost:8000/mostrar-items-pedidos/'

const CompMostrarDetallePedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const { id_cliente } = useParams(); // obtiene el parámetro de la URL (el ID del cliente)

  useEffect(() => {
    if (id_cliente) {
      getPedidos(id_cliente);
    }
  }, [id_cliente]);

  const getPedidos = async (id_cliente) => {
    const resprueba = await axios.get(`${URI}${id_cliente}`);
    setPedidos(resprueba.data);
    console.log(resprueba)
  };

  

  // Calcula la suma de los totales de todos los items
  const total = pedidos.length
  ? pedidos.reduce((total, pedido) => {
      return (
        total +
        pedido.items.reduce((totalItems, item) => {
          return totalItems + parseFloat(item.total);
        }, 0)
      );
    }, 0)
  : 0;

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <table className='table'>
            <thead className='table-primary'>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id_pedido}>
                  <td>
                    <table className='table'>
                      <thead className='table-primary'>
                        <tr>
                          <th>Producto</th>
                          <th>Cantidad</th>
                          <th>Precio unitario</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pedido.items.map((item) => (
                          <tr key={`${pedido.id_pedido}-${item.producto}`}>
                            <td>{item.producto}</td>
                            <td>{item.cantidad}</td>
                            <td>{parseFloat(item.precio_unitario).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                            <td>{parseFloat(item.total).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
                <td>Total: {total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompMostrarDetallePedidos;