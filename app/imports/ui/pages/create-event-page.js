import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Events } from '/imports/api/event/EventCollection';
import { Interests } from '/imports/api/interest/InterestCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

export const timeList = ['0:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM',
  '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '13:00 PM', '14:00 PM', '15:00 PM', '16:00 PM', '17:00 PM', '18:00 PM',
  '19:00 PM', '20:00 PM', '21:00 PM', '22:00 PM', '23:00 PM'];

Template.Profile_Page.onCreated(function onCreated() {
  this.subscribe(Interests.getPublicationName());
  this.subscribe(Events.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = Events.getSchema().namedContext('Create_Event_Page');
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
  times() {
    return _.map(timeList, function makeTimeObject(time) { return { label: time }; });
  },
  profile() {
    return Events.findDoc(FlowRouter.getParam('username'));
  },
  interests() {
    const profile = Events.findDoc(FlowRouter.getParam('username'));
    const selectedInterests = profile.interests;
    return profile && _.map(Interests.findAll(),
            function makeInterestObject(interest) {
              return { label: interest.name, selected: _.contains(selectedInterests, interest.name) };
            });
  },
});


Template.Create_Event_Page.events({
  'submit .event-data-form'(event, instance) {
    event.preventDefault();
    const eventName = event.target.EventName.value;
    const createBy = event.target.CreateBy.value;
    const place = event.target.Place.value;
    const username = FlowRouter.getParam('username'); // schema requires username.
    const start = event.target.StartTime.value;
    const end = event.target.EndTime.value;
    const description = event.target.Description.value;
    const selectedTastes = _.filter(event.target.Tastes.selectedOptions, (option) => option.selected);
    const tastes = _.map(selectedTastes, (option) => option.value);
    const selectedCap = _.filter(event.target.Capabilities.selectedOptions, (option) => option.selected);
    const capabilities = _.map(selectedCap, (option) => option.value);

    const newEventData = { eventName, createBy, place, start, end, tastes, capabilities, description,
      username };

    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    Events.getSchema().clean(newEventData);
    // Determine validity.
    instance.context.validate(newEventData);

    if (instance.context.isValid()) {
      Events.insert(newEventData);
      instance.messageFlags.set(displayErrorMessages, false);
      FlowRouter.go('Home_Page');
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
