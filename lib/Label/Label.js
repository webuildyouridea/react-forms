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
    color: 'rgba(0,0,0,.87)',
    fontFamily: 'Helvetical, Arial, sans-serif',
    fontSize: '.92857143em',
    fontWeight: 700,
    textTransform: 'none'
  }
};

var Label = function Label(_ref) {
  var classes = _ref.classes,
      children = _ref.children,
      _ref$htmlFor = _ref.htmlFor,
      htmlFor = _ref$htmlFor === undefined ? '' : _ref$htmlFor;

  return _react2.default.createElement(
    'label',
    { htmlFor: htmlFor, className: classes.muub__label },
    children
  );
};

Label.propTypes = {
  classes: _react.PropTypes.object,
  children: _react.PropTypes.any,
  htmlFor: _react.PropTypes.string
};

exports.default = (0, _reactJss2.default)(style)(Label);