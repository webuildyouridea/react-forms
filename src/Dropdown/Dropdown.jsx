import React, {PropTypes} from 'react';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import style from './Dropdown.style.js';

const Dropdown = props => {
  const {
    className = '',
    classes,
    placeholder,
    value,
    children,
    sheet,
    ...otherProps
  } = props;
  const cssClass = `${classes.muub__dropdown} ${className}`;

  return (
    <div className={classes.muub__dropdownContainer}>
      <select className={classNames(cssClass, {
        [classes['muub__dropdown--clear']]: !value
      })} value={value} {...otherProps}>
        <option value="">{placeholder || 'Select one option'}</option>
        {children}
      </select>
      <div className={classes.muub__dropdownArrow}></div>
    </div>
  )
}

Dropdown.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  classes: PropTypes.object,
  children: PropTypes.any,
  placeholder: PropTypes.string
}

export default injectSheet(style)(Dropdown);
