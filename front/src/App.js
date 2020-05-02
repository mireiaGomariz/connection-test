import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {

  const [todo, updateTodo] = useState([])
  let [title, setTitle] = useState('')
  let [text, setText] = useState('')
  let [posted, setPosted] = useState(false)

  const postFormValue = e => {
    e.preventDefault()
    fetch('http://localhost:5000/todo', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({title, text})
    }).then(res => {
      if(res.status === 200 ) setPosted(!posted)
    })
    setTitle(title = "")
    setText(text = "")
  }

  useEffect(() => {
    fetch('http://localhost:5000/todo')
    .then(res => res.json())
    .then(data => updateTodo([...data]))
  }, [posted])

  return (
    <div className="App">
      <h1>THINGS TO DO</h1>
      <p>
        This will be my place to take notes about my things To Do in the future.
    </p>

    <h3>Task</h3>
    <form onSubmit={postFormValue}>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        name="title"
        placeholder="Title..."
      />
      <br />
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        name="text"
        placeholder="Write your comment here..."
        rows="10"
        cols="150"
      />
      <br />
      <button type="submit">Post it</button>
    </form>

    <br />
    <hr />

    <h3>List of tasks</h3>
      {todo.length > 0 &&
        todo.map(({title, text}) => (
          <div>
            <p>{title}</p>
            <p>{text}</p>
            <hr />
          </div>
        ))
      }

    </div>
  );
}

export default App;
