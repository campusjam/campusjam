/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Capabilities } from '/imports/api/capability/CapabilityCollection';
import { Tastes } from '/imports/api/taste/TasteCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

if (Meteor.isServer) {
  describe('ProfileCollection', function testSuite() {
    const goalName = 'Engineering';
    const capabilityName = 'Piano';
    const tasteName = 'Jazz';
    const firstName = 'Philip';
    const lastName = 'Johnson';
    const username = 'johnson';
    const goals = [goalName];
    const capabilities = [capabilityName];
    const tastes = [tasteName];
    const picture = 'http://philipmjohnson.org/headshot.jpg';
    const title = 'Professor Computer Science';
    const youtube = 'http://youtube.com/philipjohnson';
    const soundcloud = 'http://github.com/philipjohnson';
    const defineObject = { firstName, lastName, username, goals, capabilities, tastes, picture, title,
      youtube, soundcloud };

    before(function setup() {
      removeAllEntities();
      // Define a sample interest.
      Goals.define({ name: goalName });
      Capabilities.define({ name: capabilityName });
      Tastes.define({ name: tasteName });
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Profiles.define(defineObject);
      expect(Profiles.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Profiles.findDoc(docID);
      expect(doc.firstName).to.equal(firstName);
      expect(doc.lastName).to.equal(lastName);
      expect(doc.username).to.equal(username);
      expect(doc.goals[0]).to.equal(goalName);
      expect(doc.capabilities[0]).to.equal(capabilityName);
      expect(doc.tastes[0]).to.equal(tasteName);
      expect(doc.picture).to.equal(picture);
      expect(doc.title).to.equal(title);
      expect(doc.youtube).to.equal(youtube);
      expect(doc.soundcloud).to.equal(soundcloud);
      // Check that multiple definitions with the same email address fail
      expect(function foo() { Profiles.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Profile.
      const dumpObject = Profiles.dumpOne(docID);
      Profiles.removeIt(docID);
      expect(Profiles.isDefined(docID)).to.be.false;
      docID = Profiles.restoreOne(dumpObject);
      expect(Profiles.isDefined(docID)).to.be.true;
      Profiles.removeIt(docID);
    });
  });
}

