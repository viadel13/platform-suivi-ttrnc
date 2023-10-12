import { useSelector } from "react-redux/es/hooks/useSelector";

const ListeEnvois = () => {

  // const datasEnvoi = useSelector((state)=> state.platformeSuivi.datasEnvoi);
  const datasEnvoi = JSON.parse(localStorage.getItem('datasEnvoi'));
  
  const tableDatas = datasEnvoi && datasEnvoi.map((i, index)=>{
    return(
      <tr key={index}>
        <td>{i.numeroSuivi}</td>
        <td>{i.nomProduit}</td>
        <td>{i.quantite}</td>
        <td>{i.categorie}</td>
        <td>En livraison</td>
      </tr>
    )
  })

return (
<div className="container mt-5">
<div style={{backgroundColor: 'white'}}>
    <h2>Liste des envois</h2>
    </div>
    <div className='table-responsive'>
    <table className="table table-bordered">
      <thead className='table-primary'>
        <tr>
          <th>Numéro de suivi</th>
          <th>Nom du produit</th>
          <th>Quantité</th>
          <th>Catégorie</th>
          <th>État</th>
        </tr>
      </thead>
      <tbody>
        {tableDatas}
      </tbody>
    </table>
    {
      !datasEnvoi && <p className="text-center">Aucune donnee</p>
    }

    </div>
  </div>
  )
}

export default ListeEnvois;
