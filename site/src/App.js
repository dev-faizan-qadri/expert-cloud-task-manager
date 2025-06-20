// src/App.js
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import api from './utils/api';
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

const App = () => {
  const [auth, setAuth] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch('http://localhost:3000/', {
      credentials: 'include',
    });
  }, []);

  const fetchTasks = async (page = 1) => {
    try {
      const response = await api.get(`/tasks?page=${page}`);
      setTasks(response.data.tasks);
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchTasks();
    }
  }, [auth]);

  const handleLogout = async () => {
    try {
      const cookies = document.cookie.split('; ');
      const csrf = cookies.find((row) => row.startsWith('CSRF-TOKEN='));
      const token = csrf ? decodeURIComponent(csrf.split('=')[1]) : null;
    
      if (!token) {
        console.warn('CSRF token not found. Logout may fail.');
      }
    
      await fetch('http://localhost:3000/users/sign_out', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': token,
        },
        credentials: 'include',
      });
    
      setAuth(false);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };
   return (
    <div className="container py-5">
      {auth ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="mb-0">Task Manager</h1>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <TaskForm
            fetchTasks={fetchTasks}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
          />
          <TaskList
            fetchTasks={fetchTasks}
            tasks={tasks}
            setEditingTask={setEditingTask}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <Login setAuth={setAuth} />
      )}
    </div>
  );
};

export default App;
