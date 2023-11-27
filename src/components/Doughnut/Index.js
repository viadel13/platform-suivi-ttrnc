import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartJS, { CategoryScale, LinearScale, PointElement, BarElement, LineElement } from 'chart.js/auto';
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement);

const DoughnutChar = () => {
  const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4,
    }]
  }

  const options = {
 
    maintainAspectRatio: false,
    scales: {
      x: { display: false }, // Masquer l'axe des catégories (abscisse)
      y: { display: false }  // Masquer l'axe linéaire (ordonnée)
    }
  };

  return (
    <div style={{ height: '50vh', }} className=' px-2 py-4'>
      <Doughnut data={data} options={options}  />
    </div>
  )
}

export default DoughnutChar;
