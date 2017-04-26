/**
 *
 * Created by danli on 4/18/2017.
 */

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
// import { Interests } from '/imports/api/interest/InterestCollection';
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
      lastName: { type: String, optional: true },
      address: { type: String, optional: true },
      telephone: { type: String, optional: true },
      email: { type: String, optional: false },
      musicaltastes: { type: [String], optional: false },
      musicalcapabilities: { type: [String], optional: false },
      musicalgoals: { type: [String], optional: false },
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
  define({ firstName = '', lastName = '', address = '', telephone = '', email = '', musicaltastes = '', musicalcapabilities ='', musicalgoals= '', picture = '', youtube = '', soundcloud = '' }) {
    // make sure required fields are OK.
    const checkPattern = { firstName: String, lastName: String, address: String, telephone: String, email: String, musicaltastes: String, musicalcapabilities: String, musicalgoals: String, picture: String, youtube: String, soundcloud: String };
    check({ firstName, lastName, address, telephone, email, musicaltastes, musicalcapabilities, musicalgoals, picture, youtube, soundcloud }, checkPattern);

    if (this.find({ username }).count() > 0) {
      throw new Meteor.Error(`${username} is previously defined in another Profile`);
    }

    // Throw an error if any of the passed Interest names are not defined.
    Interests.assertNames(interests);
    return this._collection.insert({ firstName, lastName, address, telephone, email, musicaltastes, musicalcapabilities, musicalgoals, picture, youtube, soundcloud});
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
    const address = doc.address;
    const telephone = doc.telephone;
    const email = doc.email;
    const musicaltastes = doc.musicaltastes;
    const musicalcapabilities = doc.musicalcapabilities;
    const musicalgoals = doc.musicalgoals;
    const picture = doc.picture;
    const youtube = doc.youtube;
    const soundclouod = doc.soundcloud;
    return { firstName, lastName, address, telephone, email, musicaltastes, musicalcapabilities, musicalgoals, picture, youtube, soundcloud };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Profiles = new ProfileCollection();