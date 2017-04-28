// /**
//  *
//  * Created by danli on 4/19/2017.
//  */
//
// import { Template } from 'meteor/templating';
// import { ReactiveDict } from 'meteor/reactive-dict';
// import { FlowRouter } from 'meteor/kadira:flow-router';
// import { _ } from 'meteor/underscore';
// import { Profiles } from '/imports/api/profiles/ProfilesCollection';
// // import { Interests } from '/imports/api/interest/InterestsCollection';
// // import { Goals } from '/imports/api/goals/GoalsCollection';
//
// const displaySuccessMessage = 'displaySuccessMessage';
// const displayErrorMessages = 'displayErrorMessages';
//
// Template.My_Profile_Page.onCreated(function onCreated() {
//   // this.subscribe(Interests.getPublicationName());
//   this.subscribe(Profiles.getPublicationName());
//   this.subscribe(Goals.getPublicationName());
//   this.messageFlags = new ReactiveDict();
//   this.messageFlags.set(displaySuccessMessage, false);
//   this.messageFlags.set(displayErrorMessages, false);
//   this.context = Profiles.getSchema().namedContext('My_Profile_Page');
// });
//
// Template.My_Profile_Page.helpers({
//   successClass() {
//     return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
//   },
//   displaySuccessMessage() {
//     return Template.instance().messageFlags.get(displaySuccessMessage);
//   },
//   errorClass() {
//     return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
//   },
//   fieldError(fieldName) {
//     const invalidKeys = Template.instance().context.invalidKeys();
//     const errorObject = _.find(invalidKeys, (keyObj) => keyObj.name === fieldName);
//     return errorObject && Template.instance().context.keyErrorMessage(errorObject.name);
//   },
//   profile() {
//     return Profiles.findDoc(FlowRouter.getParam('username'));;
//   },
//   tastes() {
//     const profile = Profiles.findDoc(FlowRouter.getParam('username'));
//     const selectedTastes = profile.tastes;
//     return profile && _.map(Tastes.findAll(),
//             function makeTastesObject(taste) {
//               return { label: taste.name, selected: _.contains(selectedTastes, taste.name) };
//             });
//   },
//   capabilities() {
//     const profile = Profiles.findDoc(FlowRouter.getParam('username'));
//     const selectedCapabilities = profile.capabilities;
//     return profile && _.map(Capabilities.findAll(),
//             function makeCapabilitiesObject(capability) {
//               return { label: capability.name, selected: _.contains(selectedCapabilities, capability.name) };
//             });
//   },
//   goals() {
//     const profile = Profiles.findDoc(FlowRouter.getParam('username'));
//     const selectedGoals = profile.goals;
//     return profile && _.map(Goals.findAll(),
//             function makeGoalsObject(taste) {
//               return { label: goal.name, selected: _.contains(selectedGoals, goal.name) };
//             });
//   },
// });
//
// Template.My_Profile_Page.events({
//   'submit .profile-data-form'(event, instance) {
//     event.preventDefault();
//     const firstName = event.target.First.value;
//     const lastName = event.target.Last.value;
//     // const username = Meteor.userId(); // schema requires username.
//     const address = event.target.Address.value;
//     const telephone = event.target.Telephone.value;
//     const email = event.target.Email.value;
//     const tastes = event.target.Tastes.value;
//     const capabilities = event.target.Capabilites.value;
//     const goals = event.target.Goals.value;
//     const picture = event.target.Picture.value;
//     const youtube = event.target.youtube.value;
//     const soundcloud = event.target.soundcloud.value;
//     // const selectedInterests = _.filter(event.target.Interests.selectedOptions, (option) => option.selected);
//     // const interests = _.map(selectedInterests, (option) => option.value);
//
//     const updatedProfileData = {
//       firstName,
//       lastName,
//       // username,
//       address,
//       telephone,
//       email,
//       tastes,
//       capabilities,
//       goals,
//       picture,
//       youtube,
//       soundcloud,
//     };
//
//     // Clear out any old validation errors.
//     instance.context.resetValidation();
//     // Invoke clean so that updatedProfileData reflects what will be inserted.
//     Profiles.getSchema().clean(updatedProfileData);
//     // Determine validity.
//     instance.context.validate(updatedProfileData);
//
//     if (instance.context.isValid()) {
//       const docID = Profiles.findDoc(FlowRouter.getParam('username'))._id;      const id = Profiles.update(docID, { $set: updatedProfileData });
//       instance.messageFlags.set(displaySuccessMessage, id);
//       instance.messageFlags.set(displayErrorMessages, false);
//     } else {
//       instance.messageFlags.set(displaySuccessMessage, false);
//       instance.messageFlags.set(displayErrorMessages, true);
//     }
//   },
// });
