export type TodoStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type TodosOverview = Record<TodoStatus, Record<string, { count: number; color: string }>>;
