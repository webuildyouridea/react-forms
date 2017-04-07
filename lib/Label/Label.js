'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactJss = require('react-jss');

var _reactJss2 = _interopRequireDefault(_reactJss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
  'muub__label': {
    display: 'block',
    margin: '0 0 .28571429rem',
    fontFamily: 'Open Sans, Helvetical, Arial, sans-serif',
    fontSize: '14px',
    textTransform: 'none'
  }
};

var Label = function Label(_ref) {
  var className = _ref.className,
      classes = _ref.classes,
      children = _ref.children,
      _ref$htmlFor = _ref.htmlFor,
      htmlFor = _ref$htmlFor === undefined ? '' : _ref$htmlFor;

  var cssClass = classes.muub__label + ' ' + className;

  return _react2.default.createElement(
    'label',
    { htmlFor: htmlFor, className: cssClass },
    children
  );
};

Label.propTypes = {
  className: _react.PropTypes.string,
  classes: _react.PropTypes.object,
  children: _react.PropTypes.any,
  htmlFor: _react.PropTypes.string
};

exports.default = (0, _reactJss2.default)(style)(Label);