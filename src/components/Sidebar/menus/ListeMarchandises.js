import React from 'react'

const ListeMarchandises = () => {
  return (
    <div className="container mt-5">
    <h2>Liste des marchandises</h2>
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Numéro de suivi</th>
            <th>Nom du produit</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th>État</th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <td>ABC123</td>
            <td>iPhone X</td>
            <td>Électronique</td>
            <td>$999.99</td>
            <td>En attente de vente</td>
          </tr>
          <tr>
            <td>ABC123</td>
            <td>Samsung Galaxy S20</td>
            <td>Électronique</td>
            <td>$799.99</td>
            <td>En attente de vente</td>
          </tr>
   
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default ListeMarchandises;
