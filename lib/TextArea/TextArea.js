'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactJss = require('react-jss');

var _reactJss2 = _interopRequireDefault(_reactJss);

var _TextInputStyle = require('../TextInput/TextInput.style.js');

var _TextInputStyle2 = _interopRequireDefault(_TextInputStyle);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _TextInput2 = require('../TextInput/TextInput');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextArea = function (_TextInput) {
  _inherits(TextArea, _TextInput);

  function TextArea(props) {
    _classCallCheck(this, TextArea);

    return _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).call(this, props));
  }

  _createClass(TextArea, [{
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          name = _props.name,
          value = _props.value,
          onChange = _props.onChange,
          validators = _props.validators,
          errorMessage = _props.errorMessage,
          hideErrors = _props.hideErrors,
          classes = _props.classes,
          sheet = _props.sheet,
          otherProps = _objectWithoutProperties(_props, ['name', 'value', 'onChange', 'validators', 'errorMessage', 'hideErrors', 'classes', 'sheet']);

      var _state = this.state,
          errors = _state.errors,
          shouldHideErrors = _state.shouldHideErrors;


      var errorsKeys = errors ? Object.keys(errors) : [];

      return _react2.default.createElement(
        'div',
        { className: classes.muub__inputContainer },
        _react2.default.createElement('textarea', _extends({ name: name,
          className: (0, _classnames2.default)(classes.muub__input, (_classNames = {}, _defineProperty(_classNames, classes.muub__textArea, true), _defineProperty(_classNames, classes.muub__invalidInput, !this.state.isValid), _classNames)),
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

  return TextArea;
}(_TextInput2.TextInput);

exports.default = (0, _reactJss2.default)(_TextInputStyle2.default)(TextArea);