import React, {PropTypes} from 'react';
import injectSheet from 'react-jss';

const style = {
  'muub__label': {
    display: 'block',
    margin: '0 0 .28571429rem',
    color: 'rgba(0,0,0,.88)',
    fontFamily: 'Helvetical, Arial, sans-serif',
    fontSize: '.92857143em',
    fontWeight: 700,
    textTransform: 'none'
  }
}

const Label = ({classes, children, htmlFor = ''}) => {
  return (
    <label htmlFor={htmlFor} className={classes.muub__label}>
      {children}
    </label>
  )
}

Label.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.any,
  htmlFor: PropTypes.string
}

export default injectSheet(style)(Label);
