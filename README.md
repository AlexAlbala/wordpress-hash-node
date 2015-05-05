wordpress-hash-node
===================

Wordpress hashes (phpass library portable hashes) port for nodejs

Based on phpass for php 5 or greater

install:

```
$ npm install wordpress-hash-node
```

usage:

```javascript
var hasher = require('wordpress-hash-node');
var password = 'testPassword';
var hash = hasher.HashPassword(password);
var checked = hasher.CheckPassword(password, hash); //This will return true;
```
