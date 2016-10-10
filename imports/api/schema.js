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
  submitPost(title: String!, content: String!): String,
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
    async submitPost(_, {title, content}) {
      return await Posts.insert({title, content});
    }
  }
}
