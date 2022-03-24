import axios from "axios";

let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '06f51144-bbb3-482a-8cdf-1e7bdaee953d'
    }
})

export const todolistApi = {
    getTodos() {
        return instance.get<TodoType[]>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post<BaseResponseType<{ item: TodoType }>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(payload: { title: string, todolistId: string }) {
        return instance.put<BaseResponseType>(`${payload.todolistId}`, {title: payload.title})
    }
}

type TodoType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
}

type BaseResponseType<T = {}> = {
    resultCode: number,
    messages: string[],
    fieldsErrors: string[],
    data: T,
}