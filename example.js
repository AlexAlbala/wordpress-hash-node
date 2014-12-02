var hasher = require('./hash.js');

var password = 'testpass';
var hash = hasher.HashPassword(password);

console.log("Hash for password: " + password + " is: " + hash);
var check = hasher.CheckPassword(password, hash);
console.log("Password checking results: " + check);