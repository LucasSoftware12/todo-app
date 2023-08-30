const initialState = {
  todos: [],
}

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_TODOS":
      return { ...state, todos: action.payload }
    case "UPDATE_TODO_LIST":
      return { ...state, todos: action.payload }
    case "FETCH_TODOS_SUCCESS":
      return { ...state, todos: action.payload }
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] }
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      }
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      }
    default:
      return state
  }
}

export default todoReducer
