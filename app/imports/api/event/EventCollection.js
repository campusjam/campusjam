import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { check } from 'meteor/check';

/** @module Profile */

/**
 * Profiles provide portfolio data for a user.
 * @extends module:Base~BaseCollection
 */
class EventCollection extends BaseCollection {

  /**
   * Creates the Profile collection.
   */
  constructor() {
    super('Event', new SimpleSchema({
      username: { type: String },
      eventName: { type: String, optional: true },
      createBy: { type: String, optional: true },
      place: { type: String, optional: true },
      tastes: { type: [String], optional: true },
      capabilities: { type: [String], optional: true },
      goals: { type: [String], optional: true },
      description: { type: String, optional: true },
    }));
  }

  /**
   * Defines a new Profile.
   * @example
   * Profiles.define({ firstName: 'Philip',
   *                   lastName: 'Johnson',
   *                   username: 'johnson',
   *                   bio: 'I have been a professor of computer science at UH since 1990.',
   *                   interests: ['Application Development', 'Software Engineering', 'Databases'],
   *                   capabilities: ['Application Development', 'Software Engineering', 'Databases'],
   *                   title: 'Professor of Information and Computer Sciences',
   *                   picture: 'http://philipmjohnson.org/headshot.jpg',
   *                   github: 'https://github.com/philipmjohnson',
   *                   facebook: 'https://facebook.com/philipmjohnson',
   *                   instagram: 'https://instagram.com/philipmjohnson' });
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * Interests is an array of defined interest names.
   * @throws { Meteor.Error } If a user with the supplied username already exists, or
   * if one or more interests are not defined, or if github, facebook, and instagram are not URLs.
   * @returns The newly created docID.
   */
  define({ eventName = '', createBy = '', username, place = '', tastes, capabilities, goals, description = '' }) {
    // make sure required fields are OK.
    const checkPattern = { eventName: String, createBy: String, username: String, place: String, description: String };
    check({ eventName, createBy, username, place, description }, checkPattern);

    // Throw an error if any of the passed Interest names are not defined.
    Interests.assertNames(tastes);
    Interests.assertNames(capabilities);
    Interests.assertNames(goals);
    return this._collection.insert({ eventName, createBy, username, place, tastes, capabilities, goals, description });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const eventName = doc.eventName;
    const createBy = doc.createBy;
    const username = doc.username;
    const place = doc.place;
    const tastes = doc.tastes;
    const capabilities = doc.capabilities;
    const goals = doc.goals;
    const description = doc.description;
    return { eventName, createBy, username, place, tastes, capabilities, goals, description };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Events = new EventCollection();
