import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from "axios";
import { useState, useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

let currentUrl = window.location.href;

let URI = 'https://markey-confecciones.up.railway.app/detalle-pedido/';

if (currentUrl.includes('localhost')) {
    URI = 'http://localhost:8000/detalle-pedido/';
}




export default function Pies() {

    const [itemsPedidos, setItemsPedidos] = useState([]);
    const [, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        getAllItemsPedidos();

    }, []);

    const getAllItemsPedidos = async () => {
        try {
            const res = await axios.get(URI);
            setItemsPedidos(res.data);
            console.log("items pedidos", res)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

/*     const productos = itemsPedidos.reduce((acumulador, item) => {
        const producto = item.producto;
        const cantidad = parseInt(item.cantidad);
      
        if (!acumulador[producto]) {
          acumulador[producto] = 0;
        }
      
        acumulador[producto] += cantidad;
      
        return acumulador;
      }, {});
      
      const nombresProductos = Object.keys(productos);
      const cantidadesProductos = Object.values(productos); */

      const productos = itemsPedidos.reduce((acumulador, item) => {
        const producto = item.producto;
        const cantidad = parseInt(item.cantidad);
      
        if (!acumulador[producto]) {
          acumulador[producto] = 0;
        }
      
        acumulador[producto] += cantidad;
      
        return acumulador;
      }, {});
      
/*       const nombresProductos = Object.keys(productos);
      const cantidadesProductos = Object.values(productos); */
      
      // Ordena los objetos en base a sus valores y toma los primeros 5
      const topProductos = Object.entries(productos)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
      
      const nombresTopProductos = topProductos.map(producto => producto[0]);
      const cantidadesTopProductos = topProductos.map(producto => producto[1]);


      var options = {
        responsive: true,
        maintainAspectRatio: false,
      };

    var data = {
        labels: nombresTopProductos,
        datasets: [
            {
                data: cantidadesTopProductos,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    return <Pie data={data} options={options} />
}