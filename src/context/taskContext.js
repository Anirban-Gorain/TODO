import {createContext, useContext} from "react";

const newTaskContext=createContext({
    todo:[
        {
            todo:"",
            id:1,
            isDone:false,
        }
    ],
    addTodo:()=>{}, 
    modifyTodo:()=>{},
    todoDone:()=>{},
    editTodo:()=>{},
    deleteTodo:()=>{},
    
});

export const TaskProvider= newTaskContext.Provider;

export function useNewTaskContext()
{
    return useContext(newTaskContext);
}