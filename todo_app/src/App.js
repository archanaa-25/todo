import React, { useState } from 'react';
import {Button, FormControl, Input, InputLabel} from '@mui/material';
import './App.css';


function App() {
  const [todos,setTodos] = useState(['Take dogs for a walk','Take the rubbish out','want to livestream'])
  const [input,setInput] = useState('');
  console.log(input);

  const addTodo = (event) => {
    //this will fire off when we click the button
    event.preventDefault(); //will stop refreshing
    console.log('Im working');
    setTodos([...todos,input]);
    setInput('');  //clear up the input after hitting submit
  }

  return (
    <div className="App">
      <h1>Hello world</h1>
      <form>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>

        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">Add TODO</Button>
        {/* <button type="submit" ></button> */}
      </form>
      <ul>
        {todos.map(todo => (
          <Todo text={todo}/>
          <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
