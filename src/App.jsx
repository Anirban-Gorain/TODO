import {React, useState} from "react";
import AddTask from "./components/AddTask";
import ShowTask from "./components/ShowTask";
import {useNewTaskContext, TaskProvider} from "./context/taskContext";

function App() {

  const [taskKeys, setTaskKeys]=useState(Object.keys(localStorage));
  // console.log(taskKeys);

  // Utilities function
  
  const shuffle = str => [...str].sort(()=>Math.random()-.5).join('');

  const idGen = () =>
  {
    let str = new String("ABCDEFGHIJKLMNOPQRSTUVWXYZ-abcdefghijklmnopqrstuvwxyz-123456789-!@#$%^&*()_+");
    const id = shuffle(str);
    return id.substring(20, 30);
  }

  // Functionalities


  const addTodo = (task) =>
  {
    let id = idGen();

    while (localStorage.getItem(id)!==null)
    {
      id = idGen();
    }

    const newTodo =
    {
      todo:task,
      id:id,
      isDone:false,
    }

    // console.log(newTodo);
    localStorage.setItem(id, JSON.stringify(newTodo));
  }

  const todoDone = (id, newVal)=>
  {
    let data =JSON.parse(localStorage.getItem(id));
    data.isDone=newVal;
    localStorage.setItem(id, JSON.stringify(data));
  }

  const editTodo = (id, newTodo)=>
  {
    let data =JSON.parse(localStorage.getItem(id));
    data.todo=newTodo;
    console.log(data.todo);
    localStorage.setItem(id, JSON.stringify(data));
  }

  const deleteTodo = (id)=>
  {
    localStorage.removeItem(id);
    const ind=taskKeys.indexOf(id);

    setTaskKeys((prevTaskKeys) =>
    {
      const newTaskKeys = [...prevTaskKeys];
      newTaskKeys.splice(ind, 1);
      return newTaskKeys;
    });
  }


  return (
    <>
      <div className="container">
        <TaskProvider value={{taskKeys, setTaskKeys, addTodo, todoDone, editTodo, deleteTodo}}>
          <AddTask/>

          {/* Show task */}

            <div className="tasks-container">
              {
                taskKeys.map((id, ind)=>
                {
                  // console.log(id);
                  return <ShowTask key={id} id={id} />
                })
              }
            </div>

        </TaskProvider>
      </div>
    </>
  )
}

export default App
