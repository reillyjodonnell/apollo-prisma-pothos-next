import { db } from '../../prisma/index';
import { builder } from '../builder';

builder.prismaObject('Post', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    title: t.exposeString('title'),
    content: t.exposeString('content'),
    createdAt: t.expose('createdAt', {
      type: 'Date',
    }),
    updatedAt: t.expose('updatedAt', {
      type: 'Date',
    }),
    url: t.exposeString('url'),
    isPublished: t.exposeBoolean('isPublished'),
    author: t.relation('author'),
  }),
});

builder.queryFields((t) => ({
  post: t.prismaField({
    type: 'Post',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) => {
      const id = +args.id;
      return db.post.findUniqueOrThrow({
        ...query,
        where: {
          id,
        },
      });
    },
  }),
}));

builder.mutationFields((t) => ({
  createPost: t.prismaField({
    type: 'Post',
    args: {
      title: t.arg.string({ required: true }),
      content: t.arg.string({ required: true }),
      url: t.arg.string({ required: true }),
      isPublished: t.arg.boolean({ required: true }),
      authorId: t.arg.int({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) => {
      return db.post.create({
        ...query,
        data: {
          title: args.title,
          content: args.content,
          url: args.url,
          isPublished: args.isPublished,
          authorId: args.authorId,
        },
      });
    },
  }),
}));
