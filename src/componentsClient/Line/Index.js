import { Bar } from 'react-chartjs-2';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase/firebaseConfig';
import { useEffect, useState } from 'react';
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';
import { useSelector } from 'react-redux';
import ChartJS, { CategoryScale, LinearScale, PointElement, BarElement, LineElement } from 'chart.js/auto';

const LineChartClient = () => {
 const user = useSelector((state) => state.platformeSuivi.userOnline);
 const [donneesEnvoi, setDonneesEnvoi] = useState([]);
 const [loading, setLoading] = useState(true);


 const q = query(collection(db, "DatasEnvoi"), where("email", "==", `${user}`));
 useEffect(() => {
  const unsubscribe = onSnapshot(q, (querySnapchot) => {
    const datas = [];
    querySnapchot.forEach((doc) => {
      datas.push(doc.data());
    });

    if (JSON.stringify(datas) !== JSON.stringify(donneesEnvoi)) {
      setDonneesEnvoi(datas);
    }

    setLoading(false);
    return () => {
      unsubscribe();
    };
  });
}, [q, donneesEnvoi]);


const labelEnvois = donneesEnvoi && donneesEnvoi.map(i=>i.nomProduit);
const dataLabelEnvois = donneesEnvoi && donneesEnvoi.map(i=>i.etat);

const options = {
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
        callback: function (value, index, values) {
          switch (value) {
            case 1:
              return 'PAD';
            case 2:
              return 'BMD';
            case 3:
              return 'PMD';
            case 4:
              return 'A quai';
            case 5:
              return 'dédouanement';
            case 6:
              return 'Sortie port';
            case 7:
              return 'En transit';
            case 8:
              return 'Livraison partielle';
            case 9:
              return 'Livraison totale';
            default:
              return value;
          }
        },
      },
    },
  },
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // Masque la légende complète
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          // Utilisez context.raw pour obtenir la valeur brute (le chiffre)
          const rawValue = context.raw;
          
          // Utilisez la même logique de switch pour obtenir le nom correspondant
          switch (rawValue) {
            case 1:
              return 'PAD';
            case 2:
              return 'BMD';
            case 3:
              return 'PMD';
            case 4:
              return 'A quai';
            case 5:
              return 'dédouanement';
            case 6:
              return 'Sortie port';
            case 7:
              return 'En transit';
            case 8:
              return 'Livraison partielle';
            case 9:
              return 'Livraison totale';
            default:
              return rawValue;
          }
        },
      },
    },
  },
};


  const data = {
    labels: labelEnvois,
    datasets: [
      {
        data: dataLabelEnvois, 
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64)',
        borderWidth: 1,
        barThickness: 40,
      },
      {
        type: 'line',
        data:  dataLabelEnvois, 
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 3,
        fill: false,
        yAxisID: 'y',
      },
    ],
  };

  return (
    <div style={{ height: '50vh' }} className='px-2 py-4'>
      <Bar data={data} options={options} />
    </div>
  );
}

export default LineChartClient;
