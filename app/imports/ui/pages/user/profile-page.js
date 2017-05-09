import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Capabilities } from '/imports/api/capability/CapabilityCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.Profile_Page.onCreated(function onCreated() {
  this.subscribe(Goals.getPublicationName());
  this.subscribe(Capabilities.getPublicationName());
  this.subscribe(Tastes.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = Profiles.getSchema().namedContext('Profile_Page');
});

Template.Profile_Page.helpers({
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  fieldError(fieldName) {
    const invalidKeys = Template.instance().context.invalidKeys();
    const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
    return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
  },
  profile() {
    return Profiles.findDoc(FlowRouter.getParam('username'));
  },
  goals() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedGoals = profile.goals;
    return profile && _.map(Goals.findAll(),
            function makeGoalsObject(goal) {
              return { label: goal.name, selected: _.contains(selectedGoals, goal.name) };
            });
  },
  capabilities() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedCapabilities = profile.capabilities;
    return profile && _.map(Capabilities.findAll(),
            function makeGoalsObject(capability) {
              return { label: capability.name, selected: _.contains(selectedCapabilities, capability.name) };
            });
  },
  tastes() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedTastes = profile.tastes;
    return profile && _.map(Tastes.findAll(),
            function makeGoalsObject(taste) {
              return { label: taste.name, selected: _.contains(selectedTastes, taste.name) };
            });
  },
});

Template.Profile_Page.events({
  'submit .profile-data-form'(event, instance) {
    event.preventDefault();
    const firstName = event.target.First.value;
    const lastName = event.target.Last.value;
    const title = event.target.Title.value;
    const username = FlowRouter.getParam('username'); // schema requires username.
    const picture = event.target.Picture.value;
    const youtube = event.target.Youtube.value;
    const soundcloud = event.target.Soundcloud.value;
    const selectedGoals = _.filter(event.target.Goals.selectedOptions, (option) => option.selected);
    const goals = _.map(selectedGoals, (option) => option.value);
    const selectedCapabilities = _.filter(event.target.Capabilities.selectedOptions, (option) => option.selected);
    const capabilities = _.map(selectedCapabilities, (option) => option.value);
    const selectedTastes = _.filter(event.target.Tastes.selectedOptions, (option) => option.selected);
    const tastes = _.map(selectedTastes, (option) => option.value);

    const updatedProfileData = { firstName, lastName, title, picture, youtube, soundcloud, goals, capabilities, tastes,
      username };

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    Profiles.getSchema().clean(updatedProfileData);
    // Determine validity.
    instance.context.validate(updatedProfileData);

    if (instance.context.isValid()) {
      const docID = Profiles.findDoc(FlowRouter.getParam('username'))._id;
      const id = Profiles.update(docID, { $set: updatedProfileData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

