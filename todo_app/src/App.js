import React, { useEffect, useState } from 'react';
import {Button, FormControl, Input, InputLabel} from '@mui/material';
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [deadline, setDeadline] = useState('');


  // Format current date when component mounts
  useEffect(() => {
    const date = new Date();
    const options = { weekday: 'long' };
    const dayName = date.toLocaleDateString('en-US', options);
    
    // Format date as "18th April 2025"
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();
    
    // Add ordinal suffix to day
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    
    const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
    
    setCurrentDay(dayName);
    setCurrentDate(formattedDate);
  }, []);

  // When the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    // This code here...fires when the app.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, []);
  

  const addTodo = (event) => {
    // This will fire off when we click the button
    event.preventDefault(); // Will stop refreshing

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput('');  // Clear up the input after hitting submit
  }


  return (
    <div className="App">
      <h1>TODO</h1>
      <h3>Reminds Everything</h3>
      
      <div className="date-display">
        <div className="current-day">{currentDay}</div>
        <div className="current-date">{currentDate}</div>
      </div>
      
      <form>
        <FormControl>
          <InputLabel>✔ Add a Task</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>

        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">Add TODO</Button>
        {/* <button type="submit" ></button> */}
      </form>
      <ul>
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo}/>
          //<li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;