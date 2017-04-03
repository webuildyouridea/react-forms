'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Text input validators', function () {
  var validator = void 0;

  describe('Alphabet validator', function () {
    var VALID_VALUE = 'alex figueroa';
    var INVALID_VALUE = 'al3x figueroa';

    beforeEach(function () {
      validator = _index2.default['alphabet']();
    });

    it('should return true with \'' + VALID_VALUE + '\'', function () {
      var result = validator(VALID_VALUE);
      expect(result).toBeTruthy();
    });

    it('should return false with \'' + INVALID_VALUE + '\'', function () {
      var result = validator(INVALID_VALUE);
      expect(result).toBeFalsy();
    });
  });

  describe('Alphanumeric validator', function () {
    var VALID_VALUE = '2450 street name';
    var INVALID_VALUE = '#2450 street name';

    beforeEach(function () {
      validator = _index2.default['alphanumeric']();
    });

    it('should return true with \'' + VALID_VALUE + '\'', function () {
      var result = validator(VALID_VALUE);
      expect(result).toBeTruthy();
    });

    it('should return false with \'' + INVALID_VALUE + '\'', function () {
      var result = validator(INVALID_VALUE);
      expect(result).toBeFalsy();
    });
  });

  describe('Minimun length validator', function () {
    var MIN_LENGTH = 5;
    var VALID_VALUE = '92154';
    var INVALID_VALUE = '9215';

    beforeEach(function () {
      validator = _index2.default['minLength'](MIN_LENGTH);
    });

    it('should throw error when invalid min length param is passed', function () {
      expect(function () {
        validator = _index2.default['minLength']();
      }).toThrow();

      expect(function () {
        validator = _index2.default['minLength']('five');
      }).toThrow();
    });

    it('should return true with \'' + VALID_VALUE + '\'', function () {
      var result = validator(VALID_VALUE);
      expect(result).toBeTruthy();
    });

    it('should return false with \'' + INVALID_VALUE + '\'', function () {
      var result = validator(INVALID_VALUE);
      expect(result).toBeFalsy();
    });
  });

  describe('Maximum length validator', function () {
    var MAX_LENGTH = 5;
    var VALID_VALUE = '92154';
    var INVALID_VALUE = '92154321';

    beforeEach(function () {
      validator = _index2.default['maxLength'](MAX_LENGTH);
    });

    it('should throw error when invalid max length param is passed', function () {
      expect(function () {
        validator = _index2.default['maxLength']();
      }).toThrow();

      expect(function () {
        validator = _index2.default['maxLength']('five');
      }).toThrow();
    });

    it('should return true with \'' + VALID_VALUE + '\'', function () {
      var result = validator(VALID_VALUE);
      expect(result).toBeTruthy();
    });

    it('should return false with \'' + INVALID_VALUE + '\'', function () {
      var result = validator(INVALID_VALUE);
      expect(result).toBeFalsy();
    });
  });

  describe('Email validator', function () {
    var VALID_VALUE = 'alex@muub.com';
    var INVALID_VALUE = 'alex@muub';

    beforeEach(function () {
      validator = _index2.default['email']();
    });

    it('should return true with \'' + VALID_VALUE + '\'', function () {
      var result = validator(VALID_VALUE);
      expect(result).toBeTruthy();
    });

    it('should return false with \'' + INVALID_VALUE + '\'', function () {
      var result = validator(INVALID_VALUE);
      expect(result).toBeFalsy();
    });
  });

  describe('Numeric validator', function () {
    var VALID_VALUE = '12345';
    var INVALID_VALUE = '12e45';

    beforeEach(function () {
      validator = _index2.default['numeric']();
    });

    it('should return true with \'' + VALID_VALUE + '\'', function () {
      var result = validator(VALID_VALUE);
      expect(result).toBeTruthy();
    });

    it('should return false with \'' + INVALID_VALUE + '\'', function () {
      var result = validator(INVALID_VALUE);
      expect(result).toBeFalsy();
    });
  });
});