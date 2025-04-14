import { useAuth } from '@hooks/useAuth';
import api from '@config/axiosConfig';
import { useEffect, useState } from 'react';
import { toastr } from '@utils/toastr';
import { Task } from '@interfaces/Task';

const TasksList = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  useEffect(() => {
    if (!user) return;

    api.get('/tasks')
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

  const filteredTasks = statusFilter === 'All'
    ? tasks
    : tasks.filter((task) => task.status === statusFilter);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Tasks</h2>

      {/* Status Filter Dropdown */}
      <div className="mb-3">
        <label htmlFor="statusFilter" className="form-label">Filter by Status</label>
        <select
          id="statusFilter"
          className="form-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {isLoading ? (
        <p>Loading tasks...</p>
      ) : filteredTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="list-group">
          {filteredTasks.map((task) => (
            <li key={task.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{task.title}</h5>
                  {task.description && <p className="mb-1">{task.description}</p>}
                  <small className="text-muted">
                    Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'} | Status: {task.status}
                  </small>
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
