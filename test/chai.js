/**
 * Created by Ben on 7/18/2015.
 */
var chai = require('chai');
chai.config.includeStack = true;

global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;