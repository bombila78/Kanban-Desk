import axios from 'axios'
import { ITodoStatus, ITodo } from '../intefaces'

export async function getTodos (): Promise<ITodoStatus[]> {
    const { data } = await axios.get('/api/todos')
    return data
}

export async function createTodo (todo: ITodo):Promise<number> {
    const { data } = await axios.post('/api/todos/create', { todo })
    return data
}

export async function updateTodo (todo: ITodo):Promise<number> {
    const { data } = await axios.post('/api/todos/update', { todo })
    return data
}

export async function destroyTodo (id: number):Promise<void> {
    await axios.post('/api/todos/destroy', { id })
}