import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

/** @module Taste */

/**
 * Represents a specific Taste, such as "Software Engineering".
 * @extends module:Base~BaseCollection
 */
class TasteCollection extends BaseCollection {

  /**
   * Creates the Taste collection.
   */
  constructor() {
    super('Taste', new SimpleSchema({
      name: { type: String },
    }));
  }

  /**
   * Defines a new Taste.
   * @example
   * Tastes.define({ name: 'Software Engineering',
   *                    description: 'Methods for group development of large, high quality software systems' });
   * @param { Object } description Object with keys name and description.
   * Name must be previously undefined. Description is optional.
   * Creates a "slug" for this name and stores it in the slug field.
   * @throws {Meteor.Error} If the Taste definition includes a defined name.
   * @returns The newly created docID.
   */
  define({ name }) {
    check(name, String);
    if (this.find({ name }).count() > 0) {
      throw new Meteor.Error(`${name} is previously defined in another Taste`);
    }
    return this._collection.insert({ name });
  }

  /**
   * Returns the Taste name corresponding to the passed Taste docID.
   * @param TasteID An Taste docID.
   * @returns { String } An Taste name.
   * @throws { Meteor.Error} If the Taste docID cannot be found.
   */
  findName(TasteID) {
    this.assertDefined(TasteID);
    return this.findDoc(TasteID).name;
  }

  /**
   * Returns a list of Taste names corresponding to the passed list of Taste docIDs.
   * @param TasteIDs A list of Taste docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findNames(TasteIDs) {
    return TasteIDs.map(TasteID => this.findName(TasteID));
  }

  /**
   * Throws an error if the passed name is not a defined Taste name.
   * @param name The name of an Taste.
   */
  assertName(name) {
    this.findDoc(name);
  }

  /**
   * Throws an error if the passed list of names are not all Taste names.
   * @param names An array of (hopefully) Taste names.
   */
  assertNames(names) {
    _.each(names, name => this.assertName(name));
  }

  /**
   * Returns the docID associated with the passed Taste name, or throws an error if it cannot be found.
   * @param { String } name An Taste name.
   * @returns { String } The docID associated with the name.
   * @throws { Meteor.Error } If name is not associated with an Taste.
   */
  findID(name) {
    return (this.findDoc(name)._id);
  }

  /**
   * Returns the docIDs associated with the array of Taste names, or throws an error if any name cannot be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of Taste names.
   * @returns { String[] } The docIDs associated with the names.
   * @throws { Meteor.Error } If any instance is not an Taste name.
   */
  findIDs(names) {
    return (names) ? names.map((instance) => this.findID(instance)) : [];
  }

  /**
   * Returns an object representing the Taste docID in a format acceptable to define().
   * @param docID The docID of an Taste.
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
export const Tastes = new TasteCollection();
