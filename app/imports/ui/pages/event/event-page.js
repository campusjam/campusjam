import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Events } from '/imports/api/event/EventCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Capabilities } from '/imports/api/capability/CapabilityCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

export const TimeObject = [{ label: '12:00 AM', value: '12:00 AM' },
                           { label: '1:00 AM', value: '1:00 AM' },
                           { label: '2:00 AM', value: '2:00 AM' },
                           { label: '3:00 AM', value: '3:00 AM' },
                           { label: '4:00 AM', value: '4:00 AM' },
                           { label: '5:00 AM', value: '5:00 AM' },
                           { label: '6:00 AM', value: '6:00 AM' },
                           { label: '7:00 AM', value: '7:00 AM' },
                           { label: '8:00 AM', value: '8:00 AM' },
                           { label: '9:00 AM', value: '9:00 AM' },
                           { label: '10:00 AM', value: '10:00 AM' },
                           { label: '11:00 AM', value: '11:00 AM' },
                           { label: '12:00 PM', value: '12:00 PM' },
                           { label: '1:00 PM', value: '13:00 PM' },
                           { label: '2:00 PM', value: '14:00 PM' },
                           { label: '3:00 PM', value: '15:00 PM' },
                           { label: '4:00 PM', value: '16:00 PM' },
                           { label: '5:00 PM', value: '17:00 PM' },
                           { label: '6:00 PM', value: '18:00 PM' },
                           { label: '7:00 PM', value: '19:00 PM' },
                           { label: '8:00 PM', value: '20:00 PM' },
                           { label: '9:00 PM', value: '21:00 PM' },
                           { label: '10:00 PM', value: '22:00 PM' },
                           { label: '11:00 PM', value: '23:00 PM' }];

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
    const username = FlowRouter.getParam('username'); // schema requires username.
    const eventName = event.target.EventName.value;
    const createBy = event.target.CreateBy.value;
    const place = event.target.Place.value;
    const description = event.target.Description.value;
    const startDate = event.target.StartDate.value;
    const endDate = event.target.EndDate.value;
    const startTime = event.target.StartTime.value;
    const endTime = event.target.EndTime.value;
    const selectedGoals = _.filter(event.target.Goals.selectedOptions, (option) => option.selected);
    const goals = _.map(selectedGoals, (option) => option.value);
    const selectedCapabilities = _.filter(event.target.Capabilities.selectedOptions, (option) => option.selected);
    const capabilities = _.map(selectedCapabilities, (option) => option.value);
    const selectedTastes = _.filter(event.target.Tastes.selectedOptions, (option) => option.selected);
    const tastes = _.map(selectedTastes, (option) => option.value);

    const newEventData = { eventName, createBy, place, description, goals, capabilities, tastes,
      username, startTime, endTime, startDate, endDate };

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

