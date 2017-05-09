import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

/** @module Goal */

/**
 * Represents a specific Goal, such as "Software Engineering".
 * @extends module:Base~BaseCollection
 */
class GoalCollection extends BaseCollection {

  /**
   * Creates the Goal collection.
   */
  constructor() {
    super('Goal', new SimpleSchema({
      name: { type: String },
    }));
  }

  /**
   * Defines a new Goal.
   * @example
   * Goals.define({ name: 'Software Engineering',
   *                    description: 'Methods for group development of large, high quality software systems' });
   * @param { Object } description Object with keys name and description.
   * Name must be previously undefined. Description is optional.
   * Creates a "slug" for this name and stores it in the slug field.
   * @throws {Meteor.Error} If the Goal definition includes a defined name.
   * @returns The newly created docID.
   */
  define({ name }) {
    check(name, String);
    if (this.find({ name }).count() > 0) {
      throw new Meteor.Error(`${name} is previously defined in another Goal`);
    }
    return this._collection.insert({ name });
  }

  /**
   * Returns the Goal name corresponding to the passed Goal docID.
   * @param GoalID An Goal docID.
   * @returns { String } An Goal name.
   * @throws { Meteor.Error} If the Goal docID cannot be found.
   */
  findName(GoalID) {
    this.assertDefined(GoalID);
    return this.findDoc(GoalID).name;
  }

  /**
   * Returns a list of Goal names corresponding to the passed list of Goal docIDs.
   * @param GoalIDs A list of Goal docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findNames(GoalIDs) {
    return GoalIDs.map(GoalID => this.findName(GoalID));
  }

  /**
   * Throws an error if the passed name is not a defined Goal name.
   * @param name The name of an Goal.
   */
  assertName(name) {
    this.findDoc(name);
  }

  /**
   * Throws an error if the passed list of names are not all Goal names.
   * @param names An array of (hopefully) Goal names.
   */
  assertNames(names) {
    _.each(names, name => this.assertName(name));
  }

  /**
   * Returns the docID associated with the passed Goal name, or throws an error if it cannot be found.
   * @param { String } name An Goal name.
   * @returns { String } The docID associated with the name.
   * @throws { Meteor.Error } If name is not associated with an Goal.
   */
  findID(name) {
    return (this.findDoc(name)._id);
  }

  /**
   * Returns the docIDs associated with the array of Goal names, or throws an error if any name cannot be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of Goal names.
   * @returns { String[] } The docIDs associated with the names.
   * @throws { Meteor.Error } If any instance is not an Goal name.
   */
  findIDs(names) {
    return (names) ? names.map((instance) => this.findID(instance)) : [];
  }

  /**
   * Returns an object representing the Goal docID in a format acceptable to define().
   * @param docID The docID of an Goal.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    return { name };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Goals = new GoalCollection();
