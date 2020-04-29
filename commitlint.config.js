/**
 *  Edit this code to fit your lint demands:
 */
const scopeEnum = [
  // TODO: add desired scopes here (this is an example)
  "button",
  "checkbox",
  "config",
  "fonts",
  "grid",
  "palette",
  "web-icons",
  "webpack"
];

module.exports = {
  rules: {
    "body-max-line-length": [2, "always", 72],
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [2, "always"],
    "scope-enum": [
      2,
      "always",
      scopeEnum
    ],
    "type-enum": [
      2,
      "always",
      ["chore", "docs", "feat", "fix", "refactor", "revert", "style", "test"]
    ]
  }
};
