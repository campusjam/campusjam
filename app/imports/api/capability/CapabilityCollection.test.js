import { Capabilities } from '/imports/api/capability/CapabilityCollection';
import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { removeAllEntities } from '/imports/api/base/BaseUtilities';

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('CapabilityCollection', function testSuite() {
    const name = 'Software Engineering';
    const defineObject = { name };

    before(function setup() {
      removeAllEntities();
    });

    after(function teardown() {
      removeAllEntities();
    });

    it('#define, #isDefined, #removeIt, #dumpOne, #restoreOne', function test() {
      let docID = Capabilities.define(defineObject);
      expect(Capabilities.isDefined(docID)).to.be.true;
      // Check that fields are available
      const doc = Capabilities.findDoc(docID);
      expect(doc.name).to.equal(name);
      // Check that multiple definitions with the same name fail
      expect(function foo() { Capabilities.define(defineObject); }).to.throw(Error);
      // Check that we can dump and restore a Capability.
      const dumpObject = Capabilities.dumpOne(docID);
      Capabilities.removeIt(docID);
      expect(Capabilities.isDefined(docID)).to.be.false;
      docID = Capabilities.restoreOne(dumpObject);
      expect(Capabilities.isDefined(docID)).to.be.true;
      Capabilities.removeIt(docID);
    });

    it('#findID, #findIDs', function test() {
      const docID = Capabilities.define(defineObject);
      expect(Capabilities.isDefined(docID)).to.be.true;
      const docID2 = Capabilities.findID(name);
      expect(docID).to.equal(docID2);
      Capabilities.findIDs([name, name]);
      Capabilities.removeIt(docID);
    });
  });
}

