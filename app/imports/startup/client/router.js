import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name: 'Landing_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Landing_Page' });
  },
});

const userRoutes = FlowRouter.group({
  prefix: '/:username',
  name: 'userRoutes',
});

userRoutes.route('/home', {
  name: 'Home_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Home_Page' });
  },
});

userRoutes.route('/browse', {
  name: 'Browse_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Browse_Page' });
  },
});

userRoutes.route('/my-profile', {
  name: 'My_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'My_Profile_Page' });
  },
});

userRoutes.route('/event', {
  name: 'Create_Event_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Create_Event_Page' });
  },
});


FlowRouter.route('/list', {
  name: 'List_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'List_Stuff_Page' });
  },
});

FlowRouter.route('/add', {
  name: 'Add_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Stuff_Page' });
  },
});

FlowRouter.route('/stuff/:_id', {
  name: 'Edit_Stuff_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Stuff_Page' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};

