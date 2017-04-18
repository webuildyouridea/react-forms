
export default {
  'muub__dropdownContainer': {
    position: 'relative',
    width: '100%'
  },

  'muub__dropdown': {
    margin: 0,
    outline: 0,
    lineHeight: '1.21428571em',
    padding: '11px 30px 11px 24px',
    fontSize: '14px',
    background: '#fff',
    border: '1px solid rgba(34,36,38,.15)',
    color: 'rgba(0,0,0,.87)',
    transition: 'color .1s ease,border-color .1s ease',
    width: '100%',
    verticalAlign: 'top',
    boxSizing: 'border-box',
    borderRadius: 0,
    '-webkit-appearance': 'none',
    '-webkit-border-radius': 0
  },

  'muub__dropdown--clear': {
    color: '#999999'
  },

  'muub__dropdownArrow': {
    content: '',
    position: 'absolute',
    top: 'calc(50% - 2.5px)',
    right: '24px',
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: '5px solid #000'
  }
}
