// @flow

import React from 'react';
import injectSheet from 'react-jss';
import styles from '../TextInput/TextInput.style.js';
import classNames from 'classnames';
import {TextInput} from '../TextInput/TextInput.jsx';

class TextArea extends TextInput {
  constructor(props) {
    super(props);
  }

  render() {
    const {name,
      value,
      className,
      onChange,
      validators,
      errorMessage,
      hideErrors,
      classes,
      sheet, // dont include props added by react-jss
      ...otherProps
    } = this.props;
    const {errors, shouldHideErrors} = this.state;

    const errorsKeys = errors ? Object.keys(errors) : [];

    return (
      <div className={classes.muub__inputContainer}>
        <textarea name={name}
          className={classNames(classes.muub__input, {
            [classes.muub__textArea]: true,
            [className]: true,
            [classes.muub__invalidInput]: !this.state.isValid
          })}
          value={value}
          onChange={this._onChange}
          onBlur={this._onBlur}
          {...otherProps}
        />
        {
          !shouldHideErrors && errorsKeys.length > 0 && errorsKeys.map((key, index) => {
            return (
              <span className={classes.muub__inputError} key={index}>
                {errors ? errors[key] : null}
              </span>
            )
          })
        }
      </div>
    )
  }
}

export default injectSheet(styles)(TextArea);
