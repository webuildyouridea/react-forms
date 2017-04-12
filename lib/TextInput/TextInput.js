'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextInputValidators = require('./TextInputValidators');

var _TextInputValidators2 = _interopRequireDefault(_TextInputValidators);

var _reactJss = require('react-jss');

var _reactJss2 = _interopRequireDefault(_reactJss);

var _TextInputStyle = require('./TextInput.style.js');

var _TextInputStyle2 = _interopRequireDefault(_TextInputStyle);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextInput = function (_React$Component) {
  _inherits(TextInput, _React$Component);

  function TextInput(props) {
    _classCallCheck(this, TextInput);

    var _this = _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call(this, props));

    _this.validators = [];

    _this._onChange = function (e) {
      var value = e.target.value;
      var _this$context$form = _this.context.form,
          inputDidChange = _this$context$form.inputDidChange,
          validateInput = _this$context$form.validateInput;


      _this.setState({
        value: value,
        isPristine: false
      }, function () {
        validateInput(_this);
        inputDidChange(_this);
      });

      if (_this.props.onChange) {
        _this.props.onChange(e);
      }
    };

    _this._onBlur = function (e) {
      _this._onChange(e);

      if (_this.props.onBlur) {
        _this.props.onBlur(e);
      }
    };

    _this.state = {
      value: props.value || '',
      isValid: true,
      isPristine: true,
      errors: {},
      shouldHideErrors: props.hideErrors || false
    };

    _this._setValidators(props.validators);
    return _this;
  }

  _createClass(TextInput, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!this.context.form) {
        throw new Error('TextInput: component should be inside a react-forms Form component');
      }

      this.context.form.attachInputToForm(this);
    }
  }, {
    key: '_setValidators',
    value: function _setValidators(validators) {
      var error = this.props.errorMessage;

      if (typeof validators === 'function') {

        if (typeof error !== 'string') {
          console.warn('TextInput: "errorMessage" prop should be string when validator is a custom function');
          error = 'Invalid value';
        }
        return this.validators.push({ name: 'default', error: error, test: validators });
      }

      for (var validator in validators) {
        var _errorMessage = typeof error === 'string' ? error : error[validator];

        this.validators.push({
          name: validator,
          error: _errorMessage,
          test: _TextInputValidators2.default[validator](validators[validator]) });
      }

      if (this.props.required) {
        var requiredError = 'This field is required';
        requiredError = (typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object' ? error['required'] || requiredError : requiredError;

        this.validators.push({
          name: 'required',
          error: requiredError,
          test: function test(value) {
            return value !== '';
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          name = _props.name,
          type = _props.type,
          value = _props.value,
          onChange = _props.onChange,
          validators = _props.validators,
          errorMessage = _props.errorMessage,
          hideErrors = _props.hideErrors,
          classes = _props.classes,
          sheet = _props.sheet,
          otherProps = _objectWithoutProperties(_props, ['name', 'type', 'value', 'onChange', 'validators', 'errorMessage', 'hideErrors', 'classes', 'sheet']);

      var _state = this.state,
          errors = _state.errors,
          shouldHideErrors = _state.shouldHideErrors;


      var errorsKeys = errors ? Object.keys(errors) : [];

      return _react2.default.createElement(
        'div',
        { className: classes.muub__inputContainer },
        _react2.default.createElement('input', _extends({ name: name,
          type: type || 'text',
          className: (0, _classnames2.default)(classes.muub__input, _defineProperty({}, classes.muub__invalidInput, !this.state.isValid)),
          value: this.state.value,
          onChange: this._onChange,
          onBlur: this._onBlur
        }, otherProps)),
        !shouldHideErrors && errorsKeys.length > 0 && errorsKeys.map(function (key, index) {
          return _react2.default.createElement(
            'span',
            { className: classes.muub__inputError, key: index },
            errors ? errors[key] : null
          );
        })
      );
    }
  }]);

  return TextInput;
}(_react2.default.Component);

TextInput.defaultProps = {
  value: '',
  errorMessage: 'Invalid value'
};


TextInput.contextTypes = {
  form: _react.PropTypes.shape({
    attachInputToForm: _react.PropTypes.func
  })
};

exports.default = (0, _reactJss2.default)(_TextInputStyle2.default)(TextInput);