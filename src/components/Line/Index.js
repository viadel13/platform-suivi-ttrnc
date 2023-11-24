import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
)

const Chart = () => {
  const [date, setDate] = useState("");

  const [color, setColor] = useState(false);

  const options = {};

  const data = {
    labels: ["Mon", "Tues", "Wed", "Thus"],
    datasets: [
      {
        data: [3, 6, 9, 25],
        borderColor: '#f26c6d',
        backgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        pointBorderWidth : 4,
        tension : 0.5
      },
    ],
  };

  return (
    <div>
       <Line data={data} options={options} />
    </div>
  )
}

export default Chart
