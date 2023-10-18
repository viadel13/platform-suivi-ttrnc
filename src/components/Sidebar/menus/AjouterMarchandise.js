import React from "react";

const AjouterMarchandise = () => {
  return (
    <div className="container mt-5">
      <div style={{ backgroundColor: "white" }}>
        <h2>Ajouter marchadise</h2>
      </div>
      <form className="mt-5 py-4">
        <div className="mb-3">
          <label htmlFor="nomMarchandise" className="form-label">
            Nom de la marchandise
          </label>
          <input
            type="text"
            className="form-control"
            id="nomMarchandise"
            name="nomMarchandise"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="quantite" className="form-label">
            Quantité
          </label>
          <input
            type="number"
            className="form-control"
            id="quantite"
            name="quantite"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categorie" className="form-label">
            Catégorie
          </label>
          <select
            className="form-select"
            id="categorie"
            name="categorie"
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="aliments">Aliments</option>
            <option value="electronique">Électronique</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="prix" className="form-label">
            Prix
          </label>
          <input
            type="number"
            className="form-control"
            id="prix"
            name="prix"
            step="0.01"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Ajouter la marchandise
        </button>
      </form>
    </div>
  );
};

export default AjouterMarchandise;
