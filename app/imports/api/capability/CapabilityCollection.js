import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

/** @module Capability */

/**
 * Represents a specific capability, such as "Piano".
 * @extends module:Base~BaseCollection
 */
class CapabilityCollection extends BaseCollection {

  /**
   * Creates the Interest collection.
   */
  constructor() {
    super('Interest', new SimpleSchema({
      name: { type: String },
      description: { type: String, optional: true },
    }));
  }

  /**
   * Defines a new Interest.
   * @example
   * Interests.define({ name: 'Piano',
   *                    description: 'An acoustic, stringed musical instrument' });
   * @param { Object } description Object with keys name and description.
   * Name must be previously undefined. Description is optional.
   * Creates a "slug" for this name and stores it in the slug field.
   * @throws {Meteor.Error} If the capability definition includes a defined name.
   * @returns The newly created docID.
   */
  define({ name, description }) {
    check(name, String);
    check(description, String);
    if (this.find({ name }).count() > 0) {
      throw new Meteor.Error(`${name} is previously defined in another Interest`);
    }
    return this._collection.insert({ name, description });
  }

  /**
   * Returns the Interest name corresponding to the passed capability docID.
   * @param capabilityID An capability docID.
   * @returns { String } An capability name.
   * @throws { Meteor.Error} If the capability docID cannot be found.
   */
  findName(capabilityID) {
    this.assertDefined(capabilityID);
    return this.findDoc(capabilityID).name;
  }

  /**
   * Returns a list of Interest names corresponding to the passed list of Interest docIDs.
   * @param capabilityIDs A list of Interest docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findNames(capabilityIDs) {
    return capabilityIDs.map(capabilityID => this.findName(capabilityID));
  }

  /**
   * Throws an error if the passed name is not a defined Interest name.
   * @param name The name of an capability.
   */
  assertName(name) {
    this.findDoc(name);
  }

  /**
   * Throws an error if the passed list of names are not all Interest names.
   * @param names An array of (hopefully) Interest names.
   */
  assertNames(names) {
    _.each(names, name => this.assertName(name));
  }

  /**
   * Returns the docID associated with the passed Interest name, or throws an error if it cannot be found.
   * @param { String } name An capability name.
   * @returns { String } The docID associated with the name.
   * @throws { Meteor.Error } If name is not associated with an Interest.
   */
  findID(name) {
    return (this.findDoc(name)._id);
  }

  /**
   * Returns the docIDs associated with the array of Interest names, or throws an error if any name cannot be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of capability names.
   * @returns { String[] } The docIDs associated with the names.
   * @throws { Meteor.Error } If any instance is not an Interest name.
   */
  findIDs(names) {
    return (names) ? names.map((instance) => this.findID(instance)) : [];
  }

  /**
   * Returns an object representing the Interest docID in a format acceptable to define().
   * @param docID The docID of an Interest.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const description = doc.description;
    return { name, description };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Interests = new CapabilityCollection();
