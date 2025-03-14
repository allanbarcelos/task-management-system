import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../Common/LoadingSpinner';

const Dashboard = () => {
  const [stats, setStats] = useState<{ tasks: number; users: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
    //   try {
    //     const response = await api.get('/dashboard/stats');
    //     setStats(response.data);
    //   } catch (err) {
    //     console.error('Failed to fetch dashboard stats', err);
    //   } finally {
    //     setLoading(false);
    //   }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mt-5">
      <h1>Dashboard</h1>
      <p>Welcome back, {user?.email}!</p>
    </div>
  );
};

export default Dashboard;