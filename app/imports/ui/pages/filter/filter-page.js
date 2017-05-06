import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Capabilities } from '/imports/api/capability/CapabilityCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';

const selectedInterestsKey = 'selectedInterests';
const selectedGoalsKey = 'selectedGoals';
const selectedCapabilitiesKey = 'selectedCapabilities';
const selectedTastesKey = 'selectedTastes';

Template.Filter_Page.onCreated(function onCreated() {
  this.subscribe(Interests.getPublicationName());
  this.subscribe(Goals.getPublicationName());
  this.subscribe(Capabilities.getPublicationName());
  this.subscribe(Tastes.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(selectedInterestsKey, undefined);
  this.messageFlags.set(selectedGoalsKey, undefined);
  this.messageFlags.set(selectedCapabilitiesKey, undefined);
  this.messageFlags.set(selectedTastesKey, undefined);
});

Template.Filter_Page.helpers({
  profiles() {
    // Initialize selectedInterests to all of them if messageFlags is undefined.
    if (!Template.instance().messageFlags.get(selectedInterestsKey)) {
      Template.instance().messageFlags.set(selectedInterestsKey, _.map(Interests.findAll(), interest => interest.name));
    }
    if (!Template.instance().messageFlags.get(selectedGoalsKey)) {
      Template.instance().messageFlags.set(selectedGoalsKey, _.map(Goals.findAll(), goal => goal.name));
    }
    if (!Template.instance().messageFlags.get(selectedCapabilitiesKey)) {
      Template.instance().messageFlags.set(selectedCapabilitiesKey, _.map(Capabilities.findAll(), capability =>
          capability.name));
    }
    if (!Template.instance().messageFlags.get(selectedTastesKey)) {
      Template.instance().messageFlags.set(selectedTastesKey, _.map(Tastes.findAll(), taste => taste.name));
    }
    // Find all profiles with the currently selected interests.
    const allProfiles = Profiles.findAll();
    const selectedInterests = Template.instance().messageFlags.get(selectedInterestsKey);
    const selectedGoals = Template.instance().messageFlags.get(selectedGoalsKey);
    const selectedCapabilities = Template.instance().messageFlags.get(selectedCapabilitiesKey);
    const selectedTastes = Template.instance().messageFlags.get(selectedTastesKey);
    // return _.filter(allProfiles, profile => _.intersection(profile.interests, selectedInterests, profile.goals,
    // selectedGoals).length > 0);
    const interests1 = _.filter(allProfiles, profile => _.intersection(profile.interests, selectedInterests).length >
    0);
    const goals1 = _.filter(allProfiles, profile => _.intersection(profile.goals, selectedGoals).length > 0);
    const capabilities1 = _.filter(allProfiles, profile => _.intersection(profile.capabilities,
        selectedCapabilities).length > 0);
    const tastes1 = _.filter(allProfiles, profile => _.intersection(profile.tastes, selectedTastes).length > 0);
    return _.intersection(interests1, goals1, capabilities1, tastes1);
  },

  interests() {
    return _.map(Interests.findAll(),
        function makeInterestObject(interest) {
          return {
            label: interest.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedInterestsKey), interest.name),
          };
        });
  },
  goals() {
    return _.map(Goals.findAll(),
        function makeGoalObject(goal) {
          return {
            label: goal.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedGoalsKey), goal.name),
          };
        });
  },
  capabilities() {
    return _.map(Capabilities.findAll(),
        function makeCapabilityObject(capability) {
          return {
            label: capability.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedCapabilitiesKey), capability.name),
          };
        });
  },
  tastes() {
    return _.map(Tastes.findAll(),
        function makeTasteObject(taste) {
          return {
            label: taste.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedTastesKey), taste.name),
          };
        });
  },
});

Template.Filter_Page.events({
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    const selectedOptions = _.filter(event.target.Interests.selectedOptions, (option) => option.selected);
    const selectedOptions2 = _.filter(event.target.Goals.selectedOptions, (option) => option.selected);
    const selectedOptions3 = _.filter(event.target.Capabilities.selectedOptions, (option) => option.selected);
    const selectedOptions4 = _.filter(event.target.Tastes.selectedOptions, (option) => option.selected);
    instance.messageFlags.set(selectedInterestsKey, _.map(selectedOptions, (option) => option.value));
    instance.messageFlags.set(selectedGoalsKey, _.map(selectedOptions2, (option) => option.value));
    instance.messageFlags.set(selectedCapabilitiesKey, _.map(selectedOptions3, (option) => option.value));
    instance.messageFlags.set(selectedTastesKey, _.map(selectedOptions4, (option) => option.value));
  },
});

