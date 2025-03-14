import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getToken, decodeToken, removeToken, setToken } from '../utils/auth';

interface User {
  email: string;
  role: string;
  [key: string]: any;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded = decodeToken(token) as User; 
        setUser(decoded);
      } catch (error) {
        console.error('Failed to decode token:', error);
        removeToken(); 
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string) => {
    try {
      const decoded = decodeToken(token) as User; 
      setToken(token); 
      setUser(decoded); 
      router.push('/'); 
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  };

  const logout = () => {
    removeToken(); 
    setUser(null); 
    router.push('/login'); 
  };

  return { user, loading, login, logout };
};