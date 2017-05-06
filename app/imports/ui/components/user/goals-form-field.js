import { Template } from 'meteor/templating';

Template.Goals_Form_Field.onRendered(function onRendered() {
  this.$('.dropdown').dropdown();
});

