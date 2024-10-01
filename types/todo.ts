export type TodoStatus = 'todo' | 'inprogress' | 'done';

export type TodosOverview = Record<TodoStatus, Record<string, { count: number; color: string }>>;
