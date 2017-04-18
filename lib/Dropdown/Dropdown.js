'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactJss = require('react-jss');

var _reactJss2 = _interopRequireDefault(_reactJss);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DropdownStyle = require('./Dropdown.style.js');

var _DropdownStyle2 = _interopRequireDefault(_DropdownStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Dropdown = function Dropdown(props) {
  var _props$className = props.className,
      className = _props$className === undefined ? '' : _props$className,
      classes = props.classes,
      placeholder = props.placeholder,
      value = props.value,
      children = props.children,
      sheet = props.sheet,
      otherProps = _objectWithoutProperties(props, ['className', 'classes', 'placeholder', 'value', 'children', 'sheet']);

  var cssClass = classes.muub__dropdown + ' ' + className;

  return _react2.default.createElement(
    'div',
    { className: classes.muub__dropdownContainer },
    _react2.default.createElement(
      'select',
      _extends({ className: (0, _classnames2.default)(cssClass, _defineProperty({}, classes['muub__dropdown--clear'], !value)), value: value }, otherProps),
      _react2.default.createElement(
        'option',
        { value: '' },
        placeholder || 'Select one option'
      ),
      children
    ),
    _react2.default.createElement('div', { className: classes.muub__dropdownArrow })
  );
};

Dropdown.propTypes = {
  value: _react.PropTypes.string,
  className: _react.PropTypes.string,
  classes: _react.PropTypes.object,
  children: _react.PropTypes.any,
  placeholder: _react.PropTypes.string
};

exports.default = (0, _reactJss2.default)(_DropdownStyle2.default)(Dropdown);