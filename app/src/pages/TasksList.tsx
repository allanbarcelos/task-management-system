// src/pages/TasksList.tsx
import { useAuth } from '@hooks/useAuth';
import api from '@config/axiosConfig';
import { useEffect, useState } from 'react';
import { toastr } from '@utils/toastr';
import { TaskItem } from '@interfaces/TaskItem';
import TaskListItem from '@components/TaskListItem';
import Pagination from '@components/Pagination'; // assuming you followed previous pagination component example

const TasksList = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    if (!user) return;

    setIsLoading(true);
    api
      .get('/tasks', {
        params: {
          pageNumber: currentPage,
          pageSize: pageSize,
        },
      })
      .then((response) => {
        setTasks(response.data.items);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        toastr('error', `Error fetching tasks: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user, currentPage]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Tasks</h2>

      {isLoading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <>
          <ul className="list-group">
            {tasks.map((task) => (
              <TaskListItem key={task.id} task={task} />
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default TasksList;
