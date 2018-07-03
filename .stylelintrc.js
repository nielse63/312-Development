
module.exports = {
  processors: [
    ['@mapbox/stylelint-processor-arbitrary-tags', {
      fileFilterRegex: [/\.vue$/],
    }],
  ],
  extends: 'stylelint-config-recommended-scss',
  rules:   {
    indentation: [2, {
      ignore: ['value'],
    }],
    'color-hex-case':           'lower',
    'color-hex-length':         'short',
    'color-named':              'never',
    'number-leading-zero':      'always',
    'number-no-trailing-zeros': true,
    'string-quotes':            'double',
    'length-zero-no-unit':      true,
    'rule-empty-line-before':   ['always', {
      except: ['first-nested'],
      ignore: ['after-comment'],
    }],
    'no-missing-end-of-source-newline': true,
    'no-empty-source':                  null,
  },
};
