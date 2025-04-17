import { Avatar, List, ListItem, ListItemAvatar, ListItemText, ImageIcon } from '@mui/material'
import React from 'react'
import './Todo.css';

function Todo(props) {
  return (
    <List className="todo_list">
      <ListItem>
        <ListItemAvatar>
        </ListItemAvatar>
        <ListItemText primary={props.text} secondary="Dummy deadline"/>
      </ListItem>
    </List>
  )
}

export default Todo