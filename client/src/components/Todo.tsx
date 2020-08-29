import React, { useEffect, useState } from 'react'
import { ITodo, todoStatusIds } from '../intefaces'
import TodoButton from './TodoButton'
import moment from 'moment'

const pricePerHour: number = 1000

interface TodoProps {
    todo: ITodo,
    changeStatusHandler(id: number):void,
    destroyTodoHandler(id: number):void
}

const Todo: React.FC<TodoProps> = ({ todo, changeStatusHandler, destroyTodoHandler }) => {

    const [timer, setTimer] = useState<string>('')
    const [price, setPrice] = useState<string>('')

    useEffect(() => {
        if (!todo.startTimestamp) return
        const interval = setInterval(() => {
            setTimer(moment(Date.now() - todo.startTimestamp!)
                        .subtract(3, 'h')
                        .format('HH:mm:ss'))
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (!todo.startTimestamp || !todo.finishTimestamp) return
        const timeSpent = (todo.finishTimestamp! - todo.startTimestamp!) / (3600 * 1000)
        const price = timeSpent * pricePerHour
        const priceString = new Intl.NumberFormat('en-In', {
            currency: 'usd',
            style: 'currency'
        }).format(price)
        setPrice(priceString)
    }, [])

    const todoButton = ():JSX.Element | null => {
        switch (todo.status_id) {
            case todoStatusIds.todoId:
                return <TodoButton title="Начать" todoId={todo.id} changeStatusHandler={changeStatusHandler} />
            case todoStatusIds.inProgressId:
                return <TodoButton title="Завершить" todoId={todo.id} changeStatusHandler={changeStatusHandler} />
            case todoStatusIds.doneId:
                return <TodoButton title="Удалить задачу" todoId={todo.id} changeStatusHandler={destroyTodoHandler} />
            default:
                return null
        }
    }

    const additionalInfo = ():any => {
        switch (todo.status_id) {
            case todoStatusIds.todoId:
                return <span className="not-started">Task not started</span>
            case todoStatusIds.inProgressId:
                return <span className="timer">{timer}</span>
            case todoStatusIds.doneId:
                return <span className="price">{price}</span>
            default:
                return null
        }
    }
    return (
            <div className="col s12">
                <div className="card blue-grey darken-1 center">
                    <div className="card-content white-text">
                        <span className="card-title">{todo.title}</span>
                    </div>
                        {additionalInfo()}
                    <div className="card-action">
                        {todoButton()}
                    </div>
                </div>
            </div>
    )
}

export default Todo