import React, { useEffect, useState } from 'react';
import {Button, FormControl, Input, InputLabel} from '@mui/material';
import './App.css';
import Todo from './Todo';
import db from './firebase';

function App() {
  const [todos,setTodos] = useState([])
  const [input,setInput] = useState('');

//when the app loads, we need to listen to the database and fetch new todos as they get added/removed
useEffect(() => {
  //this code here...fires when the app.js loads
  db.collection('todos').onSnapshot(snapshot => {
    //console.log(snapshot.docs.map(doc => doc.data()))
    setTodos(snapshot.docs.map(doc => doc.data().todo))
  })
}, []);

  const addTodo = (event) => {
    //this will fire off when we click the button
    event.preventDefault(); //will stop refreshing
    setTodos([...todos,input]);
    setInput('');  //clear up the input after hitting submit
  }

  return (
    <div className="App">
      <h1>Hello world</h1>
      <form>
        <FormControl>
          <InputLabel>✔ Write a Todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>

        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">Add TODO</Button>
        {/* <button type="submit" ></button> */}
      </form>
      <ul>
        {todos.map(todo => (
          <Todo text={todo}/>
          //<li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
