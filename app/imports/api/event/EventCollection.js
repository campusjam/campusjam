import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import BaseCollection from '/imports/api/base/BaseCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Capabilities } from '/imports/api/capability/CapabilityCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';
import { check } from 'meteor/check';

/** @module Events */

/**
 * Events provide event data.
 * @extends module:Base~BaseCollection
 */
class EventCollection extends BaseCollection {

  /**
   * Creates the Events collection.
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
   * Defines a new Event.
   * @example
   * Events.define({ eventName: 'UHM Concert Night',
   *                   createBy: 'Johnson',
   *                   username: 'johnson',
   *                   place: 'Kennedy Theatre.',
   *                   tastes: ['Pop', 'Rock'],
   *                   capabilities: ['Piano', 'Guitar'],
   *                   goals: ['band'],
   *                   startDate: '07/22/2017',
   *                   endDate: '07/22/2017',
   *                   startTime: '12:00 AM',
   *                   endTime: '2:00 AM',
   *                   description: 'BYOB' });
   * @param { Object } description Object with required key username.
   * Username must be unique for all users. It should be the UH email account.
   * tastes, capabilities, goals are array of defined tastes, capabilities, goals names.
   * @returns The newly created docID.
   */
  define({ eventName = '', createBy = '', place = '', tastes, capabilities, goals, description = '',
      startTime = '', endTime = '', startDate = '', endDate = '', username }) {
    // make sure required fields are OK.
    const checkPattern = { eventName: String, createBy: String, place: String, description: String };
    check({ eventName, createBy, place, description }, checkPattern);

    // Throw an error if any of the passed names are not defined.
    Tastes.assertNames(tastes);
    Capabilities.assertNames(capabilities);
    Goals.assertNames(goals);
    return this._collection.insert({ eventName, createBy, place, tastes, capabilities, goals, description,
      username, startTime, endTime, startDate, endDate });
  }

  /**
   * Returns an object representing the Event docID in a format acceptable to define().
   * @param docID The docID of a Event.
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
