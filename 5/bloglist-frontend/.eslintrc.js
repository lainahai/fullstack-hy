module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 6,
        "ecmaFeatures": {
          "jsx": true
        }
    },
    "plugins": ["react"],
    "extends": [ "eslint:recommended"],
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
        "no-console": 0
    },
    "globals": {
        "test": true,
        "expect": true,
        "describe": true
    }
};