import React, { Component,  useState, useEffect, } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import AddTodo from './components/AddTodo';
import AllTodo from './components/AllTodo';
import Todo from './components/Todo';
import './App.scss';

// const data = {
//   'name' : 'clean the room',
//   'title' : 'third task',
// 'date' :'31/01/2021',
// 'description' : 'I need to buy some garbage bags and boxes',
//   'completed' : true
// }
 
 export default class App extends Component {
   render() {
     return (
      <BrowserRouter>
      <section className="general-style">
        <h1>My Task</h1>
      <Navbar />
      <section>
      <Switch>
      <Route exact path="/" component={AllTodo} />
      <Route path="/add" component={AddTodo} />
      <Route path="/:todo_id" component={Todo} />
      </Switch>
      </section>
      </section>
      </BrowserRouter>
     )
   }
 }
 

// export default function App () {

//   useEffect( () => {
//     axios.post("http://localhost:5000/todo", data)
//     .then(res => {
//       console.log(res);
//     })
//     .catch(error => {
//         console.log(error)
//     });
//   });
//     return (
//       <div>
//         <h1>Holi</h1>
//       </div>
//     )
  
// }
