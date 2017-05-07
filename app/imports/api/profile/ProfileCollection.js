import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Capabilities } from '/imports/api/capability/CapabilityCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

/** @module Profile */

/**
 * Profiles provide portfolio data for a user.
 * @extends module:Base~BaseCollection
 */
class ProfileCollection extends BaseCollection {

  /**
   * Creates the Profile collection.
   */
  constructor() {
    super('Profile', new SimpleSchema({
      username: { type: String },
      // Remainder are optional
      firstName: { type: String, optional: true },
      lastName: { type: String, optional: true },
      goals: { type: [String], optional: true },
      capabilities: { type: [String], optional: true },
      tastes: { type: [String], optional: true },
      title: { type: String, optional: true },
      picture: { type: SimpleSchema.RegEx.Url, optional: true },
      youtube: { type: SimpleSchema.RegEx.Url, optional: true },
      soundcloud: { type: SimpleSchema.RegEx.Url, optional: true },
    }));
  }

  /**
   * Defines a new Profile.
   * @example
   * Profiles.define({ firstName: 'Philip',
   *                   lastName: 'Johnson',
   *                   username: 'johnson',
   *                   bio: 'I have been a professor of computer science at UH since 1990.',
   *                   capabilities: ['Application Development', 'Software Engineering', 'Databases'],
   *                   title: 'Professor of Information and Computer Sciences',
   *                   picture: 'http://philipmjohnson.org/headshot.jpg',
   *                   youtube: 'https://youtube.com/philipmjohnson',
   *                   soundcloud: 'https://soundcloud.com/philipmjohnson',
   *                   : 'https://.com/philipmjohnson' });
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * Goals is an array of defined goal names.
   * @throws { Meteor.Error } If a user with the supplied username already exists, or
   * if one or more goals are not defined, or if youtube, soundcloud, and  are not URLs.
   * @returns The newly created docID.
   */
  define({
           firstName = '', lastName = '', username, goals, capabilities, tastes,
           picture = '', title = '', youtube = '', soundcloud = '',
         }) {
    // make sure required fields are OK.
    const checkPattern = { firstName: String, lastName: String, username: String, picture: String, title: String };
    check({ firstName, lastName, username, picture, title }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }

    // Throw an error if any of the passed Goal, Capability, Taste names are not defined.
    Goals.assertNames(goals);
    Capabilities.assertNames(capabilities);
    Tastes.assertNames(tastes);
    return this._collection.insert({
      firstName, lastName, username, goals, capabilities, tastes, picture, title, youtube, soundcloud });
  }

  /**
   * Returns an object representing the Profile docID in a format acceptable to define().
   * @param docID The docID of a Profile.
   * @returns { Object } An object representing the definition of docID.
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const firstName = doc.firstName;
    const lastName = doc.lastName;
    const username = doc.username;
    const goals = doc.goals;
    const capabilities = doc.capabilities;
    const tastes = doc.tastes;
    const picture = doc.picture;
    const title = doc.title;
    const youtube = doc.youtube;
    const soundcloud = doc.soundcloud;
    return { firstName, lastName, username, goals, capabilities, tastes, picture, title, youtube, soundcloud };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Profiles = new ProfileCollection();
