import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

/** @module Goals */

/**
 * Represents a specific goal, such as "Casual".
 * @extends module:Base~BaseCollection
 */
class GoalCollection extends BaseCollection {

  /**
   * Creates the Goals collection.
   */
  constructor() {
    super('Goals', new SimpleSchema({
      name: { type: String },
    }));
  }

  /**
   * Defines a new Goal.
   * @example
   * Goals.define({ name: 'Casual'});
   * @param { Object } description Object with keys name.
   * Name must be previously undefined.
   * Creates a "slug" for this name and stores it in the slug field.
   * @throws {Meteor.Error} If the goal definition includes a defined name.
   * @returns The newly created docID.
   */
  define({ name }) {
    check(name, String);
    if (this.find({ name }).count() > 1) {
      throw new Meteor.Error(`${name} is a previously defined Goal`);
    }
    return this._collection.insert({ name });
  }

  /**
   * Returns the Goal name corresponding to the passed goal docID.
   * @param goalID A goal docID.
   * @returns { String } A goal name.
   * @throws { Meteor.Error} If the goal docID cannot be found.
   */
  findName(goalID) {
    this.assertDefined(goalID);
    return this.findDoc(goalID).name;
  }

  /**
   * Returns a list of Goal names corresponding to the passed list of Goal docIDs.
   * @param goalIDs A list of Goal docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findNames(goalIDs) {
    return goalIDs.map(goalID => this.findName(goalID));
  }

  /**
   * Throws an error if the passed name is not a defined Goal name.
   * @param name The name of an goal.
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
   * @param { String } name An goal name.
   * @returns { String } The docID associated with the name.
   * @throws { Meteor.Error } If name is not associated with an Goal.
   */
  findID(name) {
    return (this.findDoc(name)._id);
  }

  /**
   * Returns the docIDs associated with the array of Goal names, or throws an error if any name cannot be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of goal names.
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
