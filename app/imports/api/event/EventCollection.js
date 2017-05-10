import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Capabilities } from '/imports/api/capability/CapabilityCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';
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
      eventName: { type: String },
      createBy: { type: String },
      place: { type: String },
      startDate: { type: String },
      endDate: { type: String },
      startTime: { type: String },
      endTime: { type: String },
      tastes: { type: [String] },
      capabilities: { type: [String] },
      goals: { type: [String] },
      description: { type: String },
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
  define({ eventName = '', createBy = '', place = '', tastes, capabilities, goals, description = '',
      startTime = '', endTime = '', startDate = '', endDate = '', username }) {
    // make sure required fields are OK.
    const checkPattern = { eventName: String, createBy: String, place: String, description: String };
    check({ eventName, createBy, place, description }, checkPattern);

    // Throw an error if any of the passed Interest names are not defined.
    Tastes.assertNames(tastes);
    Capabilities.assertNames(capabilities);
    Goals.assertNames(goals);
    return this._collection.insert({ eventName, createBy, place, tastes, capabilities, goals, description,
      username, startTime, endTime, startDate, endDate });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const username = doc.username;
    const eventName = doc.eventName;
    const createBy = doc.createBy;
    const place = doc.place;
    const startDate = doc.startDate;
    const endDate = doc.endDate;
    const startTime = doc.startTime;
    const endTime = doc.endTime;
    const tastes = doc.tastes;
    const capabilities = doc.capabilities;
    const goals = doc.goals;
    const description = doc.description;
    return { username, eventName, createBy, place, startDate, endDate,
      startTime, endTime, tastes, capabilities, goals, description };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Events = new EventCollection();