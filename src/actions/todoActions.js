import axios from 'axios';

export const showTodos = (storedTodos) => ({
  type: 'SHOW_TODOS',
  payload: storedTodos,
});

export const fetchTodos = () => async (dispatch) => {
  try {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    if (storedTodos.length > 0) {
      dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: storedTodos });
    } else {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      const limitedData = response.data.slice(0, 20);
      localStorage.setItem('todos', JSON.stringify(limitedData));
      dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: limitedData });
    }
  } catch (error) {
    dispatch({ type: 'FETCH_TODOS_FAILURE', error });
  }
};

export const addTodo = (todo) => {
  const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  storedTodos.push(todo);
  localStorage.setItem('todos', JSON.stringify(storedTodos));

  return {
    type: 'ADD_TODO',
    payload: todo,
  };
};

export const updateTodo = (todo) => (dispatch, getState) => {
  const updatedTodos = getState().todos.todos.map((t) =>
    t.id === todo.id ? todo : t
  );
  
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
  
  dispatch({ type: 'UPDATE_TODO', payload: todo });
};

export const deleteTodo = (id) => (dispatch, getState) => {
  const updatedTodos = getState().todos.todos.filter((todo) => todo.id !== id);
  
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
  
  dispatch({ type: 'DELETE_TODO', payload: id });
};