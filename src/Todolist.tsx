import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type PropsType = {
	todolistID: string
	title: string
	tasks: TaskType[]
	removeTodolist: (todolistId : string) => void
	removeTask: (todolistId : string, taskId: string) => void
	changeFilter: (todolistID: string, filter: FilterValuesType) => void
	addTask: (todolistID: string, title: string) => void
	changeTaskStatus: (todolistID: string, taskId: string, taskStatus: boolean) => void
	filter: FilterValuesType
}

export const Todolist = (props: PropsType) => {
	const {todolistID, title, tasks, filter, removeTodolist, removeTask, changeFilter, addTask, changeTaskStatus} = props

	const [taskTitle, setTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	const addTaskHandler = () => {
		if (taskTitle.trim() !== '') {
			addTask(todolistID, taskTitle.trim())
			setTaskTitle('')
		} else {
			setError('Title is required')
		}
	}

	const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(event.currentTarget.value)
	}

	const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (event.key === 'Enter') {
			addTaskHandler()
		}
	}

	const changeFilterTasksHandler = (todolistID: string, filter: FilterValuesType) => {
		changeFilter(todolistID, filter)
	}
	const removeTodolistHandler = () => {
		removeTodolist(todolistID)
	}

	return (
		<div>
			<div className={'flex-wrapper'}>
				<h3>{title}</h3>
				<Button title={'x'} onClick={removeTodolistHandler}/>
			</div>
			<div>
				<input
					className={error ? 'error': ''}
					value={taskTitle}
					onChange={changeTaskTitleHandler}
					onKeyUp={addTaskOnKeyUpHandler}
				/>
				<Button title={'+'} onClick={addTaskHandler}/>
				{error && <div className={'error-message'}>{error}</div> }
			</div>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(todolistID,task.id)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(todolistID, task.id, newStatusValue)
							}

							return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
								<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
								<span>{task.title}</span>
								<Button onClick={removeTaskHandler} title={'x'}/>
							</li>
						})}
					</ul>
			}
			<div>
				<Button className={filter === 'all' ? 'active-filter' : '' } title={'All'} onClick={()=> changeFilterTasksHandler(todolistID, 'all')}/>
				<Button className={filter === 'active' ? 'active-filter' : '' } title={'Active'} onClick={()=> changeFilterTasksHandler(todolistID, 'active')}/>
				<Button className={filter === 'completed' ? 'active-filter' : '' } title={'Completed'} onClick={()=> changeFilterTasksHandler(todolistID, 'completed')}/>
			</div>
		</div>
	)
}
