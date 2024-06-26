import React from 'react';
import './../../assets/css/styles.css';
import ProfilePic from './../../assets/logogotov.svg';
import './../../assets/js/scripts.js';
import './../../assets/js/bootstrap.bunde.min.js';
import H1 from './../../assets/h1.png';
import individualni from './../../assets/individualnitrening.png';
import grupni from './../../assets/grupni.png';

import { MdOutlineSecurity, MdOutlineSupportAgent } from "react-icons/md";
import { FaBalanceScale } from "react-icons/fa";
import { GrShieldSecurity } from "react-icons/gr";
import { provjeraAdmin, provjeraLogin } from '../../context/AuthTools.jsx';


const Dashboard = () => {
    return (
        <div className="d-flex flex-column h-100">
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
                <header className="py-5">
                    <div className="container px-5 pb-5">
                        <div className="row gx-5 align-items-center">
                        <div id="myCarousel" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner" style={{borderRadius: "40px"}}>
                            <div className="carousel-item active" style={{height:"50vh"}}>
                                <img src={H1} alt="" />
                                <div className="container">
                                <div className="carousel-caption text-left">
                                    <h1 style={{fontSize: "80px", textShadow:"-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"}}>NAŠ CILJ</h1>
                                    <p style={{fontSize: "20px",textShadow:"-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"}}>Cilj RANAS Gym-a temelji se na uvezanosti dva najčešće pomenuta pravca u procesu treniranja a to su „KONDICIJSKA PRIPREMA“ profesionalnih sportaša, te „REKREACIJA“ kada su u pitanju fitness korisnici odnosno rekreativni vježbači koji to čine u svrhu zdravog načina življenja.</p>
                                    <p><a className="btn btn-lg btn-secondary" href="#" role="button">Prijavite se</a></p>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </header>


                <section className="py-5 bg-white">
                        <div className="container px-5 mb-5">
                            <div className="text-center mb-5">
                                <h1 className="display-5 fw-bolder mb-0"><span className="d-inline">Treninzi</span></h1>
                            </div>
                            <div className="row gx-5 justify-content-center">
                                <div className="col-lg-12">
                                    <div className="card overflow-hidden shadow rounded-4 border-0 mb-5">
                                        <div className="card-body p-0">
                                            <div className="d-flex align-items-center">
                                                <div className="p-5">
                                                    <h2 className="fw-bolder">Individualni treninzi</h2>
                                                    <p>Individualni trening pruža personalizovan pristup vježbanju, fokusiran na pojedinca. Zakažite vaš termin.</p>
                                                    <button className='btn btn-secondary'>Zakaži</button>
                                                </div>
                                                <img className="img-fluid" src={individualni} alt="..." />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card overflow-hidden shadow rounded-4 border-0">
                                        <div className="card-body p-0">
                                            <div className="d-flex align-items-center">
                                                <div className="p-5">
                                                    <h2 className="fw-bolder">Grupni trening</h2>
                                                    <p>Grupni trening omogućava dinamično okruženje za vježbanje, podstičući motivaciju i zajedništvo među polaznicima.</p>
                                                    <button className='btn btn-secondary'>Zakaži</button>
                                                </div>
                                                <img className="img-fluid" src={grupni} alt="..." />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                
                <section className='bg-light py-5'>
                    <div className="container">
                                    <h2 className="display-5 fw-bolder text-center mb-5"><span className=" d-inline ">Koje pakete nudimo?</span></h2>
                        <div className="card-deck mb-3 text-center">
                            
                            <div className="card mb-4 box-shadow">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal d-inline">Basic</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">KM 30 <small className="text-muted">/ mj</small></h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                <li className='mt-2'>Real-Time Praćenje Zaliha</li>
                                <li className='mt-2'>Automatizacija</li>
                                <li className='mt-2'>Osnovni Izvještaji</li>
                                <li className='mt-2'>Korisnička Podrška</li>
                                <li className='mt-2'>Integracija</li>
                                </ul>
                                <a href="/contact" style={{textDecoration:'none'}}><button type="button" className="btn btn-secondary d-inline tekst">Kontaktirajte nas</button></a>
                            </div>
                            </div>
                            <div className="card mb-4 box-shadow">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal d-inline">Professional</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">KM 40 <small className="text-muted">/ mj</small></h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                <li className='mt-2'><b>Sve iz Basic paketa, plus:</b></li>
                                <li className='mt-2'>Napredna Automatizacija</li>
                                <li className='mt-2'>Optimizacija Rasporeda Skladišta</li>
                                <li className='mt-2'>Detaljni Izvještaji</li>
                                <li className='mt-2'>Napredna Integracija</li>
                                </ul>
                                <a href="/contact" style={{textDecoration:'none'}}><button type="button" className="btn btn-secondary d-inline tekst">Kontaktirajte nas</button></a>
                            </div>
                            </div>
                            <div className="card mb-4 box-shadow">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal d-inline">Enterprise</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">KM 50 <small className="text-muted">/ mj</small></h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                <li className='mt-2'><b>Sve iz Professional paketa, plus:</b></li>
                                <li className='mt-2'>Personalizovani Dashboard</li>
                                <li className='mt-2'>Upravljanje Više Lokacija</li>
                                <li className='mt-2'>AI analitika</li>
                                <li className='mt-2'>Custom Integracije</li>
                                </ul>
                                <a href="/contact" style={{textDecoration:'none'}}><button type="button" className="btn btn-secondary d-inline tekst">Kontaktirajte nas</button></a>
                            </div>
                        </div>
                    </div>

                    </div>
                </section>

                
            </main>
            
            <footer className="bg-white py-4 mt-auto">
                <div className="container px-5">
                    <div className="row align-items-center justify-content-between flex-column flex-sm-row">
                        <div className="col-auto"><div className="small m-0">Copyright &copy; ADS 2024</div></div>
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
    );
}

export default Dashboard;