export interface ITodo {
    id: number,
    title: string,
    status_id: number,
    startTimestamp?: number,
    finishTimestamp?: number
}

export interface ITodoStatus {
    id: number,
    priority: number,
    alias: string,
    Todos: ITodo[]
}

export enum todoStatusIds {
    todoId = 1,
    inProgressId,
    doneId
}