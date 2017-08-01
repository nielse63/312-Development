
module.exports = {
  processors: ["stylelint-processor-html"],
  extends: "stylelint-config-standard",
  rules: {
    "no-empty-source": null,
    "selector-pseudo-element-colon-notation": "single",
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": [
        "include"
      ]
    }]
  },
};
