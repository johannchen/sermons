import { Mongo } from 'meteor/mongo';

export const Verses = new Mongo.Collection('verses');

// Deny all client-side updates since we will be using methods to manage this collection
/*
Verses.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
*/
