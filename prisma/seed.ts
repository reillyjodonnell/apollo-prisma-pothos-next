import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function seed() {
  await Promise.all(
    createUsers().map((user) => {
      return db.user.create({ data: user });
    })
  );
}

seed();

function createUsers() {
  return [
    {
      email: 'adam@gmail.com',
      name: 'Adam',
      username: 'adamIsAwesome',
      hashedPassword: '123456',
      birthday: new Date('1945-01-01'),
    },
    {
      email: 'bob@gmail.com',
      name: 'Bob',
      username: 'bob',
      hashedPassword: 'asoidf',
      birthday: new Date('1965-01-01'),
    },
    {
      email: 'charlie@gmail.com',
      name: 'charlie',
      username: 'charlie',
      hashedPassword: 'pjioas',
      birthday: new Date('1985-01-01'),
    },
    {
      email: 'dan@abc.com',
      name: 'Dan',
      username: 'DanTheMan',
      hashedPassword: '1234',
      birthday: new Date('1996-07-01'),
    },
  ];
}
