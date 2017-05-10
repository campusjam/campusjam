import { Template } from 'meteor/templating';
import { Events } from '/imports/api/event/EventCollection';

Template.Home_Page.helpers({

  /**
   * @returns {*} All of the Contact documents.
   */
  eventsList() {
    return Events.find();
  },
});

Template.Home_Page.onCreated(function onCreated() {
  this.subscribe(Events.getPublicationName());
});
