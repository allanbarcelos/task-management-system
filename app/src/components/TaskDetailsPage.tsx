import React, { useState } from 'react';
import axios from 'axios';

interface TaskDetailsProps {
  id: number;
  currentStatus: string;
}

const TaskDetailsPage: React.FC<TaskDetailsProps> = ({ id, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus);
  const [message, setMessage] = useState('');

  const handleStatusChange = async () => {
    try {
      const response = await axios.put(`/api/tasks/${id}/status`, {
        status: status,
      });
      setMessage(response.data.message || 'Status updated.');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to update status.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Task Status</h2>

      <div className="mb-3">
        <label htmlFor="statusSelect" className="form-label">Status</label>
        <select
          id="statusSelect"
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button className="btn btn-primary" onClick={handleStatusChange}>
        Update Status
      </button>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default TaskDetailsPage;

//This page is subject to change as it was not my task and I only did this to test my Frontend
// Bruno Silva