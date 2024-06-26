import React, { useEffect, useState, useContext } from 'react';
import './Login.css';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import video from '../../LoginAssets/video.mp4';
import logo from '../../LoginAssets/logo.svg';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import AuthContext from "../../context/AuthProvider";

const Login = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigateTo = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [loginStatus, setLoginStatus] = useState('');
  const [statusHolder, setStatusHolder] = useState('message');

  const loginUser = async (e) => {
    e.preventDefault();
    
    Axios.post('http://localhost:3002/login', {
      loginUsername: loginUsername,
      loginPassword: loginPassword,
    }).then((response) => {
      console.log(response);

      if (response.data.message || loginUsername === '' || loginPassword === '') {
        navigateTo('/login');
        setLoginStatus('Pogrešno korisničko ime ili šifra');
      } else {
        setAuth({ loginUsername,loginPassword  });
        navigateTo('/');
      }
    });
  };

  useEffect(() => {
    if (loginStatus !== '') {
      setStatusHolder('showMessage');
      setTimeout(() => {
        setStatusHolder('message');
      }, 4000);
    }
  }, [loginStatus]);

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className="title"> Prijava</h2>
            <p>
              Prijavite se na svoj račun Hvala što ste se odlučili za naš GYM web
              aplikaciju.
            </p>
          </div>

          <div className="footerDiv flex">
            <span className="text">Nemate Račun?</span>
            <Link to={'/register'}>
              <button className="btn"> Registrujte se</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Slika Logo-a" />
            <h3>Dobrodošli nazad</h3>
          </div>
          <form action="" className="form grid" onSubmit={loginUser}>
            <span className={statusHolder}>{loginStatus}</span>
            <div className="inputDiv">
              <label htmlFor="username">Korisničko ime</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Unesite Korisničko ime"
                  value={loginUsername}
                  onChange={(event) => setLoginUsername(event.target.value)}
                />
              </div>

              <label htmlFor="password">Šifra</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Unesite šifru"
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn flex">
              <span>Prijava</span>
              <AiOutlineSwapRight className="icon" />
            </button>
            <span className="forgotPassword">
              Zaboravili ste šifru? <a href="">Kliknite ovdje</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
