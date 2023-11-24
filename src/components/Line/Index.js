import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import ChartJS, { CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js/auto';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const Chart = () => {
  const [barThickness, setBarThickness] = useState(50);

  useEffect(() => {
    const handleResize = () => {
      const newBarThickness = window.innerWidth <= 768 ? 20 : 50; // Ajuste la valeur selon tes besoins
      setBarThickness(newBarThickness);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const options = {
    scales: {
      x: {
        type: 'category',
        grid: {
          display: false, // Masque les lignes de repère verticales
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10, // Ajuste la distance entre les lignes horizontales (5 unités dans cet exemple)
        },
     
      },
    },
    maintainAspectRatio: false,
  };

  const data = {
    labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Novembre', 'Decembre'],
    datasets: [
      {
        label: 'conteneur entres',
        data: [3, 6, 1, 50, 12, 36, 47, 20, 13, 10, 19, 70],
        backgroundColor: '#0994f1',
        borderColor: '#0994f1',
        borderWidth: 1,
        barThickness: barThickness,
  
      },
    ],
  };


  return (
    <div style={{height: '40vh' }} className='px-4 py-4'>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Chart;
