import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../contexts/useAuth';
import { Task } from '../interfaces/Task';

const ReviewerTasks: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      // ✅ Prevent fetching if user is null
      if (!user) return;

      try {
        const response = await axios.get(`/api/tasks/reviewer/${user.id}`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div>
      <h2>My Review Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewerTasks;
