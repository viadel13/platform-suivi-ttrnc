import { Bar } from 'react-chartjs-2';
import ChartJS, { CategoryScale, LinearScale, PointElement, BarElement, LineElement } from 'chart.js/auto';

const LineChartClient = () => {
  const options = {
    indexAxis: 'y', // Spécifiez que l'axe avec des libellés personnalisés est l'axe Y
    scales: {
      x: {
        type: 'category',
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        labels: ['GH', 'PAD', 'PMD', 'BMD', 'CAO', 'CPD', 'CYP'],
      },
    },
    maintainAspectRatio: false,
  };


  const data = {
    labels: ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"],
    datasets: [
      {
        label: 'conteneur entres',
        data: [1, 2, 3, 4, 5, 6, 7], 
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64)',
        borderWidth: 1,
        barThickness: 40,
      },
      // {
      //   type: 'line',
      //   label: 'Clients inscrits',
      //   data:  [10, 8, 5, 4, 11, 16, 20], 
      //   borderColor: 'rgba(54, 162, 235, 1)',
      //   borderWidth: 3,
      //   fill: false,
      //   yAxisID: 'y',
      // },
    ],
  };

  return (
    <div style={{ height: '50vh' }} className='px-2 py-4'>
      <Bar data={data} options={options} />
    </div>
  );
}

export default LineChartClient;
