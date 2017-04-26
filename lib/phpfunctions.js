var crypto = require('crypto');

function strlen(str){
    return str.length;
}

function strpos(string, find){
    return string.indexOf(find);
}

function md5(string, raw){
    var hash = crypto.createHash('md5');
    hash.update(string, 'binary');
    if(raw)
        return hash.digest('binary');
    else
        return hash.digest('hex');
}

function sixCharRandom()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function substr(string, start, count){
    return string.substring(start, start + count);
}

function ord(input){
    var r = input.charCodeAt(0);
    return r;
}

module.exports.ord = ord;
module.exports.substr = substr;
module.exports.sixCharRandom = sixCharRandom;
module.exports.strlen = strlen;
module.exports.strpos = strpos;
module.exports.md5 = md5;
