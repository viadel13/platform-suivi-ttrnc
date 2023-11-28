import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import ChartJS, { CategoryScale, LinearScale, PointElement, BarElement, LineElement } from 'chart.js/auto';
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement);

const Chart = () => {
  const [barThickness, setBarThickness] = useState(40);
  const [months, setMonths] = useState([]);
  const [donneesEnvoi, setDonneesEnvoi] = useState([]);
  const [donneesClient, setDonneesClient] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();
  const[annee, setAnnee] = useState(currentYear);
  const [yearOptions, setYearOptions] = useState([]); 

  const q = query(collection(db, "DatasEnvoi"));
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

  const queryClient = query(collection(db, "Clients"));
  useEffect(() => {
    const unsubscribe = onSnapshot(queryClient, (querySnapchot) => {
      const datas = [];
      querySnapchot.forEach((doc) => {
        datas.push(doc.data());
      });

      if (JSON.stringify(datas) !== JSON.stringify(donneesClient)) {
        setDonneesClient(datas);
      }

      setLoading(false);
      return () => {
        unsubscribe();
      };
    });
  }, [queryClient, donneesClient]);

  useEffect(() => {
    // Générer la liste des mois
    const currentYear = new Date().getFullYear();
    const monthNames = [
      "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
      "Juil", "Août", "Sep", "Oct", "Nov", "Déc"
    ];

    const monthList = [];
    for (let month = 0; month < 12; month++) {
      monthList.push(`${monthNames[month]} ${annee.toString().slice(-2)}`);
    }

    setMonths(monthList);

  }, []);

  useEffect(() => {
    // Générer la liste des années pour le champ de sélection

    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    const years = [];

    for (let year = previousYear; year <= currentYear; year++) {
      years.push(year.toString());
    }
    setYearOptions(years);
  }, []);

  const countByIndex = new Array(months.length).fill(0);
  const month = donneesEnvoi && months.forEach((month, index) => {
    // Initialiser le compteur pour cet index
    let countForIndex = 0;
    const dataFilter = donneesEnvoi.filter((entry) => {

      const entryYear = parseInt(entry.date.split('/')[2]);

      if (entryYear === parseInt(annee)) {
        
        const entryMonth = parseInt(entry.date.split('/')[1]);

        if (entryMonth === index + 1) {
          // console.log(`Trouvé: ${entryMonth} à l'index ${index + 1}`);
          // Incrémenter le compteur si un élément est trouvé
          countForIndex++;
          return true;  // Garder l'élément dans le filtre
        } else {
          // console.log(`Non trouvé: ${entryMonth} à l'index ${index + 1}`);
          return false;  // Exclure l'élément du filtre
        }
      }else{
        return false;
      } 
    });

    countByIndex[index] = countForIndex;
    // Ajouter un message indiquant quand la boucle pour un mois spécifique termine
    // console.log(`Fin de la boucle pour le mois ${index + 1}. Nombre d'éléments trouvés: ${countForIndex}`);
  });
  // console.log("Nombre d'éléments trouvés par index:", countByIndex);



  const countByIndexClient = new Array(months.length).fill(0);
  const monthClient = donneesClient && months.forEach((month, index) => {
    // Initialiser le compteur pour cet index
    let countForIndex = 0;
    const dataFilter = donneesClient.filter((entry) => {

      const entryYear = parseInt(entry.date.split('/')[2]);

      if (entryYear === parseInt(annee)) {
        
        const entryMonth = parseInt(entry.date.split('/')[1]);

        if (entryMonth === index + 1) {
          // console.log(`Trouvé: ${entryMonth} à l'index ${index + 1}`);
          // Incrémenter le compteur si un élément est trouvé
          countForIndex++;
          return true;  // Garder l'élément dans le filtre
        } else {
          // console.log(`Non trouvé: ${entryMonth} à l'index ${index + 1}`);
          return false;  // Exclure l'élément du filtre
        }
      }else{
        return false;
      } 
    });

    countByIndexClient[index] = countForIndex;
    // Ajouter un message indiquant quand la boucle pour un mois spécifique termine
    // console.log(`Fin de la boucle pour le mois ${index + 1}. Nombre d'éléments trouvés: ${countForIndex}`);
  });
  // console.log("Nombre d'éléments trouvés par index:", countByIndex);

  useEffect(() => {
    const handleResize = () => {
      const newBarThickness = window.innerWidth <= 768 ? 20 : 40; // Ajuste la valeur selon tes besoins
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
          stepSize: 2, // Ajuste la distance entre les lignes horizontales (5 unités dans cet exemple)
        },

      },
    },
    maintainAspectRatio: false,
  };

  const data = {
    labels: months,
    datasets: [
      {
        label: 'conteneur entres',
        data: countByIndex,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64)',
        borderWidth: 1,
        barThickness: barThickness,
      },
      {
        type: 'line',
        label: 'Clients inscrits',
        data: countByIndexClient,
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 3,
        fill: false,
        yAxisID: 'y',
      },
    ],
  };


  return (
    <div style={{ height: '50vh'}} className=' px-2 py-4'>
      <Bar data={data} options={options} />
      <div className='d-flex justify-content-end p-3'>
        <select className="form-select px-2" value={annee}  onChange={(e) => setAnnee(Number(e.target.value))} style={{ width: '90px', height: '35px', fontSize: '15px', border: '2px solid #0994f1' }} aria-label="Default select example">
        <option value="" disabled> année</option>
        {yearOptions.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
        </select>
      </div>

    </div>
  
  );

};

export default Chart;
