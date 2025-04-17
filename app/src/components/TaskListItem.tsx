import { TaskItem } from '@interfaces/TaskItem';

interface TaskListItemProps {
  task: TaskItem;
}

const TaskListItem: React.FC<TaskListItemProps> = ({ task }) => {
  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h5>{task.title}</h5>
          {task.description && <p className="mb-1">{task.description}</p>}
          <small className="text-muted">
            Due: {new Date(task.dueDate).toLocaleDateString()} | Status: {task.status}
          </small>
        </div>
        <span className={`badge ${task.status === 'Done' ? 'bg-success' : 'bg-warning'}`}>
          {task.status}
        </span>
      </div>
    </li>
  );
};

export default TaskListItem;