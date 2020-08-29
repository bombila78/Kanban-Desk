import React from 'react'
import Todo from './Todo'
import { ITodo } from '../intefaces'

interface DeskColumnProps {
    title: string,
    todos: ITodo[],
    changeStatusHandler(id: number):void,
    destroyTodoHandler(id: number):void
}

const DeskColumn: React.FC<DeskColumnProps> = ({ title, todos, changeStatusHandler, destroyTodoHandler }) => {

    const renderTodos:JSX.Element[] = todos.map(el => {
        return (<Todo todo={el} changeStatusHandler={changeStatusHandler} destroyTodoHandler={destroyTodoHandler}/>)
    })
    return (
        <div className="col s4">
            <div className="desk-column-wrapper">
                <div className="desk-column yellow lighten-4">
                    <h4>{title}</h4>
                    {renderTodos}
                </div>
            </div>
        </div>
        
    )
}

export default DeskColumn