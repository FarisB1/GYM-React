export const provjeraAdmin = () => {
    const userRoles = JSON.parse(sessionStorage.getItem('uloga')) || [];
    
    if (userRoles.includes('admin')) {
      return (
        <>
          <li className="nav-item">
            <a className="nav-link" href="/admin">Admin</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/admin-poruke">Poruke</a>
          </li>
        </>
      );
    }
    return null;
  };
  
  export const isLoggedIn = () => {
    const uloga = sessionStorage.getItem('uloga');
    return uloga !== null;
  };
  
  export const provjeraLogin = () => {
    const userRoles = JSON.parse(sessionStorage.getItem('uloga')) || [];
    if (!isLoggedIn()) {
      return (
        <li className="nav-item">
          <a className="nav-link" href="/login">Prijava</a>
        </li>
        
      );
    } else {
      if (!userRoles.includes('admin') && !userRoles.includes('trener')) {
      return (
        <>
        <li className="nav-item"><a className="nav-link" href="/provjera">Provjeri Treninge</a></li>
        <li className="nav-item"><a className="nav-link" href="/zakazi">Zakaži Termin</a></li>
        <li className="nav-item">
          <a className="nav-link" href="/logout">Odjava</a>
        </li>
        </>
      );
    } else if (userRoles.includes('trener'))
    {
      return (
        <>
        <li className="nav-item">
          <a className="nav-link" href="/treninzi">Treninzi</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/logout">Odjava</a>
        </li>
        </>
        );
    }
    else{
      return (
        <>
        <li className="nav-item">
          <a className="nav-link" href="/logout">Odjava</a>
        </li>
        </>
      );
    }
  }
  };
  