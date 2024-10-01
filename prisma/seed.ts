import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const USERS = [
  {
    firstName: 'Aurora',
    lastName: 'Scharff',
  },
];

const CATEGORIES = [
  {
    color: 'bg-blue-500',
    id: 0,
    name: 'Home',
  },
  {
    color: 'bg-red-500',
    id: 1,
    name: 'Work',
  },
  {
    color: 'bg-green-500',
    id: 2,
    name: 'Personal',
  },
];

const TODOS = [
  {
    categoryId: 0,
    createdAt: new Date('2024-09-03T00:00:00Z'),
    description: 'Milk, Cheese, Pizza, Fruit, Tylenol',
    name: 'Buy groceries',
    status: 'inprogress',
  },
  {
    categoryId: 1,
    createdAt: new Date('2024-05-03T00:00:00Z'),
    description: 'Learn React by building a project',
    name: 'Learn React',
    status: 'todo',
  },
  {
    categoryId: 1,
    createdAt: new Date('2024-06-03T00:00:00Z'),
    description: 'Learn TypeScript by building a project',
    name: 'Learn TypeScript',
    status: 'inprogress',
  },
  {
    categoryId: 2,
    createdAt: new Date('2024-07-03T00:00:00Z'),
    description: 'Learn to dance by taking a class',
    name: 'Learn to dance',
    status: 'todo',
  },
  {
    categoryId: 0,
    createdAt: new Date('2024-09-03T00:00:00Z'),
    description: 'Go to Grandmas house and have dinner',
    name: 'Visit Grandma',
    status: 'done',
  },
];

async function seedTodos() {
  await Promise.all(
    USERS.map(user => {
      return prisma.user.create({
        data: {
          firstname: user.firstName,
          lastname: user.lastName,
        },
      });
    }),
  )
    .then(() => {
      return console.info('[SEED] Succussfully create category records');
    })
    .catch(e => {
      return console.error('[SEED] Failed to create category records', e);
    });
  await Promise.all(
    CATEGORIES.map(category => {
      return prisma.category.create({
        data: {
          color: category.color,
          id: category.id,
          name: category.name,
        },
      });
    }),
  )
    .then(() => {
      return console.info('[SEED] Succussfully create category records');
    })
    .catch(e => {
      return console.error('[SEED] Failed to create category records', e);
    });
  await Promise.all(
    TODOS.map(todo => {
      return prisma.todo.create({
        data: {
          categoryId: todo.categoryId,
          createdAt: todo.createdAt,
          description: todo.description,
          name: todo.name,
          status: todo.status,
        },
      });
    }),
  )
    .then(() => {
      return console.info('[SEED] Successfully created todo records');
    })
    .catch(e => {
      return console.error('[SEED] Failed to create todo records', e);
    });
}

seedTodos();
