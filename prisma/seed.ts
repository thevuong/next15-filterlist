import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MESSAGES = [
  {
    content: 'Hello, your application has been approved!',
    createdAt: new Date('2024-09-03T00:00:00Z'),
    createdById: '3ea4ae6c-adda-40eb-b254-9cfe0c8e8113',
    id: '0cd89022-64e8-4a76-aec6-43433478e32f',
  },
  {
    content: 'Great, what are the next steps?',
    createdAt: new Date('2024-09-04T00:01:00Z'),
    createdById: '2bccacd4-64de-4f1d-97ed-9722cdf99cd9',
    id: '0cd89022-64e8-4a76-aec6-43433478e32f',
  },
];

async function seedMessages() {
  await Promise.all(
    MESSAGES.map(n => {
      return prisma.message.create({
        data: {
          content: n.content,
          createdAt: n.createdAt,
          createdById: n.createdById,
        },
      });
    }),
  )
    .then(() => {
      return console.info('[SEED] Succussfully create message records');
    })
    .catch(e => {
      return console.error('[SEED] Failed to create message records', e);
    });
}

seedMessages();
