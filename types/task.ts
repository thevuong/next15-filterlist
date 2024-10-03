export type TaskStatus = 'todo' | 'inprogress' | 'done';

export type TaskSummary = Record<TaskStatus, Record<number, { count: number; name: string }>>;
