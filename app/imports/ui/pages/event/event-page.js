import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
// import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Events } from '/imports/api/event/EventCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Capabilities } from '/imports/api/capability/CapabilityCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

export const TimeObject = [{ label: '0:00 AM', value: '0' },
                           { label: '1:00 AM', value: '1' },
                           { label: '2:00 AM', value: '2' },
                           { label: '3:00 AM', value: '3' },
                           { label: '4:00 AM', value: '4' },
                           { label: '5:00 AM', value: '5' },
                           { label: '6:00 AM', value: '6' },
                           { label: '7:00 AM', value: '7' },
                           { label: '8:00 AM', value: '8' },
                           { label: '9:00 AM', value: '9' },
                           { label: '10:00 AM', value: '10' },
                           { label: '11:00 AM', value: '11' },
                           { label: '12:00 PM', value: '12' },
                           { label: '1:00 PM', value: '13' },
                           { label: '2:00 PM', value: '14' },
                           { label: '3:00 PM', value: '15' },
                           { label: '4:00 PM', value: '16' },
                           { label: '5:00 PM', value: '17' },
                           { label: '6:00 PM', value: '18' },
                           { label: '7:00 PM', value: '19' },
                           { label: '8:00 PM', value: '20' },
                           { label: '9:00 PM', value: '21' },
                           { label: '10:00 PM', value: '22' },
                           { label: '11:00 PM', value: '23' }];

Template.Event_Page.onCreated(function onCreated() {
  this.subscribe(Goals.getPublicationName());
  this.subscribe(Capabilities.getPublicationName());
  this.subscribe(Tastes.getPublicationName());
  this.subscribe(Events.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = Events.getSchema().namedContext('Event_Page');
});

Template.Event_Page.helpers({
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
  times() {
    return TimeObject;
  },
  goals() {
    return _.map(Goals.findAll(),
            function makeGoalsObject(goal) {
              return { label: goal.name };
            });
  },
  capabilities() {
    return _.map(Capabilities.findAll(),
            function makeGoalsObject(capability) {
              return { label: capability.name };
            });
  },
  tastes() {
    return _.map(Tastes.findAll(),
            function makeGoalsObject(taste) {
              return { label: taste.name };
            });
  },
});

Template.Event_Page.events({
  'submit .event-data-form'(event, instance) {
    event.preventDefault();
    const eventName = event.target.EventName.value;
    const createBy = event.target.CreateBy.value;
    const place = event.target.Place.value;
    const description = event.target.Description.value;
    const selectedGoals = _.filter(event.target.Goals.selectedOptions, (option) => option.selected);
    const goals = _.map(selectedGoals, (option) => option.value);
    const selectedCapabilities = _.filter(event.target.Capabilities.selectedOptions, (option) => option.selected);
    const capabilities = _.map(selectedCapabilities, (option) => option.value);
    const selectedTastes = _.filter(event.target.Tastes.selectedOptions, (option) => option.selected);
    const tastes = _.map(selectedTastes, (option) => option.value);

    const newEventData = { eventName, createBy, place, description, goals, capabilities, tastes };

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    Events.getSchema().clean(newEventData);
    // Determine validity.
    instance.context.validate(newEventData);

    if (instance.context.isValid()) {
      const id = Events.define(newEventData);
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

