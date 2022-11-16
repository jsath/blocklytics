import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Axios from "axios"
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Filler,
Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from "moment";

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Filler,
Legend
);


const HistoryChart = () => {
const { id } = useParams();
const[response, setResponse] = useState();

useEffect(() => {
    Axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`).then(
        (res) => {setResponse(res.data)}
    )
}, [id]);

if(!response) {
return (
    <div className="wrapper-container mt-8">
    </div>
)
}
const coinChartData = response.prices.map(value => ({ x: value[0], y: value[1].toFixed(2) }));

const options = {
responsive: true
}
const data = {
labels: coinChartData.map(value => moment(value.x).format('MMM DD')),
datasets: [
    {
    fill: true,
    label: id,
    data: coinChartData.map(val => val.y),
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }
]
}

return (
<div>
    <Line options={options} data={data} />
</div>
)
}

export default HistoryChart