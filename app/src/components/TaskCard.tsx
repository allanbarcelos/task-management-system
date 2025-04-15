
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

//Interface for props following Model 
interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed' | string;
  userId: string;
  reviewerId: string;
  createdAt: string;
  updatedAt: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  dueDate,
  status,
  userId,
  reviewerId,
  createdAt,
  updatedAt,
}) => {
  return (
    <div className="card mb-4">
      {/* Title and Status */}
      <div className="card-body text-center">
        <h5 className="card-title display-4">{title}</h5>
        <span
          className={`badge ${
            status === 'Completed'
              ? 'bg-success text-white'
              : status === 'In Progress'
              ? 'bg-warning text-dark'
              : 'bg-secondary text-white'
          }`}
        >
          {status}
        </span>
      </div>

      {/* Description */}
      <div className="card-body">
        <label htmlFor="taskDescription" className="form-label visually-hidden">
          Description
        </label>
        <textarea
          id="taskDescription"
          className="form-control bg-white text-dark"
          value={description}
          readOnly
          rows={4}
          placeholder="Task description here"
        />
      </div>

      {/* Others*/}
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>Due Date:</strong> {new Date(dueDate).toLocaleDateString()}
        </li>
        <li className="list-group-item">
          <strong>Created:</strong> {new Date(createdAt).toLocaleString()}
        </li>
        <li className="list-group-item">
          <strong>Updated:</strong> {new Date(updatedAt).toLocaleString()}
        </li>
        <li className="list-group-item">
          <strong>Assigned To:</strong> {userId}
        </li>
        <li className="list-group-item">
          <strong>Reviewer:</strong> {reviewerId}
        </li>
        <li className="list-group-item">
          <strong>Task ID:</strong> {id}
        </li>
      </ul>
    </div>
  );
};

export default TaskCard;
