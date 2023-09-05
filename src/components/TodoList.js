import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../actions/authActions"
import { useNavigate } from "react-router-dom"
import {
  fetchTodos,
  updateTodo,
  deleteTodo,
  addTodo,
} from "../actions/todoActions"
import { DataGrid } from "@mui/x-data-grid"
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Input,
  Grid,
} from "@mui/material"
import { CheckCircleOutline, Cancel } from "@mui/icons-material"

const TodoList = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editedTitle, setEditedTitle] = useState("")
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const [editedCompleted, setEditedCompleted] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos.todos)
  const navigate = useNavigate()

  useEffect(() => {
    if (todos.length === 0) {
      dispatch(fetchTodos())
    }
  }, [dispatch, todos.length])

  const handleOpenEditDialog = (taskId) => {
    const taskToEdit = todos.find((task) => task.id === taskId)
    if (taskToEdit) {
      setSelectedTaskId(taskId)
      setEditedTitle(taskToEdit.title)
      setEditedCompleted(taskToEdit.completed)
      setEditDialogOpen(true)
    }
  }

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false)
    setSelectedTaskId(null)
    setEditedTitle("")
  }

  const handleSaveEditedTask = () => {
    if (selectedTaskId !== null) {
      const editedTask = todos.find((task) => task.id === selectedTaskId)
      if (editedTask) {
        const updatedTask = {
          ...editedTask,
          title: editedTitle,
          completed: editedCompleted,
        }
        dispatch(updateTodo(updatedTask))
        handleCloseEditDialog()
      }
    }
  }

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTodo(taskId))
  }

  const handleAddTask = () => {
    if (newTaskTitle.trim() !== "") {
      const newTask = {
        userId: 1,
        id: todos.length + 1,
        title: newTaskTitle,
        completed: false,
      }
      dispatch(addTodo(newTask))
      setNewTaskTitle("")
    }
  }
  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Titulo", width: 500 },
    {
      field: "completed",
      headerName: "Completado",
      width: 150,
      renderCell: (params) => (
        <div
          style={{
            textAlign: "right",
            paddingLeft: "25px",
          }}
        >
          {params.value ? (
            <CheckCircleOutline color="success" />
          ) : (
            <Cancel color="error" />
          )}
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "",
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            style={{marginRight:'10px'}}
            variant="outlined"
            color="primary"
            onClick={() => handleOpenEditDialog(params.row.id)}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDeleteTask(params.row.id)}
          >
            Borrar
          </Button>
        </>
      ),
    },
  ]

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Lista de tareas</h1>
      <div style={{ alignSelf: "flex-end" }}>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <FormControl>
        <InputLabel>Nueva tarea</InputLabel>
        <Grid
          container
          style={{ marginTop: "5px", paddingTop: "5px", width: "100%" }}
        >
          <Grid item xs={8}>
            <Input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <Button
              style={{ marginBottom: "5px", paddingBottom: "5px" }}
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleAddTask}
            >
              Agregar
            </Button>
          </Grid>
        </Grid>
      </FormControl>

      <DataGrid
        rows={todos}
        columns={columns}
        pageSize={20}
        pagination
        pageSizeOptions={[5, 10, 20, 100]}
        sortModel={[
          {
            field: "id",
            sort: "desc",
          },
        ]}
      />

      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Editar tarea</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={editedCompleted}
                onChange={(e) => setEditedCompleted(e.target.checked)}
              />
            }
            label="Completed"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSaveEditedTask} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default TodoList
