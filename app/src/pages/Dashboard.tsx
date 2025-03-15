import { useAuth } from '@hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <p>Welcome, {user?.sub ?? 'No Name'}</p>
    </div>
  );
};

export default Dashboard;