import React, {useState, useEffect, useRef} from "react";
import {useNewTaskContext} from "../context/taskContext";

export default function ShowTask({id})
{
    const {taskLKeys, todoDone, deleteTodo, editTodo}=useNewTaskContext();
    const data = JSON.parse(localStorage.getItem(id));
    const [marker, setMarker]=useState(data.isDone);
    const [isReadOnly, setIsReadOnly]=useState(true);
    const [taskInputValue, setTaskInputValue] = useState(data.todo);
    const taskInput=useRef(0);
    
    return (
        <div key={data.id} className={`task-wrapper ${marker ? "done" : "pending"}`}>
            <div className="done-marker">
                <input type="checkbox"
                    id={data.id}
                    onChange=
                    {
                        ()=>
                        {
                            setMarker((prev) =>
                            {
                                const newMarkerState = !prev; // Toggle the state
                                todoDone(data.id, newMarkerState); // Update the local state
                                return newMarkerState;
                            })
                        }
                    }
                    checked={marker==true}
                />
            </div>
            <input ref={taskInput} type="text" readOnly={isReadOnly} onChange=
            {
                (e)=>
                {
                    setTaskInputValue(taskInput.current.value);
                }
            }
            className={"tasks"} value={taskInputValue}
            />
            <div className="edit">
                <button
                    onClick={()=>
                    {
                        // console.log(isEditable);
                        
                        setIsReadOnly(prev => 
                        {
                            if(prev==true) // Input field was disabled, now enabled
                                taskInput.current.focus();
                            if(prev==false) // Input field was enabled, now disabled
                                editTodo(data.id, taskInputValue)
                                // console.log(taskInputValue);
                            

                            return !prev;                            
                        })
                        

                        // taskInput.currentTarget.style.caretColor=isEditable?"white":"transparent";

                    }}
                    >{isReadOnly?"✏️":"✔️"}</button>
                <button
                    onClick={()=>
                    {   
                        deleteTodo(data.id);
                    }}
                >⛔</button>
            </div>
        </div>
    )
}