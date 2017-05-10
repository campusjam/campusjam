<<<<<<< HEAD
/**
 *
 * Created by danli on 5/9/2017.
 */
import { Template } from 'meteor/templating';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { _ } from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Events } from '/imports/api/event/EventCollection';


Template.Home_Page.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Events.getPublicationName());
  this.context = Profiles.getSchema().namedContext('Home_Page');
});

Template.Home_Page.helpers({

  /**
   * Returns a cursor to profiles, sorted by last name.
   */
  profiles() {
    return _.first(Profiles.findAll(), 4);
  },
  myProfile() {
    return Profiles.findDoc(FlowRouter.getParam('username'));
  },
  events() {
    return Events.find({}, { sort: { eventName: 1 } });
  },
});
