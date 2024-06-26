import React, {useState, useEffect} from 'react';
import './Register.css';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

import video from '../../LoginAssets/video.mp4'
import logo from '../../LoginAssets/logo.svg'

import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";
import { CiUser } from "react-icons/ci";


const Register = () => {
    
    const navigateTo = useNavigate();
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ime, setIme] = useState('')
    const [registerStatus, setRegisterStatus] = useState('')
    const [statusHolder, setStatusHolder] = useState('message');

    const createUser = (e)=> {
        e.preventDefault();

        Axios.post('http://localhost:3002/register', {
            email: email,
            username: username,
            password: password,
            ime: ime
        }).then((response) => {
            console.log(response);
    
            if (response.data === 'Username or email already exists') {
                setRegisterStatus('Korisničko ime ili email već postoji');
            } else {
                setRegisterStatus('Registracija uspješna');
                navigateTo('/login');
                setEmail('');
                setUsername('');
            }
        }).catch(error => {
            console.error('Registration error:', error);
            if (error.response && error.response.data === 'Username or email already exists') {
                setRegisterStatus('Korisničko ime ili email već postoji');
            } else {
                setRegisterStatus('Došlo je do greške prilikom registracije');
            }
        });
    }
    useEffect(() => {
        if (registerStatus !== '') {
          setStatusHolder('showMessage');
          setTimeout(() => {
            setStatusHolder('message');
          }, 4000);
        }
      }, [registerStatus]);


    return (
        <div className="registerPage flex">
            <div className="container flex">

                <div className="videoDiv">
                    <video src={video} autoPlay muted loop></video>
                

                <div className="textDiv">
                    <h2 className="title"> Registracija</h2>
                    <p>Registrujte svoj novi račun i pristupite našoj WMS Software web aplikaciji.</p>
                </div>

                <div className="footerDiv flex">
                    <span className="text">Već imate račun?</span>
                    <Link to={"/login"}><button  className="btn"> Prijavite se</button></Link>

                </div>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                    <img src={logo} alt="Slika Logo-a" />
                    <h3>Dobrodošli!</h3>
                    </div>
                    <form action="" className="form grid">
                        <span className={statusHolder}>{registerStatus}</span>

                        <div className="inputDiv">
                        <label htmlFor="ime">Ime i prezime</label>
                            <div className="input flex">
                                <CiUser className="icon"/>
                                <input type="text" id='ime' placeholder="Unesite ime" required onChange={(event)=>{
                                    setIme(event.target.value)
                                }} />

                            </div>

                        <label htmlFor="email">Email</label>
                            <div className="input flex">
                                <MdMarkEmailRead className="icon"/>
                                <input type="email" id='email' placeholder="Unesite email" required onChange={(event)=>{
                                    setEmail(event.target.value)
                                }} />

                            </div>

                            <label htmlFor="username">Korisničko ime</label>
                            <div className="input flex">
                                <FaUserShield className="icon"/>
                                <input type="text" id='username' placeholder="Unesite Korisničko ime" required onChange={(event)=>{
                                    setUsername(event.target.value)
                                }} />

                            </div>
                            
                            <label htmlFor="password">Šifra</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className="icon"/>
                                <input type="password" id='password' placeholder="Unesite šifru" required onChange={(event)=>{
                                    setPassword(event.target.value)
                                }} />
                            </div>
                        </div>

                        <button type="submit" className="btn flex" onClick={createUser}>
                            <span>Registracija</span>
                            <AiOutlineSwapRight className="icon"/>
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register