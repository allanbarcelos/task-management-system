  import { useAuth } from '@hooks/useAuth';
  import api from '@config/axiosConfig';
  import { useEffect, useState } from 'react';
  import { toastr } from '@utils/toastr';
  import DateFilter from '../components/DateFilter';
  import { Task } from '../interfaces/Task';
  
  const Dashboard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
   // Example to use Axios config  (check the axiosConfig.ts for more informations)
    const handleDateFilterChange = (startDate: string, endDate: string) => {
      api.get(`/tasks?startDate=${startDate}&endDate=${endDate}`)
        .then(response => {
          setTasks(response.data);
        })
        .catch(error => {
          toastr('error', `Erro: ${error.message}`);
        });
    };
  
    useEffect(() => {
      api.get('/tasks')
        .then(response => {
          setTasks(response.data);
        })
        .catch(error => {
          toastr('error', `Erro: ${error.message}`);
        });
    }, []);
  
    return (
      <div>
        <p>Welcome, {user?.sub ?? 'No Name'}</p>
        <DateFilter onFilterChange={handleDateFilterChange} />
        {tasks.map(task => (
          <div key={task.id}>
            {task.title} - Due: {task.dueDate}
          </div>
        ))}
      </div>
    );
  };
  
  export default Dashboard;
  