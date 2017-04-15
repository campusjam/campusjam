import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

// The Header menu does not use dropdown menus, but most menus do.
// Here's how to do the required initialization for Semantic UI dropdown menus.
Template.Header.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown();
});

Template.Header.helpers({
  /**
   * @returns {String} Returns the user who's logged in
   */
  user: function user() {
    return Meteor.user() ? Meteor.user().profile.name : 'No logged in user';
  },
});