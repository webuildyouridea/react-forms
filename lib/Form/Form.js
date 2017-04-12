'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactJss = require('react-jss');

var _reactJss2 = _interopRequireDefault(_reactJss);

var _TextInput = require('../TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var style = {
  muub_form: {
    position: 'relative',
    maxWidth: '100%'
  }
};

var Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this._model = {
      isFormValid: true,
      fields: {}
    };
    _this._inputs = {};
    _this._invalidFields = {};

    _this._attachInputToForm = function (textInput) {
      _this._inputs[textInput.props.name] = textInput;
      _this._model.fields[textInput.props.name] = _this._getFieldObjectFromInput(textInput);
    };

    _this._inputDidChange = function (textInput) {
      var name = textInput.props.name;

      var fieldObject = _this._getFieldObjectFromInput(textInput);

      _this._model.fields[name] = fieldObject;

      if (!textInput.state.isValid) {
        _this._invalidFields[name] = fieldObject;
      } else {
        delete _this._invalidFields[name];
      }

      var isFormValid = _this._validateForm();

      if (!_this.props.onChange) return;

      _this.props.onChange(isFormValid, _this._invalidFields, _this._model);
    };

    _this._validateInput = function (textInput) {
      var validators = textInput.validators;

      var isValid = true;

      textInput.state.errors = {};

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = validators[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var validator = _step.value;
          var _textInput$state = textInput.state,
              value = _textInput$state.value,
              isPristine = _textInput$state.isPristine;


          if (!validator.test(value)) {
            // We don't want to add validator errors if user has not typed anything.
            // Only display required errors.
            if (isPristine && validator.name !== 'required') continue;

            isValid = false;
            textInput.state.errors[validator.name] = validator.error;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      textInput.state.isValid = isValid;
      return isValid;
    };

    _this._validateRequiredFields = function () {

      for (var field in _this._inputs) {
        var input = _this._inputs[field];
        if (input.props.required) {
          var isValid = _this._validateInput(input);

          if (!isValid) {
            _this._invalidFields[field] = _this._getFieldObjectFromInput(input);
          } else {
            delete _this._invalidFields[input];
          }

          input.setState({
            isValid: isValid
          });
        }
      }

      return _this._validateForm();
    };

    _this._onSubmit = function (e) {
      e.preventDefault();
      var onSubmit = _this.props.onSubmit;


      _this._validateRequiredFields();

      onSubmit(_this._model);
    };

    return _this;
  }

  _createClass(Form, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        form: {
          attachInputToForm: this._attachInputToForm,
          inputDidChange: this._inputDidChange,
          validateInput: this._validateInput
        }
      };
    }
  }, {
    key: '_validateForm',
    value: function _validateForm() {
      var isFormValid = Object.keys(this._invalidFields).length < 1;

      this._model.isFormValid = isFormValid;

      return isFormValid;
    }
  }, {
    key: '_getFieldObjectFromInput',
    value: function _getFieldObjectFromInput(textInput) {
      var name = textInput.props.name;
      var _textInput$state2 = textInput.state,
          value = _textInput$state2.value,
          isValid = _textInput$state2.isValid,
          isPristine = _textInput$state2.isPristine,
          _textInput$state2$err = _textInput$state2.errors,
          errors = _textInput$state2$err === undefined ? null : _textInput$state2$err;


      return {
        name: name,
        value: value,
        isValid: isValid,
        isPristine: isPristine,
        errors: errors
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$className = _props.className,
          className = _props$className === undefined ? '' : _props$className,
          muub_form = _props.classes.muub_form;


      return _react2.default.createElement(
        'form',
        { className: muub_form + ' ' + className,
          onSubmit: this._onSubmit, noValidate: true },
        this.props.children
      );
    }
  }]);

  return Form;
}(_react2.default.Component);

Form.childContextTypes = {
  form: _react.PropTypes.shape({
    attachInputToForm: _react.PropTypes.func,
    inputDidChange: _react.PropTypes.func,
    validateInput: _react.PropTypes.func
  })
};

exports.default = (0, _reactJss2.default)(style)(Form);