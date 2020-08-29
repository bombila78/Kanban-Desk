import React from 'react'

interface TodoButtonProps {
    title: string,
    changeStatusHandler(id: number):void,
    todoId:number
}

const TodoButton: React.FC<TodoButtonProps> = ({ title, changeStatusHandler, todoId }) => {
    return (
        <button className="btn waves-effect waves-light" onClick={() => changeStatusHandler(todoId)}>{title}
            <i className="material-icons right">send</i>
        </button>
    )
}

export default TodoButton