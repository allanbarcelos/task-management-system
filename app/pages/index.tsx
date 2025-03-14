import Dashboard from '../components/Dashboard/Dashboard';
import RoleBasedRoute from '@/components/Common/RoleBasedRoute';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
  }, []);
  return (
    <RoleBasedRoute allowedRoles={['User']}>
      <Dashboard />
    </RoleBasedRoute>
    );
};

export default Home;