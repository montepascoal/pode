import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Logout() {

  const history = useHistory();

  useEffect(() => {
    history.push('/login');
  }, [history]);

  return null;
}