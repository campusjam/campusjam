import { Template } from 'meteor/templating';

Template.Browse_Select_Form_Control.onRendered(function onRendered() {
  this.$('select.dropdown').dropdown();
});
