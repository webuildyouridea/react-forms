import React, {PropTypes} from 'react';
import injectSheet from 'react-jss';

const style = {
  'muub__field': {
    clear: 'both',
    margin: '0 0 1em'
  }
}

const Field = ({classes, children}) => {
  return (
    <div className={classes.muub__field}>
      {children}
    </div>
  )
}

Field.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.any
}

export default injectSheet(style)(Field);
