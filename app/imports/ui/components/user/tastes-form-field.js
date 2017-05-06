import { Template } from 'meteor/templating';

Template.Tastes_Form_Field.onRendered(function onRendered() {
  this.$('.dropdown').dropdown();
});

