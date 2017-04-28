import { Goals } from '/imports/api/goals/GoalsCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('GoalCollection', function testSuite() {
    const name = 'New Thing';
    const defineObject = { name };

    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Goals.define(defineObject);
      expect(Goals.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Goals.findDoc(docID);
      expect(doc.name).to.equal(name);
      // Check that multiple definitions with the same name fail
      // expect(function foo() { Goals.define(defineObject); }).to.throw(Error);
      // Check that w e can dump and restore a Goal.
      const dumpObject = Goals.dumpOne(docID);
      Goals.removeIt(docID);
      expect(Goals.isDefined(docID)).to.be.false;
      docID = Goals.restoreOne(dumpObject);
      expect(Goals.isDefined(docID)).to.be.true;
      Goals.removeIt(docID);
    });

    it('#findID, #findIDs', function test() {
      const docID = Goals.define(defineObject);
      expect(Goals.isDefined(docID)).to.be.true;
      const docID2 = Goals.findID(name);
      expect(docID).to.equal(docID2);
      Goals.findIDs([name, name]);
      Goals.removeIt(docID);
    });
  });
}

