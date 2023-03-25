import axios from 'axios'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const URI = 'http://localhost:8000/registro-items/';

const CompRegistroItemsPedido = () => {
  const [items, setItems] = useState([{ cantidad: '', producto: '', precio_unitario: '', total: '' }]);
  const { id_pedido } = useParams();
  const navigate = useNavigate();

  const handleItemChange = (index, event) => {
    const values = [...items];
    values[index][event.target.name] = event.target.value;
    setItems(values);
  };

  const handleAddItem = () => {
    const values = [...items];
    values.push({ cantidad: '', producto: '', precio_unitario: '', total: '' });
    setItems(values);
  };

  const handleSubmit = async () => {
    const data = { items };
    const response = await axios.post(`${URI}${id_pedido}`, data);
    console.log('Datos enviados correctamente', response);
    navigate('/clientes');
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <input type="text" name="cantidad" placeholder="Ingresa la cantidad" value={item.cantidad} onChange={event => handleItemChange(index, event)} />
          <input type="text" name="producto" placeholder="Producto" value={item.producto} onChange={event => handleItemChange(index, event)} />
          <input type="text" name="precio_unitario" placeholder="Precio unitario del producto" value={item.precio_unitario} onChange={event => handleItemChange(index, event)} />
          <input type="text" name="total" placeholder="Total" value={item.total} onChange={event => handleItemChange(index, event)} />
        </div>
      ))}
      <button onClick={handleAddItem}>Agregar ítem</button>
      <button onClick={() => {
                handleSubmit();
                navigate(`/clientes`);
            }}>Guardar</button>
    </div>
  );
};

export default CompRegistroItemsPedido;