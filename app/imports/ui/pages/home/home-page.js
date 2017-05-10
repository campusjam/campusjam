/**
 *
 * Created by danli on 5/9/2017.
 */
import { Template } from 'meteor/templating';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { _ } from 'meteor/underscore';
import { Events } from '/imports/api/event/EventCollection';

Template.Home_Page.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Events.getPublicationName());
});

Template.Home_Page.helpers({
  /**
   * @returns {*} All of the Contact documents.
   */
  eventsList() {
    return Events.find();
  },
  /**
   *@returns a cursor to profiles.
   */
  profiles() {
    return _.first(Profiles.findAll(), 4);
  },
});


