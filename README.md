# babel-plugin-optimize-starts-with

> Transform startsWith into raw char code tests

## Example

**In**

```js
if ('test'.startsWith('te')) {
  // true
}
```

**Out**

```js
if ('test'.charCodeAt(0) === 116&& 'test'.charCodeAt(1) === 101) {
  // true
}
```

## Installation

```sh
npm install --save-dev babel-plugin-optimize-starts-with
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
      "plugins": ["optimize-starts-with"]
}
```

### Via CLI

```sh
babel --plugins optimize-starts-with script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
      plugins: ["optimize-starts-with"]
});
```
