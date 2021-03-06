var zeroWithUnitRegex = /^0[\.0]*(?:px|r?em|ex|ch|vh|vw|cm|mm|in|pt|pc|vmin|vmax)/g
var getProperty =  require('./util').getProperty

function formatZeros (value, stylelint) {
  if (getProperty(stylelint, 'length-zero-no-unit') === true) {
    value = value.replace(zeroWithUnitRegex, '0')
  }

  switch (getProperty(stylelint, 'number-leading-zero')) {
    case 'always':
      value = value.replace(/(\D|^)(\.\d+)/g, '$10$2')
      break
    case 'never':
      value = value.replace(/(\D|^)(0)(\.\d+)/g, '$1$3')
      break
  }

  if (getProperty(stylelint, 'number-no-trailing-zeros') === true) {
    value = value.replace(/(\d+)(\.[0-9]*[1-9]+)(0+)/g, '$1$2')
    value = value.replace(/(\d+)(\.0+)(?=\D|$)/g, '$1')
  }

  return value
}

module.exports = formatZeros
