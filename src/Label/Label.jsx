import React, {PropTypes} from 'react';
import injectSheet from 'react-jss';

const style = {
  'muub__label': {
    display: 'block',
    margin: '0 0 .28571429rem',
    fontFamily: 'Open Sans, Helvetical, Arial, sans-serif',
    fontSize: '14px',
    textTransform: 'none'
  }
}

const Label = ({className = '', classes, children, htmlFor = ''}) => {
  const cssClass = `${classes.muub__label} ${className}`;

  return (
    <label htmlFor={htmlFor} className={cssClass}>
      {children}
    </label>
  )
}

Label.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  children: PropTypes.any,
  htmlFor: PropTypes.string
}

export default injectSheet(style)(Label);
