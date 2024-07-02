import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type tasksType = {
    [key: string]: TaskType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<tasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(todo => (todo.id !== todolistID)))
        delete tasks[todolistID]
    }

    const removeTask = (todolistID: string, taskId: string) => {
        setTasks({...tasks, [todolistID] : tasks[todolistID].filter(task => ( task.id !== taskId))})

        // const filteredTasks = tasks[todolistID].filter((task) => {
        //     return task.id !== taskId
        // })
        // setTasks(filteredTasks)
    }

    const addTask = (todolistID: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [...tasks[todolistID], (newTask)]})

        // const newTasks = [newTask, ...tasks]
        // setTasks(newTasks)
    }

    const changeFilter = (todolistID: string, filter: FilterValuesType) => {
        const currentTodo = todolists.find(t => (t.id === todolistID))
        if (currentTodo) {
            currentTodo.filter = filter
            setTodolists([...todolists])
        }

        //setTodolists(todolists.map(todo => {todo.id === todolistID ? todo = currentTodo : todo))
        // setFilter(filter)
    }

    const changeTaskStatus = (todolistID: string, taskId: string, taskStatus: boolean) => {
        setTasks({...tasks, [todolistID] : tasks[todolistID].map(t => t.id ===taskId ? {...t, isDone: taskStatus} : t)})
        // setTasks(...tasks, .map(t => t.id === taskId ? {...t, isDone: taskStatus} : t))
        // const newState = tasks.map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
        // setTasks(newState)
    }

    // let tasksForTodolist = tasks
    // if (filter === 'active') {
    //     tasksForTodolist = tasks.filter(task => !task.isDone)
    // }
    //
    // if (filter === 'completed') {
    //     tasksForTodolist = tasks.filter(task => task.isDone)
    // }

    return (
        <div className="App">

            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id]
                if (el.filter === 'active') {
                    tasksForTodolist = tasks[el.id].filter(task => !task.isDone)
                }

                if (el.filter === 'completed') {
                    tasksForTodolist = tasks[el.id].filter(task => task.isDone)
                }
                return (
                    <Todolist
                        key={el.id}
                        todolistID={el.id}
                        removeTodolist={removeTodolist}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={el.filter}
                    />
                )
            })}

        </div>
    );
}

export default App;
