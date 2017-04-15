/**
 * Created by danli on 4/14/2017.
 */
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.Cas_Login.events({
  /**
   * Handle the click on the logout link.
   * @param event The click event.
   * @returns {boolean} False.
   */
  'click .cas-logout': function casLogout(event) {
    event.preventDefault();
    Meteor.logout();
    FlowRouter.go('Landing_Page');
    return false;
  },

  /**
   * Handle the click on the login link.
   * @param event The click event.
   * @returns {boolean} False.
   */
  'click .cas-login': function casLogin(event, instance) {
    event.preventDefault();
    const callback = function loginCallback(error) {
      if (error) {
        console.log(error);
      }
    };
    if (Meteor.loginWithCas(callback)) {
      FlowRouter.go('Home_Page');
    }
    return false;
  },
});

// Here's how to do the required initialization for Semantic UI dropdown menus.
Template.Cas_Login.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown({
    action: 'select',
  });
});