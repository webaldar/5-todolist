import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    })

    const removeTask = (todolistId : string, taskId: string) => {
        // 1. Найдем таски для тудулиста, в котором будет происходить удаление
        const todolistTasks = tasks[todolistId]
        // 2. Удалим таску по которой кликнули
        const newTodolistTasks = todolistTasks.filter(t => t.id !== taskId)
        // 3. Перезапишем массив тасок на новый (отфильтрованный) массив
        tasks[todolistId] = newTodolistTasks
        // 4. Засетаем в state копию объекта, чтобы React отреагировал перерисовкой
        // console.log({...tasks}, newTodolistTasks)
        setTasks({ ...tasks })
    }

    const addTask = (todolistID: string, title: string) => {
        // const newTask = {id: v1(), title, isDone: false }
        setTasks({...tasks, [todolistID]: [{id: v1(), title, isDone: false }, ...tasks[todolistID] ]})
    }

     const changeFilter = (todolistID: string, filter: FilterValuesType) => {
       setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter} : tl))

     }

    const changeTaskStatus = (todolistID: string, taskId: string, taskStatus: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(task=> task.id ===taskId ? {...task, isDone: taskStatus} : task)})
    //     const newState = tasks.map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
    //     setTasks(newState)
    }
    const removeTodolist = (todolistID: string) => {
        const newTodolist = todolists.filter(todo => (todo.id !== todolistID))
        setTodolists(newTodolist)
        delete tasks[todolistID]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todolists.map(todo => {
                let tasksForTodolist = tasks[todo.id]
                if (todo.filter === 'active') {
                     tasksForTodolist = tasks[todo.id].filter(task => !task.isDone)
                }

                if (todo.filter === 'completed') {
                    tasksForTodolist = tasks[todo.id].filter(task => task.isDone)
                }
                return (
                    <Todolist
						key = {todo.id}
                        todolistID={todo.id}
                        title={todo.title}
                        tasks={tasksForTodolist}
                        removeTodolist={removeTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={todo.filter}
                    />
                )
            })}
        </div>
    );
}

export default App;
