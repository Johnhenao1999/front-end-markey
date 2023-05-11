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

let currentUrl = window.location.href;

let URI = 'https://markey-confecciones.up.railway.app/pedidos-finalizados/';

if (currentUrl.includes('localhost')) {
    URI = 'http://localhost:8000/pedidos-finalizados/';
}

 

export default function Bars() {
    const [pedidos, setPedidos] = useState([]);
    const [, setLoading] = useState(false);


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
                ticks: { color: '#38d39f' }
            }
        }
    };

    const midata = {
        labels: meses,
        datasets: [
            {
                label: 'Beneficios',
                data: beneficios,
                backgroundColor: '#38d39f'
            }
        ]
    };

    return <Bar data={midata} options={misoptions} />;
}