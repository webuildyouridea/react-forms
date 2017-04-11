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
  'muub__field': {
    clear: 'both',
    margin: '0 0 1em'
  }
};

var Field = function Field(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className,
      classes = _ref.classes,
      children = _ref.children;

  var cssClass = classes.muub__field + ' ' + className;

  return _react2.default.createElement(
    'div',
    { className: cssClass },
    children
  );
};

Field.propTypes = {
  classes: _react.PropTypes.object,
  children: _react.PropTypes.any
};

exports.default = (0, _reactJss2.default)(style)(Field);