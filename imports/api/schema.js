import {Posts} from '/imports/api/collections';

// why array and string?
// megadraft schema
/*
type Range {
  offset: Int,
  length: Int,
  key: Int,
}

type BlockData {
  type: String,
  src: String,
  caption: String,
  rightsHolder: String,
  display: String,
}

type ContentBlock {
  key: String,
  text: String,
  type: String,
  depth: Int,
  inlineStyleRanges: [Range],
  entityRanges: [Range],
  data: BlockData,
}

type Content {
  blocks: [ContentBlock]
}

input ContentInput {
  blocks: [ContentBlock]
}
*/
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
  submitPost(id: String, title: String!, content: String): Post,
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
