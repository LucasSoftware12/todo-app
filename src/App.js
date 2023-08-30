import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa Routes aquí
import { Provider } from 'react-redux';
import store from './store/store';
import Login from './components/Login';
import TodoList from './components/TodoList';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todo-list" element={<TodoList />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
