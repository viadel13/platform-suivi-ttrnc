import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartJS, { CategoryScale, LinearScale, PointElement, BarElement, LineElement } from 'chart.js/auto';
import { collection, addDoc, onSnapshot, query } from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement);

const DoughnutChar = () => {
  const [donneesEnvoi, setDonneesEnvoi] = useState([]);
  const [loading, setLoading] = useState(true);

  const q = query(collection(db, "Clients"));
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

  console.log(donneesEnvoi)

let countEntrepriseNonVide = 0;
let countEntrepriseVide = 0;

const filterClient = donneesEnvoi.filter((i) => {
  if (i.entreprise !== '') {
    console.log('Entreprise non vide:', i);
    countEntrepriseNonVide++;
    return true; // Garder cet élément dans le filtre
  } else {
    console.log('Entreprise vide:', i);
    countEntrepriseVide++;
    return false; // Exclure cet élément du filtre
  }
});

console.log('Nombre d\'éléments avec entreprise non vide:', countEntrepriseNonVide);
console.log('Nombre d\'éléments avec entreprise vide:', countEntrepriseVide);

  


  const data = {
    labels: [
      'Clients entreprise',
      'Clients individuel',
    ],
    datasets: [{
      label: 'Nombre client',
      data: [`${countEntrepriseNonVide}`, `${countEntrepriseVide}`],
      backgroundColor: [
        '#28A745',
        '#007BFF',
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
