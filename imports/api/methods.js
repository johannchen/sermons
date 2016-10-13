import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Posts } from './collections';

export const upsertPost = new ValidatedMethod({
  name: 'posts.upsert',
  validate: new SimpleSchema({
    postId: {
      type: String,
      optional: true,
    },
    title: {
      type: String
    },
    content: {
      type: Object
    }
  }).validator(),
  run({
    bookId,
    title,
    content,
  }) {
    return Posts.upsert(postId, {
      $set: {
        title,
        content,
        updatedAt: new Date()
      }
    });
  }
});
