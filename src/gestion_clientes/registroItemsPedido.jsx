import axios from 'axios'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CompNavegacionVertical from "../navegacion_vertical/navegacion";
import CompHeader from "../header/header";

const URI = 'http://localhost:8000/registro-items/';

const CompRegistroItemsPedido = () => {
  const [items, setItems] = useState([{ cantidad: '', producto: '', precio_unitario: '', total: '' }]);
  const { id_pedido } = useParams();
  const navigate = useNavigate();


  const formatoValor = (valor) => {
    const formatter = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });
    return formatter.format(valor).replace("COP", "").trim();
  }

  const calculateTotal = (index) => {
    const item = items[index];
    const total = item.cantidad * item.precio_unitario;
    const values = [...items];
    values[index].total = total;
    setItems(values);
  }

  const handleItemChange = (index, event) => {
    const values = [...items];
    values[index][event.target.name] = event.target.value.replace(/\D/g, "");
    setItems(values);
    calculateTotal(index);
    getTotal();
  };

  const handleAddItem = () => {
    const values = [...items];
    values.push({ cantidad: '', producto: '', precio_unitario: '', total: '' });
    setItems(values);
  };

  const handleDeleteItem = (index) => {
    const values = [...items];
    values.splice(index, 1);
    setItems(values);
  };

  const handleSubmit = async () => {
    const data = { items };
    const response = await axios.post(`${URI}${id_pedido}`, data);
    console.log('Datos enviados correctamente', response);
    navigate('/clientes');
  };

  const getTotal = () => {
    let total = 0;
    items.forEach(item => {
      total += item.total;
    });
    return total;
  };


  return (
    <div className=''>
      <CompNavegacionVertical />
      <CompHeader />
      <div className='cmp-container-add-item'>
        <p className='markey-title-create-employees'>Registra el detalle del pedido</p>
        {items.map((item, index) => (
          <div className='markey-container-form-input' key={index}>
            <ul className='cmp-markey-datos-input-employees'>
              <li>
                <input
                  type="text"
                  className='markey-input-form'
                  name="cantidad"
                  placeholder="Ingresa la cantidad"
                  value={item.cantidad} onChange={event => handleItemChange(index, event)} />
              </li>
              <li>
                <input
                  type="text"
                  name="producto"
                  className='markey-input-form'
                  placeholder="Producto"
                  value={item.producto}
                  onChange={event => handleItemChange(index, event)} />
              </li>
            </ul>
            <ul className='cmp-markey-datos-input-employees'>
              <li>
                <input
                  type="text"
                  className='markey-input-form'
                  name="precio_unitario"
                  placeholder="Precio unitario del producto"
                  value={formatoValor(item.precio_unitario)}
                  onChange={event => handleItemChange(index, event)} />
              </li>
              <li>
                <input
                  type="text"
                  className='markey-input-form'
                  name="total"
                  readOnly
                  placeholder="Total"
                  value={item.total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} onChange={event => handleItemChange(index, event)} />
              </li>
            </ul>
            <button className='button-agregar-item' onClick={() => handleDeleteItem(index)}>Eliminar ítem</button>
          </div>
        ))}
        <div className='cmp-container-button-item'>
          <button className='button-agregar-item' onClick={handleAddItem}>Agregar ítem</button>
        </div>
        <div>
          <div>
            <p>Total del pedido: {getTotal().toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
          </div>
        </div>
        <div>
          <button onClick={() => {
            handleSubmit();
            navigate(`/clientes`);
          }}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default CompRegistroItemsPedido;