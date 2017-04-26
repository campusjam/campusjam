import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
// import { Interests } from '/imports/api/interest/InterestCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

/** @module Event */

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
      // Remainder are optional
      eventName: { type: String, optional: true },
      createBy: { type: String, optional: true },
      place: { type: String, optional: true },
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
  define({ eventName = '', createBy = '', username, place = '' }) {
    // make sure required fields are OK.
    const checkPattern = { firstName: String, lastName: String, username: String, bio: String, picture: String,
      title: String };
    check({ eventName, createBy, username, place }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }

    // Throw an error if any of the passed Interest names are not defined.
    // Interests.assertNames(interests);
    return this._collection.insert({ eventName, createBy, username, place });
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
    return { eventName, createBy, username, place };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Events = new EventCollection();
