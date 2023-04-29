/* import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import axios from "axios";
import { useState, useEffect } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const URI = 'http://localhost:8000/pedidos/'

export default function Bars() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllPedidos();

    }, []);

    const getAllPedidos = async () => {
        try {
            const res = await axios.get(URI);
            setPedidos(res.data);
            console.log("PEDIDOS BARRA", res)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const pedidosPorMes = pedidos.reduce((result, pedido) => {
        const fecha = new Date(pedido.fecha);
        const mes = meses[fecha.getMonth()];
        result[mes] = (result[mes] || 0) + Number(pedido.precio_pedido);
        return result;
    }, {});
    
    const beneficios = Object.values(pedidosPorMes);

    const misoptions = {
        responsive: true,
        animation: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                min: 0,
                max: 100
            },
            x: {
                ticks: { color: 'rgba(0, 220, 195)' }
            }
        }
    };

    const midata = {
        labels: meses,
        datasets: [
            {
                label: 'Beneficios',
                data: beneficios,
                backgroundColor: 'rgba(0, 220, 195, 0.5)'
            }
        ]
    };

    return <Bar data={midata} options={misoptions} />;
} */

import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import axios from "axios";
import { useState, useEffect } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const URI = 'http://localhost:8000/pedidos-finalizados/'


export default function Bars() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        getAllPedidos();

    }, []);

    const getAllPedidos = async () => {
        try {
            const res = await axios.get(URI);
            setPedidos(res.data);
            console.log("PEDIDOS BARRA", res)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };



    const mesesAbreviados = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    const pedidosPorMes = {};

    // Inicializa los valores de todos los meses en cero
    for (let i = 0; i < 12; i++) {
        pedidosPorMes[i] = 0;
    }

    pedidos.forEach((pedido) => {
        const fecha = new Date(pedido.fecha_finalizacion);
        const mes = fecha.getMonth();
        if (pedidosPorMes[mes] === undefined) {
            pedidosPorMes[mes] = Number(pedido.precio_pedido);
        } else {
            pedidosPorMes[mes] += Number(pedido.precio_pedido);
        }
    });

    const beneficios = Object.values(pedidosPorMes);
    const meses = Object.keys(pedidosPorMes).map(mes => mesesAbreviados[mes]);


    const misoptions = {
        responsive: true,
        animation: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                min: 0,
                max: pedidos.precio_pedido
            },
            x: {
                ticks: { color: 'rgba(0, 220, 195)' }
            }
        }
    };

    const midata = {
        labels: meses,
        datasets: [
            {
                label: 'Beneficios',
                data: beneficios,
                backgroundColor: 'rgba(0, 220, 195, 0.5)'
            }
        ]
    };

    return <Bar data={midata} options={misoptions} />;
}