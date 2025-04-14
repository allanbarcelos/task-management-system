import { useAuth } from '@hooks/useAuth';
import api from '@config/axiosConfig';
import { useEffect, useState } from 'react';
import { toastr } from '@utils/toastr';
import MainLayout from '@components/MainLayout';

const Dashboard = () => {
  const { user } = useAuth();

  const [data, setData] = useState(null);

  // ✅ Move it here
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  useEffect(() => {
    api.get('/')
      .then((response) => {
        setData(response.data);
        setFeedback({ type: 'success', message: 'Data loaded successfully!' });
        setTimeout(() => setFeedback(null), 3000);
      })
      .catch((error) => {
        toastr('error', `Error: ${error.message}`);
        setFeedback({ type: 'error', message: 'Failed to load data.' });
        setTimeout(() => setFeedback(null), 3000);
      });
  }, []);

  return (
    <MainLayout pageTitle="Dashboard" feedback={feedback}>
      <p>Welcome, {user?.sub ?? 'No Name'}</p>
      <p>Dashboard content goes here.</p>
    </MainLayout>
  );
};

export default Dashboard;
