import {React, useRef, useState, useContext} from "react";
import {useNewTaskContext, TaskProvider} from "../context/taskContext";

export default function AddTask()
{
    const refTaskInput=useRef();
    const {taskLKeys, setTaskKeys, addTodo}=useNewTaskContext();

    return (
    
        <>
            <div className="wrapper">
                {/* Taking the task input */}
                <input type="text" ref={refTaskInput} placeholder="Add a task" />
                <button
                onClick=
                {
                    () => 
                    {
                        const taskValue=refTaskInput.current.value;

                        if(taskValue=="")
                            return;

                        // Add the Todo in local-storage

                        addTodo(taskValue);

                        // console.log(task);

                        setTaskKeys(Object.keys(localStorage));

                        // Making the input field empty

                        refTaskInput.current.value="";
                    }
                }
                >Add</button>
            </div>
        </>
    )
}