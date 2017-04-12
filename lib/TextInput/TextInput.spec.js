'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _teaspoon = require('teaspoon');

var _teaspoon2 = _interopRequireDefault(_teaspoon);

var _TextInput = require('./TextInput.jsx');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _Form = require('../Form');

var _Form2 = _interopRequireDefault(_Form);

var _TextInputValidators = require('./TextInputValidators');

var _TextInputValidators2 = _interopRequireDefault(_TextInputValidators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('TextInput component', function () {
  var props = void 0;
  var formComponent = void 0;
  var mountedTextInput = void 0;

  var textInput = function textInput() {
    if (!mountedTextInput) {
      formComponent = (0, _teaspoon2.default)(_react2.default.createElement(_Form2.default, { onSubmit: jest.fn() })).render().children().first().unwrap();

      _teaspoon2.default.defaultContext({
        form: {
          attachInputToForm: formComponent._attachInputToForm
        }
      });

      mountedTextInput = (0, _teaspoon2.default)(_react2.default.createElement(_TextInput2.default, props)).render().children().first();
    }

    return mountedTextInput;
  };

  beforeEach(function () {
    props = {
      name: 'email',
      value: ''
    };
  });

  it('should throw error when not used inside Form context', function () {
    expect(function () {
      (0, _teaspoon2.default)(_react2.default.createElement(_TextInput2.default, props)).render(false, null, {});
    }).toThrow();
  });

  it('should render an input element', function () {
    var input = textInput().find('input');

    expect(input.length).toBe(1);
  });

  describe('when validators object is passed', function () {

    beforeEach(function () {
      props = {
        name: 'email',
        value: '',
        validators: {
          email: true
        }
      };

      mountedTextInput = null;
    });

    it('should add the correct validator to validators array', function () {
      var textInputComponent = textInput().unwrap();

      var validators = textInputComponent.validators;

      expect(validators.length).toBe(1);
      expect(validators[0].name).toBe('email');
      expect(validators[0].error).toBe('Invalid value');
      expect(validators[0].test).toBeInstanceOf(Function);
    });

    it('should add map each validator with its error message', function () {
      props.errorMessage = { email: 'Email is invalid' };
      var textInputComponent = textInput().unwrap();

      var validators = textInputComponent.validators;

      expect(validators.length).toBe(1);
      expect(validators[0].name).toBe('email');
      expect(validators[0].error).toBe('Email is invalid');
      expect(validators[0].test).toBeInstanceOf(Function);
    });
  });

  describe('when required prop is passed', function () {

    beforeEach(function () {
      props = {
        name: 'email',
        value: '',
        validators: {
          email: true
        },
        required: true
      };

      mountedTextInput = null;
    });

    it('should add required validator to validators array', function () {
      var textInputComponent = textInput().unwrap();

      var validators = textInputComponent.validators;

      expect(validators.length).toBe(2);
      expect(validators[1].name).toBe('required');
      expect(validators[1].error).toBe('This field is required');
      expect(validators[1].test).toBeInstanceOf(Function);
    });
  });

  describe('when input changes', function () {

    var NEW_VALUE = 'A';
    var EVENT_OBJECT = { target: { value: NEW_VALUE } };
    var mockInputDidChange = void 0;
    var mockValidateInput = void 0;

    beforeEach(function () {
      mockInputDidChange = jest.fn();
      mockValidateInput = jest.fn();

      mountedTextInput = (0, _teaspoon2.default)(_react2.default.createElement(_TextInput2.default, props)).render(false, null, {
        form: {
          attachInputToForm: formComponent._attachInputToForm,
          inputDidChange: mockInputDidChange,
          validateInput: mockValidateInput
        }
      }).children().first();
    });

    it('should update state.value', function () {
      var textInputComponent = textInput();
      textInputComponent.find('input').trigger('change', EVENT_OBJECT);

      expect(textInputComponent.state('value')).toBe(NEW_VALUE);
    });

    it('should call context.form.inputDidChange', function () {
      var textInputComponent = textInput();
      textInputComponent.find('input').trigger('change', EVENT_OBJECT);

      expect(mockInputDidChange).toHaveBeenCalled();
    });

    it('should call context.form.validateInput', function () {
      var textInputComponent = textInput();
      textInputComponent.find('input').trigger('change', EVENT_OBJECT);

      expect(mockValidateInput).toHaveBeenCalled();
    });
  });
});