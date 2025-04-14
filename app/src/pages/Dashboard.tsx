import { useAuth } from '@hooks/useAuth';
import api from '@config/axiosConfig';
import { useEffect, useState } from 'react';
import { toastr } from '@utils/toastr';

const Dashboard = () => {
  const { user } = useAuth();

  // Example to use Axios config  (check the axiosConfig.ts for more informations)
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        toastr('error', `Erro: ${error.message}`);
      });
  }, []);

  return (
    <div>
      <p>Welcome, {user?.sub ?? 'No Name'}</p>
    </div>
  );
};

import { useEffect, useState, useContext } from 'react';
import TaskItem from '../components/TaskItem';
import { getTasks } from '../services/TaskService';
import AuthContext from '../contexts/AuthContext';

const TaskList = () => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await getTasks(token);
      setTasks(res);
    } catch (err) {
      console.error('Erro ao carregar tarefas:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onTaskUpdated={fetchTasks} // callback após cancelamento
        />
      ))}
    </div>
  );
};

export default Dashboard;