
module.exports = {
  rules: {
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/**'],
      env:   {
        jest: true,
      },
    },
  ],
};
