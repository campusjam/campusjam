/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

import { Profiles } from '/imports/api/profiles/ProfilesCollection';
// import { Interests } from '/imports/api/goal/InterestCollection';
import { Goals } from '/imports/api/goals/GoalsCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

if (Meteor.isServer) {
  describe('ProfileCollection', function testSuite() {
    const goalsName = 'Star';
    const firstName = 'Philip';
    const lastName = 'Johnson';
    const address = '2500 Campus Rd. Honolulu, HI 96822';
    const telephone = '080-956-3489';
    const email = 'johnson@hawaii.edu';
    const goals = [goalsName];
    // const picture = 'http://philipmjohnson.org/headshot.jpg';
    const youtube = 'http://github.com/philipjohnson';
    const soundcloud = 'http://github.com/philipjohnson';
    const defineObject = { firstName, lastName, username, address, telephone, email, goals, youtube, soundcloud };

    before(function setup() {
      removeAllEntities();
      // Define a sample goal.
      Goals.define({ name: goalsName});
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
      expect(doc.address).to.equal(address);
      expect(doc.telephone).to.equal(telephone);
      expect(doc.email).to.equal(email);
      expect(doc.goals[0]).to.equal(goalsName);
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

