import {Posts} from '/imports/api/collections';

// why array and string?
export const typeDefs = [`
type Post {
  _id: String,
  title: String,
  content: String,
}

type Query {
  post(id: String!): Post,
  posts: [Post]
}

type Mutation {
  submitPost(id: String, title: String!, content: String!): Post,
}

schema {
  query: Query,
  mutation: Mutation,
}
`];

// async await?
// root, args, context are standard param of graphql resolve function
export const resolvers = {
  Query: {
    async post(root, args, context) {
      return await Posts.findOne(args.id);
    },
    async posts(root, args, context) {
      return await Posts.find().fetch();
    },
  },
  Mutation: {
    async submitPost(_, {id, title, content}) {
      await Posts.upsert(id, {$set: {title, content}});
      return Posts.findOne(id);
    }
  }
}
