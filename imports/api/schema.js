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
  scripture: String,
  tags: String,
  content: String,
}

type Query {
  post(id: String!): Post,
  posts: [Post]
}

type Mutation {
  submitPost(id: String, title: String!, scripture: String, tags: String, content: String): Post,
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
    async submitPost(root, {id, title, scripture, tags, content}) {
      let post = {title, scripture, tags, content};
      id ? post.updatedAt = new Date() : post.createdAt = new Date();
      await Posts.upsert(id, {$set: post});
      // if insert, then return nothing
      return Posts.findOne(id);
    }
  }
}
