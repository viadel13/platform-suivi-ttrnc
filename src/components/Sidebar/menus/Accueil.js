import { useState } from "react";
import Breadcrumb from "../../Breadcrumb/Index";
import { IoMdPeople } from 'react-icons/io';
import { FaFileSignature } from "react-icons/fa";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { GoContainer } from "react-icons/go";
import { FaUsers } from 'react-icons/fa';
import Chart from "../../Line/Index";


const Accueil = () => {
  const breadcrumbLinks = [];
  const percentage = 66;
  return (
    <div className="container-fluid accueil">
      <div>
        <h2 className="fs-4" style={{ fontWeight: "600" }}>
          Tableau de bord
        </h2>
        <Breadcrumb links={breadcrumbLinks} />
      </div>
      <div className="dashboard">
        <div className="row gy-3 mb-4">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-dashboard">
              <div className="card-body">
                <div className="card-content d-flex justify-content-between">
                  <div className="icon icon-warning d-flex align-items-center">
                    <span><IoMdPeople size={50} color="#3498db " /></span>
                  </div>
                  <div>
                    <p><strong style={{ color: '#808080' }}>Clients</strong></p>
                    <h3 className="card-title"><strong>70</strong></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-dashboard-2">
              <div className="card-body">
                <div className="card-content d-flex justify-content-between">
                  <div className="icon icon-warning d-flex align-items-center ">
                    <span><FaFileSignature size={50} color="#db345e " /></span>
                  </div>
                  <div>
                    <p><strong style={{ color: '#808080' }}>Clients factures</strong></p>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center " style={{ position: 'relative', top: '5px' }}>
                        <h3>
                          <strong>20 <span style={{ color: '#808080', fontSize: '20px' }}>%</span></strong>
                        </h3>
                      </div>

                      <div style={{ width: 40 }}>
                        <CircularProgressbar styles={buildStyles({ pathColor: `rgba(255, 0, 0, ${percentage / 100})`, textColor: '#000', trailColor: '#d6d6d6', backgroundColor: '#db345e', textSize: '26px', })} value={percentage} text={`${percentage}`} />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-dashboard-3">
              <div className="card-body">
                <div className="card-content d-flex justify-content-between">
                  <div className="icon icon-warning d-flex align-items-center">
                    <span><GoContainer size={50} style={{ color: `rgb(241, 206, 10)` }} /></span>
                  </div>
                  <div>
                    <p><strong style={{ color: '#808080' }}>Conteneurs</strong></p>
                    <h3 className="card-title"><strong>50</strong></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="card card-dashboard-4">
              <div className="card-body">
                <div className="card-content d-flex justify-content-between">
                  <div className="icon icon-warning d-flex align-items-center">
                    <span><FaUsers size={50} style={{ color: `rgb(69, 209, 27)` }} /></span>
                  </div>
                  <div>
                    <p><strong style={{ color: '#808080' }}>Fournisseurs</strong></p>
                    <h3 className="card-title"><strong>40</strong></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6">
           <div className="card-chart">
              <Chart />
           </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accueil;
