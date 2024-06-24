module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script",
                "project": "./tsconfig.json"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "simple-import-sort",
        "react-hooks"
    ],
    "ignorePatterns": [".eslintrc.cjs", "node_modules", "dist"],
    "rules": {
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "no-console":"warn",
        "@typescript-eslint/no-explicit-any": "error",
        "react/react-in-jsx-scope": "off"
    }
}
