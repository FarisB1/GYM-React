import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigateTo = useNavigate();

  useEffect(() => {
        sessionStorage.removeItem('uloga');
        navigateTo('/');
    }, [navigateTo]);

    return null;
};

export default Logout;