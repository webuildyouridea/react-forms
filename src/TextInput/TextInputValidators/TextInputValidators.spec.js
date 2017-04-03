import textInputValidators from './index';

describe('Text input validators', () => {
  let validator;

  describe('Alphabet validator', () => {
    const VALID_VALUE = 'alex figueroa';
    const INVALID_VALUE = 'al3x figueroa';

    beforeEach(() => {
      validator = textInputValidators['alphabet']();
    });

    it(`should return true with '${VALID_VALUE}'`, () => {
      const result = validator(VALID_VALUE);
      expect(result).toBeTruthy();
    });

    it(`should return false with '${INVALID_VALUE}'`, () => {
      const result = validator(INVALID_VALUE);
      expect(result).toBeFalsy();
    });
  });

  describe('Alphanumeric validator', () => {
    const VALID_VALUE = '2450 street name';
    const INVALID_VALUE = '#2450 street name';

    beforeEach(() => {
      validator = textInputValidators['alphanumeric']();
    });

    it(`should return true with '${VALID_VALUE}'`, () => {
      const result = validator(VALID_VALUE);
      expect(result).toBeTruthy();
    });

    it(`should return false with '${INVALID_VALUE}'`, () => {
      const result = validator(INVALID_VALUE);
      expect(result).toBeFalsy();
    });
  });

  describe('Minimun length validator', () => {
    const MIN_LENGTH = 5;
    const VALID_VALUE = '92154';
    const INVALID_VALUE = '9215';

    beforeEach(() => {
      validator = textInputValidators['minLength'](MIN_LENGTH);
    });

    it('should throw error when invalid min length param is passed', () => {
      expect(() => {
        validator = textInputValidators['minLength']();
      }).toThrow();

      expect(() => {
        validator = textInputValidators['minLength']('five');
      }).toThrow();
    });

    it(`should return true with '${VALID_VALUE}'`, () => {
      const result = validator(VALID_VALUE);
      expect(result).toBeTruthy();
    });

    it(`should return false with '${INVALID_VALUE}'`, () => {
      const result = validator(INVALID_VALUE);
      expect(result).toBeFalsy();
    });
  });

  describe('Maximum length validator', () => {
    const MAX_LENGTH = 5;
    const VALID_VALUE = '92154';
    const INVALID_VALUE = '92154321';

    beforeEach(() => {
      validator = textInputValidators['maxLength'](MAX_LENGTH);
    });

    it('should throw error when invalid max length param is passed', () => {
      expect(() => {
        validator = textInputValidators['maxLength']();
      }).toThrow();

      expect(() => {
        validator = textInputValidators['maxLength']('five');
      }).toThrow();
    });

    it(`should return true with '${VALID_VALUE}'`, () => {
      const result = validator(VALID_VALUE);
      expect(result).toBeTruthy();
    });

    it(`should return false with '${INVALID_VALUE}'`, () => {
      const result = validator(INVALID_VALUE);
      expect(result).toBeFalsy();
    });
  });

  describe('Email validator', () => {
    const VALID_VALUE = 'alex@muub.com';
    const INVALID_VALUE = 'alex@muub';

    beforeEach(() => {
      validator = textInputValidators['email']();
    });

    it(`should return true with '${VALID_VALUE}'`, () => {
      const result = validator(VALID_VALUE);
      expect(result).toBeTruthy();
    });

    it(`should return false with '${INVALID_VALUE}'`, () => {
      const result = validator(INVALID_VALUE);
      expect(result).toBeFalsy();
    });
  });

  describe('Numeric validator', () => {
    const VALID_VALUE = '12345';
    const INVALID_VALUE = '12e45';

    beforeEach(() => {
      validator = textInputValidators['numeric']();
    });

    it(`should return true with '${VALID_VALUE}'`, () => {
      const result = validator(VALID_VALUE);
      expect(result).toBeTruthy();
    });

    it(`should return false with '${INVALID_VALUE}'`, () => {
      const result = validator(INVALID_VALUE);
      expect(result).toBeFalsy();
    });
  });
});
