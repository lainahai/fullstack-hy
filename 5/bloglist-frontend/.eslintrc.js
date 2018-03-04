module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "browser": true
    },
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 6
    },
    "ecmaFeatures": {
        "jsx": true
    },
    "plugins": ["react"],
    "extends": [ "eslint:recommended", "plugin:react/recommended"],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "eqeqeq": "error",
        "no-console": 0,
        "react/prop-types": 0
    },
    "globals": {
        "test": true,
        "expect": true,
        "describe": true
    },
    "parser": "babel-eslint"
};