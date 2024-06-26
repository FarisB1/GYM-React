import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './../../assets/css/styles.css';
import './../../assets/js/scripts.js';
import './../../assets/js/bootstrap.bunde.min.js';
import { provjeraAdmin, provjeraLogin } from '../../context/AuthTools';
import { useNavigate } from 'react-router-dom';

import ProfilePic from './../../assets/logogotov.svg';
const AdminPoruke = () => {
    const userRoles = JSON.parse(sessionStorage.getItem('uloga')) || [];

  if (!userRoles.includes('admin')) {
    return <div>Nemate pravo pristupa ovoj stranici</div>;
  }

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:3002/poruke')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenMessage = (id) => {
    navigate(`/poruke/${id}`);
    };

  const filteredData = data.filter((d) => {
    const nameMatch = d.ime ? d.ime.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    const emailMatch = d.email ? d.email.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    const telefonMatch = d.telefon ? d.telefon.includes(searchQuery) : false;
    const porukaMatch = d.poruka ? d.poruka.toLowerCase().includes(searchQuery.toLowerCase()) : false;

    return nameMatch || emailMatch || telefonMatch || porukaMatch;
  });

  return (
    <div className="d-flex flex-column">
      <main className="flex-shrink-0">
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
                    <div className="container px-5">
                                <a className="navbar-brand" href="/">
                                    <img src={ProfilePic} alt="Logo" style={{height:"100px"}}/>
                                </a>
                            <div className="col-10">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
                                    <li className="nav-item"><a className="nav-link" href="/">Početna</a></li>
                                    {provjeraAdmin()}
                                    
                                    <li className="nav-item"><a className="nav-link" href="/contact">Kontakt</a></li>
                                    {provjeraLogin()}
                            </ul>
                        </div>
                        </div>
                        </div>
                </nav>

        <section className="py-5 bg-light">
            <div className="container px-5 my-5">
                <div className="row gx-5 align-items-center">
                    <div className="col-2">

                    </div>
                    <div className="col-lg-8">
                    <h1 className="display-5 fw-bolder mb-0 text-center"><span className="text-gradient d-inline">Lista Poruka</span></h1>
                        
                    </div>
                    
                </div>
            </div>
        </section>
        <div className="container ">
          <div className="search-bar mt-5 mb-3">
            <input
              type="text"
              placeholder="Pretraga..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="form-control"
            />
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-uppercase mb-0">Kontrola korisnika</h5>
                </div>
                <div className="table-responsive">
                  <table className="table no-wrap user-table mb-0">
                    <thead>
                      <tr>
                        <th scope="col" className="border-0 text-uppercase font-medium pl-4">#</th>
                        <th scope="col" className="border-0 text-uppercase font-medium">Ime</th>
                        <th scope="col" className="border-0 text-uppercase font-medium">Email</th>
                        <th scope="col" className="border-0 text-uppercase font-medium">Telefon</th>
                        <th scope="col" className="border-0 text-uppercase font-medium">Poruka</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((d, i) => (
                        <tr key={i}>
                          <td className="pl-4">{i + 1}</td>
                          <td>
                            <h5 className="font-medium mb-0">{d.ime}</h5>
                          </td>
                          <td>
                            <span className="text-muted">{d.email}</span><br />
                          </td>
                          <td>
                            <span className="text-muted">{d.telefon}</span><br />
                          </td>
                          <td>
                            <span className="text-muted">{d.poruka} <span><button className='btn btn-secondary float-end' style={{color: 'white'}} onClick={() => handleOpenMessage(d.id)}>Otvori</button> </span></span>
                          </td>
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPoruke;