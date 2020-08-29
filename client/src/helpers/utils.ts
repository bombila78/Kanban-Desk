import { ITodoStatus, ITodo } from '../intefaces'

export function compareTodoStatuses (a: ITodoStatus, b: ITodoStatus): number {
        return a.priority - b.priority
    }

export const DOLLARS_PER_HOUR: number = 1000

export function getTaskPrice (todo: ITodo): number {
    const timeSpent: number = todo.finishTimestamp! - todo.startTimestamp!
    const hoursSpent = timeSpent/(3600 * 1000)

    return hoursSpent * DOLLARS_PER_HOUR
}

export function toCurrency (price: number): string {
    return new Intl.NumberFormat('en-In', {
        currency: 'usd',
        style: 'currency'
    }).format(price)
}