import React, { useState, useEffect } from 'react'
import DeskColumn from './DeskColumn'
import { ITodo, ITodoStatus, todoStatusIds } from '../intefaces'
import { getTodos, createTodo, updateTodo, destroyTodo } from '../api/todo'
import { compareTodoStatuses  } from '../helpers/utils'

const TaskDesk: React.FC = () => {

    const [todoStatuses, setTodoStatuses] = useState<ITodoStatus[]>([])
    const [deskColumns, setDeskColumns] = useState<JSX.Element[]>([])

    const addHandler = (): void => {
        const title: string | null = window.prompt('Provide a new ToDo, please')
        if (title == null || !title.trim()) {
            alert('You should write something')
            return
        }
        const startStatus = todoStatuses.find(el => el.alias === "To Do")
        if (!startStatus) {
            alert('Todo statuses are undefined')
            return
        }

        const newTodo: ITodo = {
            id: 0,
            title: title,
            status_id: startStatus.id
        }

        createTodo(newTodo)
            .then(id => newTodo.id = id)
            .then(() => {
                getTodos()
                    .then(data => {
                        setTodoStatuses(prev => data)
                    })
            })
            .catch(err => console.error(err))
    }

    const changeStatusHandler = (id: number): void => {
        const todos: ITodo[] = todoStatuses.reduce((acc: ITodo[], el) => {
            acc.push(...el.Todos)
            return acc
        }, [])

        const updatedTodo = todos.find(el => el.id === id)

        if (!updatedTodo) return

        updatedTodo.status_id = updatedTodo.status_id + 1

        if (updatedTodo.status_id === todoStatusIds.inProgressId) {
            updatedTodo.startTimestamp = Date.now()
        }

        if (updatedTodo.status_id === todoStatusIds.doneId) {
            updatedTodo.finishTimestamp = Date.now()
        }
        updateTodo(updatedTodo)
            .then(() => {
                getTodos()
                    .then(data => {
                        setTodoStatuses(prev => data)
                    })
            })
            .catch(err => console.error(err))
    }

    const destroyTodoHandler = (id: number): void => {
        destroyTodo(id)
            .then(() => {
                getTodos()
                    .then(data => {
                        setTodoStatuses(prev => data)
                    })
            })
    }

    useEffect(() => {
        const fetchTodos = async () => {
            const todos = await getTodos()
            setTodoStatuses(todos)
        }
        fetchTodos()
    }, [])

    useEffect(() => {
        const deskColumns = () => {
            return todoStatuses
                .sort(compareTodoStatuses)
                .map(el => {
                    return (<DeskColumn
                        title={el.alias}
                        todos={el.Todos}
                        destroyTodoHandler={destroyTodoHandler}
                        changeStatusHandler={changeStatusHandler}
                    />)
                })
        }
        setDeskColumns(deskColumns)
    }, [todoStatuses])

    return (
        <div className="container">
            <div className="button-container center">
                <button
                    className="btn-floating btn-large waves-effect waves-light red"
                    onClick={addHandler}>
                    <i className="material-icons">add</i>
                </button>
            </div>
            <div className="row">
                {deskColumns}
            </div>
        </div>
    )
}

export default TaskDesk