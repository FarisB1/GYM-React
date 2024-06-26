import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { provjeraAdmin, provjeraLogin } from '../../context/AuthTools';
import './../../assets/css/styles.css';
import './../../assets/js/scripts.js';
import './../../assets/js/bootstrap.bunde.min.js';
import ProfilePic from './../../assets/logogotov.svg';

const Poruka = () => {
    const { id } = useParams();
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3002/poruke/${id}`)
            .then(res => res.json())
            .then(data => setMessage(data))
            .catch(err => console.log(err));
    }, [id]);

    if (!message) {
        return <div>Loading...</div>;
    }

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


        <section className="py-5">
      <div className="container px-5 my-5">
        <div className="row gx-5 justify-content-center">
          <div className="col-lg-10 col-xl-7">
            <div className="my-5 text-center">
              <h1 className="fw-bolder text-gradient">Prikaz poruke</h1>
            </div>
          </div>
        </div>
        <div className="row gx-5 justify-content-center">
          <div className="col-xl-10">
            <div className="card border-0 shadow">
              <div className="card-body p-4 p-lg-5 bg-light">
                
                <div className="mb-4 text-left">
                  <h2 className="fs-2 fw-bold text-primary mb-1">{message.ime}</h2>
                  <p className="text-muted">E-mail: {message.email}</p> <p className="text-muted">Br. telefona: {message.telefon}</p>
                </div>
                <hr className="my-4" />
                <div>
                  <p className="text-muted">{message.poruka}</p>
                </div>
                <div>
                    <a className="btn btn-primary" href={`mailto:${message.email}`}>Odgovorite</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </main>
    </div>
    );
};

export default Poruka;
