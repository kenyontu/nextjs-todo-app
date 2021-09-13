declare module 'app-types' {
  export interface TodoBody {
    isDone: boolean
    text: string
  }

  export interface Todo extends TodoBody {
    id: string
  }

  export interface ListBody {
    name: string
    todos: string[]
  }

  export interface List extends ListBody {
    id: string
  }
}
