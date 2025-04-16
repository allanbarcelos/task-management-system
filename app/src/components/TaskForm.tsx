import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

interface TaskFormProps {
  initialData?: {
    title: string;
    description: string;
    dueDate: string;
    status: string;
  };
  onSubmit: (formData: any) => void;
  isEditing?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    dueDate: initialData?.dueDate || '',
    status: initialData?.status || 'Pending'
  });
  const [error, setError] = useState<string>('');

  const validateDueDate = (date: string): boolean => {
    const selectedDate = new Date(date);
    const now = new Date();
    return selectedDate > now;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateDueDate(formData.dueDate)) {
      setError('Due date must be in the future');
      return;
    }

    setError('');
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when due date is changed
    if (name === 'dueDate') {
      setError('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="datetime-local"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        {isEditing ? 'Update Task' : 'Create Task'}
      </Button>
    </Form>
  );
};

export default TaskForm; 