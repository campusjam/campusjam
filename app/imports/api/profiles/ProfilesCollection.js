/**
 *
 * Created by danli on 4/18/2017.
 */

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
// import { Interests } from '/imports/api/interest/InterestCollection';
import { Capabilities } from '/imports/api/capability/CapabilityCollection';
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
      firstName: { type: String, optional: false },
      lastName: { type: String, optional: false },
      username: { type: String },
      address: { type: String, optional: true },
      telephone: { type: String, optional: false },
      email: { type: String, optional: false },
      tastes: { type: [String], optional: false },
      capabilities: { type: [String], optional: false },
      goals: { type: [String], optional: false },
      // picture: { type: SimpleSchema.RegEx.Url, optional: true },
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
   *                   address: '2500 Campus Rd. Honolulu, HI 96822';
   *                   telephone: '808-956-3489'
   *                   email: 'johnson@hawaii.edu'
   *                   musicaltastes: ['Jawaiian', 'Jazz'],
   *                   musicalcapabilities: ['Ukulele', 'Trumpet'],
   *                   musicalgoals: ['Play in a band', 'Casual playing'],
   *                   picture: 'http://philipmjohnson.org/headshot.jpg',
   *                   youtube: 'https://youtube.com/philipmjohnson',
   *                   soundcloud: 'https://soundcloud.com/philipmjohnson',
   * @param { Object } description Object with required key username.
   * Remaining keys are optional.
   * Username must be unique for all users. It should be the UH email account.
   * Interests is an array of defined interest names.
   * @throws { Meteor.Error } If a user with the supplied username already exists, or
   * if one or more interests are not defined, or if github, facebook, and instagram are not URLs.
   * @returns The newly created docID.
   */
  define({ firstName = '', lastName = '', username = '', address = '', telephone = '', email = '',
      tastes = '', capabilities = '', goals = '', youtube = '', soundcloud = '' }) {
    // make sure required fields are OK.
    const checkPattern = { firstName: String, lastName: String, username: String, telephone: String,
      email: String, tastes: String, capabilities: String, goals: String, youtube: String, soundcloud: String };
    check({ firstName, lastName, username, address, telephone, email, tastes, capabilities, goals }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }

    // Throw an error if any of the passed Interest names are not defined.
    Tastes.assertNames(tastes);
    Capabilities.assertNames(capabilities);
    Goals.assertNames(goals);
    return this._collection.insert({ firstName, lastName, username, address, telephone, email, tastes, capabilities, goals, youtube, soundcloud});
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
    const address = doc.address;
    const telephone = doc.telephone;
    const email = doc.email;
    const tastes = doc.tastes;
    const capabilities = doc.capabilities;
    const goals = doc.goals;
    // const picture = doc.picture;
    const youtube = doc.youtube;
    const soundcloud = doc.soundcloud;
    return { firstName, lastName, username, address, telephone, email, tastes, capabilities, goals, youtube, soundcloud };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Profiles = new ProfileCollection();