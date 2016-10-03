import {Verses} from '/imports/api/collections';

// why array and string?
//verse(id: String!): Verse
export const typeDefs = [`
type Verse {
  title: String
}

type Query {
  verse: Verse
}

type Mutation {
  updateTitle(title: String!): String
}

schema {
  query: Query,
  mutation: Mutation,
}
`];

// async await?
// root?
export const resolvers = {
  Query: {
    async verse(root, args, context) {
      return await Verses.findOne();
    },
  },
  Mutation: {
    async updateTitle(root, {title}) {
      return Verses.update({}, {$set: {title}});
    }
  }
}
