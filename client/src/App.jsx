import React, { useEffect, useState, useContext } from 'react';
import './App.css'
import './boot.scss'
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Dashboard from './Components/Dashboard/Dashboard'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Contact from './Components/Contact/Contact'
import AuthContext from "./context/AuthProvider";
import Admin from './Components/Admin/Admin'
import Logout from './Components/Login/Logout'
import AdminPoruke from './Components/AdminPoruke/AdminPoruke'
import Poruka from './Components/Poruka/Poruka';
import ZakaziTermin from './Components/Zakazivanje/ZakaziTermin';
import Treninzi from './Components/Treninzi/Treninzi';
import Provjera from './Components/Provjera/Provjera';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

const USER_TYPES = {
  PUBLIC: 'guest',
  ADMIN: 'admin',
  TRENER: 'trener'
}

let CURRENT_USER = sessionStorage.getItem('uloga') ? JSON.parse(sessionStorage.getItem('uloga')) : USER_TYPES.PUBLIC;

const router = createBrowserRouter([
  {
    path: '/login',
    element: <div><PublicElement> <Login/> </PublicElement> </div>
  },
  {
    path: '/register',
    element: <div><PublicElement> <Register/> </PublicElement> </div>
  },
  {
    path: '/',
    element: <div><PublicElement> <Dashboard/> </PublicElement></div>
  },
  {
    path: '/contact',
    element: <div><PublicElement> <Contact/> </PublicElement> </div>
  },
  {
    path: '/zakazi',
    element: <div><PublicElement> <ZakaziTermin/> </PublicElement> </div>
  },
  {
    path: '/treninzi',
    element: <div><TrenerElement> <Treninzi/> </TrenerElement> </div>
  },
  { 
    path: '/admin',
    element: <div><AdminElement> <Admin/> </AdminElement> </div>
  },
  { 
    path: '/logout',
    element: <div><PublicElement> <Logout/> </PublicElement> </div>
  },
  {
    path: '/admin-poruke',
    element: <div><AdminElement> <AdminPoruke/> </AdminElement> </div>
  },
  {
    path: '/poruke/:id',
    element: <div><AdminElement> <Poruka/> </AdminElement> </div>
  },
  {
    path: '/provjera',
    element: <div><PublicElement> <Provjera/> </PublicElement> </div>
  }
]);

function App() {
  const { auth } = useContext(AuthContext);
  const [uloga, setUloga] = useState('');
  const [currentUser, setCurrentUser] = useState(USER_TYPES.PUBLIC);
  const [currentID, setCurrentID] = useState('');
  
  useEffect(() => {
    if (auth.loginUsername) {
      Axios.post('http://localhost:3002/uloga', {
        loginUsername: auth.loginUsername,
      }).then((response) => {
        console.log(response);
        let fetchedUloga = response.data;
        setUloga(fetchedUloga);
        console.log('Uloga:', fetchedUloga);
        if (fetchedUloga === 'admin') {
          setCurrentUser(USER_TYPES.ADMIN);
          
          sessionStorage.setItem('uloga', JSON.stringify(USER_TYPES.ADMIN));
        } else if (fetchedUloga === 'trener') {
          sessionStorage.setItem('uloga', JSON.stringify(USER_TYPES.TRENER));
          setCurrentUser(USER_TYPES.TRENER);
        } else {
          sessionStorage.setItem('uloga', JSON.stringify(USER_TYPES.PUBLIC));
          setCurrentUser(USER_TYPES.PUBLIC);
        }
      }).catch(error => {
        console.error('Error fetching uloga:', error);
      });
    }
  }, [auth.loginUsername]);

  useEffect(() => {
    if (auth.loginUsername) {
      Axios.post('http://localhost:3002/id', {
        loginUsername: auth.loginUsername,
      }).then((response) => {
        console.log(response);
        let id = response.data.id;
        setCurrentID(id);
        console.log('id:', id);
        sessionStorage.setItem('id', JSON.stringify(id));
      }).catch(error => {
        console.error('Error fetching uloga:', error);
      });
    }
  }, [auth.loginUsername]);
  useEffect(() => {
    console.log('CURRENT_USER', currentUser);
    console.log('CURRENT_ID', currentID);
  }, [currentUser, currentID]);
  
  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  )
}

function PublicElement({children}) {
  if (CURRENT_USER == USER_TYPES.PUBLIC || CURRENT_USER == USER_TYPES.ADMIN || CURRENT_USER == USER_TYPES.TRENER) {
    return children
  }
  return null
}

function AdminElement({children}) {
  if (CURRENT_USER == USER_TYPES.ADMIN) {
    return children
  }
  else {
    return <div>Nemate pravo pristupa ovoj stranici</div>
  }
}

function TrenerElement({ children }) {
  if (CURRENT_USER == USER_TYPES.TRENER) {
    return children;
  } else {
    return <div>Nemate pravo pristupa ovoj stranici</div>;
  }
}

export default App;