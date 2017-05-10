/**
 *
 * Created by danli on 5/9/2017.
 */
import { Template } from 'meteor/templating';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { _ } from 'meteor/underscore';

Template.Home_Page.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
});

Template.Home_Page.helpers({

  /**
   * Returns a cursor to profiles, sorted by last name.
   */
  profiles() {
    return _.first(Profiles.findAll(), 4);
  },
});
