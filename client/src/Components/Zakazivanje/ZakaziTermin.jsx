import React, { useState, useEffect } from 'react';
import './../../assets/css/styles.css';
import './../../assets/js/scripts.js';
import './../../assets/js/bootstrap.bunde.min.js';
import { provjeraAdmin, provjeraLogin } from '../../context/AuthTools';

import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

import { FaEnvelope } from "react-icons/fa";


const ZakaziTermin = () => {
    const [ime, setIme] = useState('');
    const [email, setEmail] = useState('');
    const [telefon, setTelefon] = useState('');
    const [startDate, setStartDate] = useState('');
    const [minDate, setMinDate] = useState('');
    const [users, setUsers] = useState([]);
    const [trener, setTrener] = useState('');

    useEffect(() => {
        // Fetch users from the backend API
        Axios.get('http://localhost:3002/users')
            .then(response => {
                // Set the retrieved users into state
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setMinDate(today);
    }, []);

    const navigateTo = useNavigate();

    const ZakaziTermin = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3002/zakazi', {
            ime: ime,
            email: email,
            telefon: telefon,
            startDate: startDate,
            trener: trener
        }).then((response) => {
            console.log(response);
            navigateTo('/zakazi');
        }).catch((error) => {
            console.error("There was an error sending the contact form!", error);
        });
    };

    return (
        <div className="d-flex flex-column">
        <main className="flex-shrink-0">
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
                    <div className="container px-5">
                        <a className="navbar-brand" href="/">
                            <span className="fw-bolder text-primary">WMS</span>
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
                            <       li className="nav-item"><a className="nav-link" href="/">Početna</a></li>
                                    {provjeraAdmin()}
                                    <li className="nav-item"><a className="nav-link" href="/o-nama">O nama</a></li>
                                    <li className="nav-item"><a className="nav-link" href="/contact">Kontakt</a></li>
                                    {provjeraLogin()}
                            </ul>
                        </div>
                    </div>
                </nav>
            <section className="py-5">
                <div className="container px-5">
                    <div className="bg-light rounded-4 py-5 px-4 px-md-5">
                        <div className="text-center mb-5">
                            <div className="feature bg-secondary text-white rounded-3 mb-3"><FaEnvelope /></div>
                            <h1 className="fw-bolder">Zakaži termin</h1>
                        </div>
                        <div className="row gx-5 justify-content-center">
                            <div className="col-lg-8 col-xl-6">
                            <p className="lead fw-normal text-muted mb-0">Popunite formu ispod kako biste zakazali termin za trening. Naš tim će vam se javiti u najkraćem mogućem roku kako bi potvrdio dostupnost i dogovorio detalje.</p>
                        
                                <form id="contactForm" className='mt-5' onSubmit={ZakaziTermin}>
                                    
                                    <div className="form-floating mb-4">
                                        <input className="form-control" id="ime" type="text"  required value={ime}onChange={(event) => {setIme(event.target.value);}}/>
                                        <label htmlFor="name">Ime i prezime</label>
                                    </div>
                                    <div className="form-floating mb-4">
                                        <input className="form-control" id="email" type="email"  required value={email} onChange={(event) => {setEmail(event.target.value);}}/>
                                        <label htmlFor="email">Email adresa</label>
                                    </div>
                                    <div className="form-floating mb-4">
                                        <input className="form-control" id="telefon" type="tel" required value={telefon} onChange={(event) => {setTelefon(event.target.value);}}/>
                                        <label htmlFor="phone">Broj telefona</label>
                                    </div>
                                    <div className="form-floating mb-4">
                                            <input className="form-control" id="startDate" type="date" required min={minDate} value={startDate} onChange={(event) => { setStartDate(event.target.value); }} />
                                            <label htmlFor="startDate">Datum treninga</label>
                                        </div>
                                    <div className='form-floating mb-4'>
                                    <select className="form-control category-select" value={trener} onChange={(event) => { setTrener(event.target.value); }}>
                                    <option value="">Odaberite korisnika</option>
                                        {Array.isArray(users) && users.map(user => (
                                            <option key={user.id} value={user.id}>{user.ime}</option>
                                        ))}
                                        </select>
                                    </div>

                                    <div className="d-grid"><button className="btn btn-primary btn-lg" id="submitButton" type="submit">Zakaži</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                
            </section>
        </main>
        <footer className="bg-white py-4 mt-auto">
                <div className="container px-5">
                    <div className="row align-items-center justify-content-between flex-column flex-sm-row">
                        <div className="col-auto"><div className="small m-0">Copyright &copy; Web dizajn 2024</div></div>
                        <div className="col-auto">
                            <a className="small" href="#!">Privacy</a>
                            <span className="mx-1">&middot;</span>
                            <a className="small" href="#!">Terms</a>
                            <span className="mx-1">&middot;</span>
                            <a className="small" href="#!">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
};

export default ZakaziTermin;