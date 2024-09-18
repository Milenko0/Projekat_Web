import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const redirection = useNavigate();

  useEffect(() => {
    // Obriši korisničke podatke (npr. token iz localStorage-a ili sessionStorage-a)
    localStorage.removeItem('token');
    
    // Nakon što obrišeš podatke, preusmeri korisnika na Login stranicu
    redirection('/');
  }, [redirection]);

  return null; // Ne prikazuje ništa
}

export default Logout;
