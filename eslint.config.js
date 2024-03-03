// eslint.config.js
import { so1ve } from "@so1ve/eslint-config";

export default so1ve({
	// Without `files`, they are general rules for all files
	files: ["**/*.vue"],
	rules: {
		"padding-line-between-statements": [
			"error",
			{ blankLine: "always", prev: "let", next: "*" },
			{ blankLine: "always", prev: "const", next: "*" },
			{ blankLine: "always", prev: "function", next: "*" },
		],
	},
});
