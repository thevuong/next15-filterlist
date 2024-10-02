import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PROJECTS = [
  {
    id: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    name: 'Project X',
    companyName: 'Company X',
    expectedLaunchDate: new Date('2024-09-03T00:00:00Z'),
  },
];

const TEAMMEMBERS = [
  {
    id: '90bfe743-b2e6-456d-b9bf-e0c01ec4dd36',
    role: 'backend',
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
  },
  {
    id: '3077c0b5-e028-4add-b098-7b109fbf6248',
    role: 'backend',
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
  },
  {
    id: '09557e52-05e8-4b43-ada7-e30898b3c827',
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    role: 'frontend',
  },
  {
    id: '204e65bf-7eba-47d1-9c71-c35cde4c493b',
    role: 'test-manager',
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
  },
  {
    id: '786b7ba7-3045-4ae0-a6b7-cbce8b15770d',
    role: 'ux-designer',
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
  },
];

const CATEGORIES = [
  {
    color: 'bg-blue-500',
    id: 0,
    name: 'Infrastructure',
  },
  {
    color: 'bg-red-500',
    id: 1,
    name: 'Frontend',
  },
  {
    color: 'bg-green-500',
    id: 2,
    name: 'Backend',
  },
  {
    color: 'bg-yellow-500',
    id: 3,
    name: 'Testing',
  },
];

const TODOS = [
  {
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    categoryId: 0,
    createdAt: new Date('2024-09-03T00:00:00Z'),
    description: 'Research and implement a CI/CD pipeline',
    title: 'Implement CI/CD',
    status: 'inprogress',
  },
  {
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    categoryId: 2,
    createdAt: new Date('2024-05-03T00:00:00Z'),
    description: 'Design the homepage of the website',
    title: 'Design the homepage',
    status: 'todo',
  },
  {
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    categoryId: 2,
    createdAt: new Date('2024-06-03T00:00:00Z'),
    description: 'Research user personas for the application',
    title: 'Research user personas',
    status: 'inprogress',
  },
  {
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    categoryId: 1,
    createdAt: new Date('2024-07-03T00:00:00Z'),
    description: 'Implement the homepage of the application',
    title: 'Implement the homepage',
    status: 'todo',
  },
  {
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    categoryId: 2,
    createdAt: new Date('2024-07-03T00:00:00Z'),
    description: 'Create the database schema for the application',
    title: 'Create database schema',
    status: 'todo',
  },
  {
    projectId: 'b3876ae0-bdbf-4c04-8230-85d3a6da15e9',
    categoryId: 3,
    createdAt: new Date('2024-09-03T00:00:00Z'),
    description: 'Test the homepage of the application',
    title: 'Test the homepage',
    status: 'done',
  },
];

async function seedTodos() {
  await Promise.all(
    PROJECTS.map(project => {
      return prisma.project.create({
        data: {
          companyName: project.companyName,
          expectedLaunch: project.expectedLaunchDate,
          id: project.id,
          name: project.name,
        },
      });
    }),
  )
    .then(() => {
      return console.info('[SEED] Succussfully create project records');
    })
    .catch(e => {
      return console.error('[SEED] Failed to create project records', e);
    });
  await Promise.all(
    TEAMMEMBERS.map(member => {
      return prisma.teamMember.create({
        data: {
          id: member.id,
          role: member.role,
          projectId: member.projectId,
        },
      });
    }),
  )
    .then(() => {
      return console.info('[SEED] Succussfully create teamMember records');
    })
    .catch(e => {
      return console.error('[SEED] Failed to create teamMember records', e);
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
          projectId: todo.projectId,
          categoryId: todo.categoryId,
          createdAt: todo.createdAt,
          description: todo.description,
          title: todo.title,
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
