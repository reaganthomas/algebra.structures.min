(function() {
  var deepEqual = require('deep-equal');
  var Constructor = require('algebra.structures.constructor').Constructor;

  function inspect(x) {
    if(x === null || x === undefined) return 'null';
    return x.inspect ? x.inspect() : x;
  }

  /**
    Min

    Min is a Monoid, making it also a Semigroup.
    Min implements the empty and concat methods to adhere
    to the Monoid and Semigroup algebras.

    Min only works for numbers or arrays of numbers. Should
    any other values be used the behavior is unspecified.
  **/
  var Min = Constructor(function(value) {
    if(value instanceof Array) {
      this.value = value.reduce(function(acc, val) {
        return (acc < val) ? acc : val;
      }, Infinity);
    } else {
      this.value = value;
    }
  });

  /**
    Min.empty

    Returns an "empty min", otherwise known as Infinity.
  **/
  Min.prototype.empty = function() { return Min(Infinity); };

  /**
    Min.concat

    Returns the min of the two mins.
  **/
  Min.prototype.concat = function(min2) {
    return Min(this.value < min2.value ? this.value : min2.value);
  };

  /**
    Min.inspect

    Returns the string representation of a Min.
  **/
  Min.prototype.inspect = function() { return  'Min(' + inspect(this.value) + ')'; };

  /**
    Min.isEqual

    Compares two mins for equality.
  **/
  Min.prototype.isEqual = function(min2) { return deepEqual(this.value, min2.value); };

  module.exports = Min;
})();
