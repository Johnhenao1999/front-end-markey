/* import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const URI = 'http://localhost:8000/mostrar-items-pedidos/'

const CompShowItemsPedido = () => {
  const [itemsPedido, setItemsPedido] = useState([]);
  const { id_pedido } = useParams(); // obtiene el parámetro de la URL (el ID del empleado)

  useEffect(() => {
    if (id_pedido) {
        getItemsPedido(id_pedido);
    }
  }, [id_pedido]);

  const getItemsPedido = async (id_pedido) => {
    const resprueba = await axios.get(`${URI}${id_pedido}`);
    setItemsPedido(resprueba.data);
    console.log("Que trae resprueba" ,resprueba)
  };

  

};

export default CompShowItemsPedido; */
/* import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const URI = 'http://localhost:8000/mostrar-items-pedidos/'

const CompShowItemsPedido = () => {
  const [itemsPedido, setItemsPedido] = useState([]);
  const { id_pedido } = useParams(); // obtiene el parámetro de la URL (el ID del pedido)

  useEffect(() => {
    if (id_pedido) {
      getItemsPedido(id_pedido);
    }
  }, [id_pedido]);

  const getItemsPedido = async (id_pedido) => {
    const resprueba = await axios.get(`${URI}${id_pedido}`);
    setItemsPedido(resprueba.data);

    const total = itemsPedido.length
    ? itemsPedido.reduce((total, pedido) => {
        return (
          total +
          pedido.items.reduce((totalItems, item) => {
            return totalItems + parseFloat(item.total);
          }, 0)
        );
      }, 0)
    : 0;
  };



  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
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
              {itemsPedido.items &&
                itemsPedido.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.producto}</td>
                    <td>{item.cantidad}</td>
                    <td>
                      {parseFloat(item.precio_unitario).toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                      })}
                    </td>
                    <td>
                      {parseFloat(item.total).toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                      })}
                    </td>
                  </tr>
                ))}
              <tr>
                <td>Total:</td>
                <td></td>
                <td></td>
                <td>
                  {total.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompShowItemsPedido; */

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const URI = 'http://localhost:8000/mostrar-items-pedidos/'

const CompShowItemsPedido = () => {
  const [itemsPedido, setItemsPedido] = useState([]);
  const [total, setTotal] = useState(0);
  const { id_pedido } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id_pedido) {
      getItemsPedido(id_pedido);
    }
  }, [id_pedido]);

  const getItemsPedido = async (id_pedido) => {
    const resprueba = await axios.get(`${URI}${id_pedido}`);
    setItemsPedido(resprueba.data);
    
    const totalPedido = resprueba.data.items.reduce((totalItems, item) => {
      return totalItems + parseFloat(item.total);
    }, 0);
    setTotal(totalPedido);
  };

  // Verificar si itemsPedido está vacío y mostrar un modal si es el caso
  useEffect(() => {
    if (itemsPedido.items && itemsPedido.items.length === 0) {
      setShowModal(true);
    }
  }, [itemsPedido]);

  return (
    <div className='container'>
      {showModal && (
         <div className="modal" tabIndex="-1" role="dialog">
         <div className="modal-dialog" role="document">
             <div className="modal-content">
                 <div className="modal-header">
                     <h5 className="modal-title">Este pedido no tiene detalle, por favor registra el detalle del pedido</h5>
                     <button
                         type="button"
                         className="close"
                         onClick={() => {
                             setShowModal(false);
                             navigate('/clientes');
                         }}
                     >
                         <span aria-hidden="true">&times;</span>
                     </button>
                 </div>
                 <div className="modal-body">
                     <p>Este pedido no tiene detalle, por favor registra el detalle del pedido.</p>
                 </div>
                 <div className="modal-footer">
                     <button
                         type="button"
                         className="btn btn-primary"
                         onClick={() => {
                             setShowModal(false);
                             navigate('/clientes');
                         }}
                     >
                         Aceptar
                     </button>
                 </div>
             </div>
         </div>
     </div>
      )}
      <div className='row'>
        <div className='col'>
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
              {itemsPedido.items &&
                itemsPedido.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.producto}</td>
                    <td>{item.cantidad}</td>
                    <td>
                      {parseFloat(item.precio_unitario).toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                      })}
                    </td>
                    <td>
                      {parseFloat(item.total).toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                      })}
                    </td>
                  </tr>
                ))}
              <tr>
                <td>Total:</td>
                <td></td>
                <td></td>
                <td>
                  {total.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompShowItemsPedido;