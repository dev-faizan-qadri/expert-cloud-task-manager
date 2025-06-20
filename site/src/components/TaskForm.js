import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const TaskForm = ({ fetchTasks, editingTask, setEditingTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Title required');
    if (!description.trim() || description.length < 5) return alert('Description must be at least 5 characters');

    if (editingTask) {
      await api.put(`/tasks/${editingTask.id}`, { title, description });
      setEditingTask(null);
    } else {
      await api.post('/tasks', { title, description });
    }

    setTitle('');
    setDescription('');
    fetchTasks();
  };

  return (
    <div className="container my-4">
      <form onSubmit={handleSubmit} className="border p-4 bg-light rounded shadow-sm">
        <h4>{editingTask ? 'Edit Task' : 'Add New Task'}</h4>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            placeholder="Task title"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            placeholder="Description (min 5 characters)"
            rows="3"
            required
          />
        </div>
        <button type="submit" className="btn btn-success me-2">
          {editingTask ? 'Update' : 'Add'} Task
        </button>
        {editingTask && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setEditingTask(null)}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default TaskForm;
