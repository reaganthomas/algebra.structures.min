var assert = require('assert');
var laws = require('algebra.laws');
var Min = require('../lib');

function makeMin(a)     { return new Min(a); }
function makeListMin(a) { return new Min([a]); }

describe('Min', function() {
  describe('Semigroup', function() {
    it('1. Associativity', function() { laws.semigroup.associativity(makeListMin).asTest()(); });
  });

  describe('Monoid', function() {
    it('1. Left Identity',  function() { laws.monoid.leftIdentity(makeMin).asTest()(); });
    it('2. Right Identity', function() { laws.monoid.rightIdentity(makeMin).asTest()(); });
  });

  describe('empty', function() {
    it('should create a Min(0)', function() {
      var min = makeMin(1);
      var min2 = min.empty();
      assert.equal(min2.inspect(), 'Min(Infinity)');
    });
  });

  describe('concat', function() {
    it('should concat mins containing arrays', function() {
      var min = makeMin([-1,0,1]);
      var min2 = makeMin([2,3,4]);
      assert.equal(min.concat(min2).inspect(), 'Min(-1)');
    });

    it('should find min of mins containing single values', function() {
      var min = makeMin(13);
      var min2 = makeMin(-2);
      assert.equal(min.concat(min2).inspect(), 'Min(-2)');
    });
  });

  describe('inspect', function() {
    it('should show value of number', function() {
      var min = makeMin(1);
      assert.equal(min.inspect(), 'Min(1)');
    });

    it('should show value of minimized array', function() {
      var min = makeMin([1,2,3]);
      assert.equal(min.inspect(), 'Min(1)');
    });
  });

  describe('isEqual', function() {
    it('should be true when mins are equal', function() {
      var min = makeMin(1);
      var min2 = makeMin(1);
      assert.equal(min.isEqual(min2), true);
    });

    it('should be false when mins are different', function() {
      var min = makeMin(10);
      var min2 = makeMin(11);
      assert.equal(min.isEqual(min2), false);
    });

    it('should be true for equal arrays', function() {
      var min = makeMin([1,2,3]);
      var min2 = makeMin([1,2,3]);
      assert.equal(min.isEqual(min2), true);
    });

    it('should be true for equal array and value', function() {
      var min = makeMin([1,2,3]);
      var min2 = makeMin(1);
      assert.equal(min.isEqual(min2), true);
    });
  });
});
