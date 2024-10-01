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
    id: '7c274dd0-fcee-4f71-907c-7d55d5d760f6',
    name: 'Home',
    color: 'bg-blue-500',
  },
  {
    id: 'c841a2b2-70e4-4c7e-aef1-3994a0039251',
    name: 'Work',
    color: 'bg-red-500',
  },
  {
    id: '7e7a5d87-3851-4768-b707-7d5c70399e2b',
    name: 'Personal',
    color: 'bg-green-500',
  },
];

const TODOS = [
  {
    categoryId: '7c274dd0-fcee-4f71-907c-7d55d5d760f6',
    createdAt: new Date('2024-09-03T00:00:00Z'),
    description: 'Milk, Cheese, Pizza, Fruit, Tylenol',
    name: 'Buy groceries',
    status: 'IN_PROGRESS',
  },
  {
    categoryId: 'c841a2b2-70e4-4c7e-aef1-3994a0039251',
    createdAt: new Date('2024-05-03T00:00:00Z'),
    description: 'Learn React by building a project',
    name: 'Learn React',
    status: 'TODO',
  },
  {
    categoryId: 'c841a2b2-70e4-4c7e-aef1-3994a0039251',
    createdAt: new Date('2024-06-03T00:00:00Z'),
    description: 'Learn TypeScript by building a project',
    name: 'Learn TypeScript',
    status: 'IN_PROGRESS',
  },
  {
    categoryId: '7e7a5d87-3851-4768-b707-7d5c70399e2b',
    createdAt: new Date('2024-07-03T00:00:00Z'),
    description: 'Learn to dance by taking a class',
    name: 'Learn to dance',
    status: 'TODO',
  },
  {
    categoryId: '7c274dd0-fcee-4f71-907c-7d55d5d760f6',
    createdAt: new Date('2024-09-03T00:00:00Z'),
    description: 'Go to Grandmas house and have dinner',
    name: 'Visit Grandma',
    status: 'DONE',
  },
];

async function seedMessages() {
  await Promise.all(
    USERS.map(n => {
      return prisma.user.create({
        data: {
          firstname: n.firstName,
          lastname: n.lastName,
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
    CATEGORIES.map(n => {
      return prisma.category.create({
        data: {
          id: n.id,
          color: n.color,
          name: n.name,
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
    TODOS.map(n => {
      return prisma.todo.create({
        data: {
          categoryId: n.categoryId,
          createdAt: n.createdAt,
          description: n.description,
          name: n.name,
          status: n.status,
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

seedMessages();
