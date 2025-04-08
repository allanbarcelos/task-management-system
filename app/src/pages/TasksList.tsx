import { useAuth } from '@hooks/useAuth';
import api from '@config/axiosConfig';
import { useEffect, useState } from 'react';
import { toastr } from '@utils/toastr';
import { TaskItem } from '@interfaces/TaskItem';

const TasksList = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    api.get('/tasks') //------------------->WAITING FOR THE GET TASKS ENDPOINT TO MAKE IT WORK<--------------------
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        toastr('error', `Erro ao carregar tasks: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Tasks</h2>

      {isLoading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{task.title}</h5>
                  {task.description && <p className="mb-1">{task.description}</p>}
                  <small className="text-muted">
                    Due: {new Date(task.dueDate).toLocaleDateString()} | Status: {task.status}
                  </small>
                  {/* <br />
                  {task.reviewer?.name && (
                    <small className="text-muted">Reviewer: {task.reviewer.name}</small>
                  )} */}
                </div>
                <span className={`badge ${task.status === 'Done' ? 'bg-success' : 'bg-warning'}`}>
                  {task.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksList;
