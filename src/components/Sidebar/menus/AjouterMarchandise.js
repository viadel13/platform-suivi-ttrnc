import React from 'react'

const AjouterMarchandise = () => {
  return (
    <div class="container mt-5">
    <h2>Ajouter une marchandise</h2>
    <form>
      <div class="mb-3">
        <label for="nomMarchandise" class="form-label">Nom de la marchandise</label>
        <input type="text" class="form-control" id="nomMarchandise" name="nomMarchandise" required />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" id="description" name="description" rows="3" required></textarea>
      </div>
      <div class="mb-3">
        <label for="quantite" class="form-label">Quantité</label>
        <input type="number" class="form-control" id="quantite" name="quantite" required />
      </div>
      <div class="mb-3">
        <label for="categorie" class="form-label">Catégorie</label>
        <select class="form-select" id="categorie" name="categorie" required>
          <option value="">Sélectionner une catégorie</option>
          <option value="aliments">Aliments</option>
          <option value="electronique">Électronique</option>

        </select>
      </div>
      <div class="mb-3">
        <label for="prix" class="form-label">Prix</label>
        <input type="number" class="form-control" id="prix" name="prix" step="0.01" required />
      </div>
      <button type="submit" class="btn btn-primary">Ajouter la marchandise</button>
    </form>
  </div>
  )
}

export default AjouterMarchandise;