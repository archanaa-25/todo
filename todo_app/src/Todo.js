import {List, ListItem, ListItemText, Modal, Button } from '@mui/material'
import React, {useState} from 'react'
import './Todo.css';
import db from './firebase';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: '#fff',
    border: '2px solid #000',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
    padding:'16px 32px',
  }
}));

function Todo(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const handleOpen = () => {
    setOpen(true);
  }

  const updateTodo = () => {
    //update the todo with the new input text
    db.collection('todos').doc(props.todo.id).set({
      todo: input
    }, {merge: true})
    setOpen(false);
  }

  return (
    <>
      <Modal 
        open = {open}
        onClose = {e => setOpen(false)}
      >
        <div className={classes.paper}>
          <h1>Edit Task</h1>
          <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
          <Button onClick = {updateTodo}>Update</Button>
        </div>
      </Modal>
      <List className="todo_list">
        <ListItem>
          <ListItemText primary={props.todo.todo} secondary="Dummy deadline"/>
        </ListItem>
        <button onClick={e => setOpen(true)}>Edit</button>
        <DoneRoundedIcon onClick={event=> {db.collection('todos').doc(props.todo.id).delete()}} />
      </List>
    </>
  )
}

export default Todo