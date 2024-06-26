import React, { useState } from 'react';
import './../../assets/css/styles.css';
import './../../assets/js/scripts.js';
import './../../assets/js/bootstrap.bunde.min.js';
import { provjeraAdmin, provjeraLogin } from '../../context/AuthTools';

import ProfilePic from './../../assets/logogotov.svg';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

import { FaEnvelope } from "react-icons/fa";


const Contact = () => {
    const [ime, setIme] = useState('');
    const [email, setEmail] = useState('');
    const [telefon, setTelefon] = useState('');
    const [poruka, setPoruka] = useState('');

    const navigateTo = useNavigate();

    const kontaktForma = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:3002/kontakt', {
            ime: ime,
            email: email,
            telefon: telefon,
            poruka: poruka,
    }).then((response) => {
        console.log(response);
        navigateTo('/contact');
    }).catch((error) => {
        console.error("There was an error sending the contact form!", error);
    });;
    
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
                <div className="container px-5">
                    <div className="bg-light rounded-4 py-5 px-4 px-md-5">
                        <div className="text-center mb-5">
                            <div className="feature bg-secondary text-white rounded-3 mb-3"><FaEnvelope /></div>
                            <h1 className="fw-bolder">Kontaktirajte nas</h1>
                        </div>
                        <div className="row gx-5 justify-content-center">
                            <div className="col-lg-8 col-xl-6">
                            <p className="lead fw-normal text-muted mb-0">Rado ćemo odgovoriti na sva vaša pitanja i pomoći vam sa bilo kojim problemom sa našom teretanom. Molimo vas da popunite kontakt formu ispod, a naš tim će vam se javiti u najkraćem mogućem roku.</p>
                        
                                <form id="contactForm" className='mt-5' onSubmit={kontaktForma}>
                                    
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
                                        <textarea className="form-control" id="poruka" type="text" required value={poruka} onChange={(event) => {setPoruka(event.target.value);}}></textarea>
                                        <label htmlFor="message">Message</label>
                                    </div>

                                    <div className="d-grid"><button className="btn btn-primary btn-lg" id="submitButton" type="submit">Pošalji</button></div>
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

export default Contact;