import React from 'react';
import api from '../utils/api'

const TaskList = ({ fetchTasks, tasks, setEditingTask, currentPage, totalPages, setCurrentPage }) => {
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks(currentPage);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchTasks(page);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`btn btn-sm ${currentPage === i ? 'btn-primary' : 'btn-outline-secondary'} mx-1`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="container mt-4">
      <h4>Task List</h4>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{task.title}</strong>
              <div className="text-muted">{task.description}</div>
            </div>
            <div>
              <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setEditingTask(task)}>
                Edit
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 d-flex justify-content-center">
        {renderPagination()}
      </div>
    </div>
  );
};

export default TaskList
