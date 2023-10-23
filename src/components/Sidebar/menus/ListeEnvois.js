import React from "react";

const ListeEnvois = () => {
  return (
    <div className="container">
      <div className="col-md-12">
        <div className="panel panel-default">
          <div className="panel-heading">Employee</div>
          <div className="panel-body">
            <table className="table table-condensed table-striped">
              <thead>
                <tr>
                  <th></th>
                  <th>Numéro</th>
                  <th>Client</th>
                  <th className="d-none d-md-table-cell">Categorie</th>
                  <th className="d-none d-md-table-cell">Quantite</th>
                  <th className="d-none d-md-table-cell">Prix</th>
                  <th className="d-none d-md-table-cell">Etat</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  data-bs-toggle="collapse"
                  data-bs-target="#demo1"
                  className="accordion-toggle"
                >
                  <td>
                    <button className="btn btn-default btn-sm">Clique</button>
                  </td>
                  <td>Carlos</td>
                  <td>Mathias</td>
                  <td className="d-none d-md-table-cell">Leme</td>
                  <td className="d-none d-md-table-cell">SP</td>
                  <td className="d-none d-md-table-cell">New</td>
                </tr>
                <tr>
                  <td colSpan="6" className="hiddenRow">
                    <div className="accordion-body collapse" id="demo1">
                      <table className="table table-striped">
                     
                        <tbody>
                          <tr
                            data-bs-toggle="collapse"
                            className="accordion-toggle"
                            data-bs-target="#demo10"
                          >
                            <td>
                              Categorie
                            </td>
                            <td>Google</td>
                            <td>U$8.00000 </td>
                            {/* <td>2016/09/27</td>
                            <td>2017/09/27</td> */}
                            <td>
                              <a href="#" className="btn btn-default btn-sm">
                                <i className="glyphicon glyphicon-cog"></i>
                              </a>
                            </td>
                          </tr>
                         
                          <tr>
                            <td>Quantite</td>
                            <td>Google</td>
                            <td>U$8.00000 </td>
                            {/* <td>2016/09/27</td>
                            <td>2017/09/27</td> */}
                            <td>
                              {" "}
                              <a href="#" className="btn btn-default btn-sm">
                                <i className="glyphicon glyphicon-cog"></i>
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>Prix</td>
                            <td>Google</td>
                            <td>U$8.00000 </td>
                            <td>
                              {" "}
                              <a href="#" className="btn btn-default btn-sm">
                                <i className="glyphicon glyphicon-cog"></i>
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>Etat</td>
                            <td>Google</td>
                            <td>U$8.00000 </td>
                            <td>
                              {" "}
                              <a href="#" className="btn btn-default btn-sm">
                                <i className="glyphicon glyphicon-cog"></i>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
             
                   
                   
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeEnvois;
