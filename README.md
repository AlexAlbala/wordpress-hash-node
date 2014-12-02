wordpress-hash-node
===================

phpass library port for nodejs

supports php version 5 or greater

install:

```
$ npm install wordrpress-hash-node
```

usage:

```javascript
var hasher = require('wordpress-hash-node');
var password = 'testPassword';
var hash = hasher.HashPassword(password);
var checked = hasher.CheckPassword(password, hash); //This will return true;
```
