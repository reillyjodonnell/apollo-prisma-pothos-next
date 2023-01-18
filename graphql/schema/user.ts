import { db } from '../../prisma/index';
import { builder } from '../builder';

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    name: t.exposeString('name'),
    email: t.exposeString('email'),
    pass: t.exposeString('hashedPassword'),
    isOnline: t.exposeBoolean('isOnline'),
    username: t.exposeString('username'),
    birthday: t.expose('birthday', {
      type: 'Date',
    }),
  }),
});

// Adding this code to user.ts

builder.queryFields((t) => ({
  retrieveUser: t.prismaField({
    type: 'User',
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return db.user.findUniqueOrThrow({
        ...query,
        where: {
          id: args?.id,
        },
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createUser: t.prismaField({
    type: 'User',
    args: {
      name: t.arg.string({ required: true }),
      email: t.arg.string({ required: true }),
      pass: t.arg.string({ required: true }),
      username: t.arg.string({ required: true }),
      birthday: t.arg({ type: 'Date', required: true }),
    },
    resolve: (query, root, args, ctx, info) => {
      return db.user.create({
        ...query,
        data: {
          name: args.name,
          email: args.email,
          hashedPassword: args.pass,
          username: args.username,
          birthday: args.birthday,
        },
      });
    },
  }),
}));

export const schema = builder.toSchema();
