import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export function ToDo(){
    let [tasks, setTasks] = useState([{todo : "Sample Task", key : uuidv4(), isDone : false}]);
    let [newTask,setNewTask] = useState("");

    let addTasks = () => {
        setTasks((prevTask)=>{
            return [...prevTask, {todo : newTask , key : uuidv4(), isDone : false}];
        });
        setNewTask("");
    }

    let inputHandler = (event) => {
       setNewTask(event.target.value); 
    }

    let deleteTask = (key) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.key != key));
    }

    let doneOne = (key) => {
            setTasks((preTasks)=>
                preTasks.map((task)=>{
                    if(task.key == key){
                        return {
                            ...task,
                            isDone : true,
                        };
                    } else{
                        return {...task};
                    }
                }))
    }

    let doneAll = () => {
        if(confirm("Mark all as done?")){
            setTasks((preVal) => 
                preVal.map((task)=>{
                    return {
                        ...task, isDone : true
                    }
                })
            )
        }
    }

    return(
        <div id="mainComponent">
            <h1 className="heading" id="mainHeading">To-Do</h1>
            <input className="input" id="taskInput" placeholder="Add your task" value={newTask} onChange={inputHandler}></input>
            &nbsp;&nbsp;
            <button className="btn" id="addbtn" onClick={addTasks}>+ Add</button>
            <br/><br/>
            <hr/>
            <h2 className="heading" id="secHeading">Tasks</h2>
            <div id="totalList">
            <ul id="ul">
                {
                    tasks.map((task)=>(
                        <li id="li" key={task.key}>
                            <span style={task.isDone ? {textDecorationLine: "line-through", color: "#90EE90"} : {}}>{task.todo}</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button className="btn" id="deleteBtn" onClick={()=>deleteTask(task.key)}>Delete</button>
                            &nbsp;&nbsp;
                            <button className="btn" id="markBtn" onClick={()=>doneOne(task.key)}>Mark As Done</button>
                        </li>
                    ))
                }
            </ul>
            </div>
            <br/><br/>
            <button className="btn" id="markAllBtn" onClick={doneAll}>Mark All As Done</button>
        </div>
    )
}