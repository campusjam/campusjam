import { Template } from 'meteor/templating';

Template.Capabilities_Form_Field.onRendered(function onRendered() {
  this.$('.dropdown').dropdown();
});

