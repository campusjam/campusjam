import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

/* Validate username, sending a specific error message on failure. */

if (!Meteor.settings.cas) {
  console.log('CAS settings not found! Hint: "meteor --settings ../config/settings.development.json"');
}
