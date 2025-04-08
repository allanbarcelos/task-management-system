// TaskHistory.tsx
import React, { useEffect, useState } from "react";
import { TaskHistory } from "./../interfaces/TaskHistory"; // Import the interface

interface TaskHistoryProps {
  taskId: number;
}

const TaskHistoryComponent: React.FC<TaskHistoryProps> = ({ taskId }) => {
  const [history, setHistory] = useState<TaskHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTaskHistory = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${taskId}/history`);
        const data = await response.json();
        console.log(data)

        if (response.ok) {
          if (data.length > 0) {
            setHistory(data);
          } else {
            setError("No changes of status");
          }
        } else {
          setError("Failed to load task history.");
        }
      } catch (error) {
        console.log(error)
        setError("An error occurred while fetching the task history.");
      } finally {
        setLoading(false);
      }
    };

    fetchTaskHistory();
  }, [taskId]);

  if (loading) {
    return <div className="text-center mt-3">Loading task history...</div>;
  }

  return (
    <div className="mt-4">
      <h3 className="mb-4">Task Status History</h3>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <ul className="list-group">
          {history.map((entry) => (
            <li key={entry.id} className="list-group-item mb-3">
              <div className="d-flex justify-content-between">
                <h5 className="mb-2">
                  <strong>Changed At:</strong>{" "}
                  {new Date(entry.changedAt).toLocaleString()}
                </h5>
                <span className="badge bg-info">{entry.changedByUserId}</span>
              </div>
              <div className="mb-2">
                <strong>Old Status:</strong> {entry.oldStatus}
              </div>
              <div className="mb-2">
                <strong>New Status:</strong> {entry.newStatus}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskHistoryComponent;