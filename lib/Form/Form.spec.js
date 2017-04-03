'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _teaspoon = require('teaspoon');

var _teaspoon2 = _interopRequireDefault(_teaspoon);

var _Form = require('./Form.jsx');

var _Form2 = _interopRequireDefault(_Form);

var _TextInput = require('../TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Form component', function () {
  var props = void 0;
  var mountedForm = void 0;

  var form = function form() {
    if (!mountedForm) {
      mountedForm = (0, _teaspoon2.default)(_react2.default.createElement(_Form2.default, props)).render().children().first();
    }

    return mountedForm;
  };

  beforeEach(function () {
    props = {
      onSubmit: jest.fn()
    };
  });

  it('should render a form element', function () {
    var forms = form().find('form');

    expect(forms.length).toBe(1);
  });

  it('should create a model object on component state', function () {
    var formStateModel = form().unwrap()._model;

    expect(formStateModel).toBeDefined();
    expect(formStateModel.isFormValid).toBeTruthy();
  });

  it('should pass onSubmit handler to form element', function () {
    var formElem = form().find('form');

    var onSubmit = formElem.props().onSubmit;

    expect(onSubmit).toBe(form().unwrap()._onSubmit);
  });

  describe('when form is submitted', function () {
    var mockSubmit = jest.fn();

    beforeEach(function () {
      props = {
        onSubmit: mockSubmit
      };

      // Force re render with new props
      mountedForm = null;
    });

    it('should called onSubmit prop function', function () {
      form().trigger('submit');

      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  describe('when it has TextInput children', function () {
    var TEXT_INPUT_NAME = 'email';
    var textInput = null;

    beforeEach(function () {
      var formComponent = form().unwrap();

      textInput = (0, _teaspoon2.default)(_react2.default.createElement(_TextInput2.default, { name: TEXT_INPUT_NAME, value: '' })).render(false, null, {
        form: {
          attachInputToForm: formComponent._attachInputToForm,
          inputDidChange: formComponent._inputDidChange
        }
      }).children().first();
    });

    it('should add the input value to model', function () {
      var formComponent = form().unwrap();

      var expectedFieldObject = {
        name: TEXT_INPUT_NAME,
        value: '',
        isValid: true,
        isPristine: true,
        errors: {}
      };

      expect(formComponent._model.fields[TEXT_INPUT_NAME]).toBeDefined();
      expect(formComponent._model.fields[TEXT_INPUT_NAME]).toEqual(expectedFieldObject);
      expect(formComponent._inputs[TEXT_INPUT_NAME]).toBeDefined();
    });

    describe('when a child TextInput changes', function () {
      it('should update TextInput model value', function () {
        var formComponent = form().unwrap();
        var NEW_VALUE = 'changed';
        textInput.unwrap().state.value = NEW_VALUE;

        formComponent._inputDidChange(textInput.unwrap());

        expect(formComponent._model.fields[TEXT_INPUT_NAME].value).toBe(NEW_VALUE);
      });

      it('should add the field to invalidFields array is TextInput is invalid', function () {
        var formComponent = form().unwrap();
        var expectedFieldObject = {
          value: '',
          isValid: false,
          isPristine: false,
          errors: { required: 'This is field is required' }
        };

        textInput.unwrap().setState(expectedFieldObject);

        formComponent._inputDidChange(textInput.unwrap());
        expectedFieldObject.name = TEXT_INPUT_NAME;

        expect(formComponent._invalidFields[TEXT_INPUT_NAME]).toBeDefined();
        expect(formComponent._invalidFields[TEXT_INPUT_NAME]).toEqual(expectedFieldObject);
      });

      describe('when onChange prop is passed', function () {
        var mockOnChange = jest.fn();

        beforeEach(function () {
          props = {
            onSubmit: jest.fn(),
            onChange: mockOnChange
          };

          mountedForm = null;
        });

        it('should call onChange function', function () {
          var formComponent = form().unwrap();
          var isFormValid = true;
          var invalidFields = {};

          textInput.render(false, null, {
            form: {
              attachInputToForm: formComponent._attachInputToForm,
              inputDidChange: formComponent._inputDidChange
            }
          });

          formComponent._inputDidChange(textInput.unwrap());

          expect(mockOnChange).toHaveBeenCalledWith(isFormValid, invalidFields, formComponent._model);
        });
      });
    });

    describe('when validating an input', function () {

      beforeEach(function () {
        var formComponent = form().unwrap();

        textInput = (0, _teaspoon2.default)(_react2.default.createElement(_TextInput2.default, { name: TEXT_INPUT_NAME, value: 'alex@muub.com',
          validators: { email: true }
        })).render(false, null, {
          form: {
            attachInputToForm: formComponent._attachInputToForm,
            inputDidChange: formComponent._inputDidChange
          }
        }).children().first();
      });

      it('should set valid state prop to true with a valid email', function () {
        var formComponent = form().unwrap();

        var input = textInput.unwrap();

        formComponent._validateInput(input);

        expect(input.state.isValid).toBeTruthy();
        expect(input.state.errors.email).not.toBeDefined();
      });

      it('should set valid state prop to false with a invalid email', function () {
        var formComponent = form().unwrap();

        var input = textInput.unwrap();
        input.state.value = '1234';

        formComponent._validateInput(input);

        expect(input.state.isValid).toBeFalsy();
        expect(input.state.errors.email).toBeDefined();
      });
    });
  });
});