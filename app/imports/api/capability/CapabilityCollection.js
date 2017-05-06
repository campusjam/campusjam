import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

/** @module Capability */

/**
 * Represents a specific Capability, such as "Software Engineering".
 * @extends module:Base~BaseCollection
 */
class CapabilityCollection extends BaseCollection {

  /**
   * Creates the Capability collection.
   */
  constructor() {
    super('Capability', new SimpleSchema({
      name: { type: String },
    }));
  }

  /**
   * Defines a new Capability.
   * @example
   * Capabilities.define({ name: 'Software Engineering',
   *                    description: 'Methods for group development of large, high quality software systems' });
   * @param { Object } description Object with keys name and description.
   * Name must be previously undefined. Description is optional.
   * Creates a "slug" for this name and stores it in the slug field.
   * @throws {Meteor.Error} If the Capability definition includes a defined name.
   * @returns The newly created docID.
   */
  define({ name }) {
    check(name, String);
    if (this.find({ name }).count() > 0) {
      throw new Meteor.Error(`${name} is previously defined in another Capability`);
    }
    return this._collection.insert({ name });
  }

  /**
   * Returns the Capability name corresponding to the passed Capability docID.
   * @param CapabilityID An Capability docID.
   * @returns { String } An Capability name.
   * @throws { Meteor.Error} If the Capability docID cannot be found.
   */
  findName(CapabilityID) {
    this.assertDefined(CapabilityID);
    return this.findDoc(CapabilityID).name;
  }

  /**
   * Returns a list of Capability names corresponding to the passed list of Capability docIDs.
   * @param CapabilityIDs A list of Capability docIDs.
   * @returns { Array }
   * @throws { Meteor.Error} If any of the instanceIDs cannot be found.
   */
  findNames(CapabilityIDs) {
    return CapabilityIDs.map(CapabilityID => this.findName(CapabilityID));
  }

  /**
   * Throws an error if the passed name is not a defined Capability name.
   * @param name The name of an Capability.
   */
  assertName(name) {
    this.findDoc(name);
  }

  /**
   * Throws an error if the passed list of names are not all Capability names.
   * @param names An array of (hopefully) Capability names.
   */
  assertNames(names) {
    _.each(names, name => this.assertName(name));
  }

  /**
   * Returns the docID associated with the passed Capability name, or throws an error if it cannot be found.
   * @param { String } name An Capability name.
   * @returns { String } The docID associated with the name.
   * @throws { Meteor.Error } If name is not associated with an Capability.
   */
  findID(name) {
    return (this.findDoc(name)._id);
  }

  /**
   * Returns the docIDs associated with the array of Capability names, or throws an error if any name cannot be found.
   * If nothing is passed, then an empty array is returned.
   * @param { String[] } names An array of Capability names.
   * @returns { String[] } The docIDs associated with the names.
   * @throws { Meteor.Error } If any instance is not an Capability name.
   */
  findIDs(names) {
    return (names) ? names.map((instance) => this.findID(instance)) : [];
  }

  /**
   * Returns an object representing the Capability docID in a format acceptable to define().
   * @param docID The docID of an Capability.
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
export const Capabilities = new CapabilityCollection();
