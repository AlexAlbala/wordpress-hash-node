var crypto = require('crypto');
var itoa64 = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var iteration_count_log2=8;
var TRUE = true;

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

function crypt_private(password, setting){
	var output = '*0';
	if (substr(setting, 0, 2) == output)
	    output = '*1';

	if (substr(setting, 0, 3) != '$P$')
            return output;

	var count_log2 = strpos(itoa64, setting[3]);
	if (count_log2 < 7 || count_log2 > 30)
	    return output;

	var count = 1 << count_log2;

	var salt = substr(setting, 4, 8);
	if (strlen(salt) != 8)
		return output;

	var hash = md5(salt + "" + password, TRUE);
	do {
	    hash = md5(hash + "" +  password, TRUE);
	} while (--count);

	output = substr(setting, 0, 12);
	output += encode64(hash, 16);
	return output;
}

function strlen(str){
	return str.length;
}

function strpos(string, find){
	var pos = string.indexOf(find);
	return string.indexOf(find);
}

function md5(string, raw){
	var hash = crypto.createHash('md5');
	hash.update(string);
	if(raw)
	    return hash.digest('binary');
	else
	    return hash.digest('hex');	
}

function CheckPassword(password, stored_hash){
	var hash = crypt_private(password, stored_hash);
	return hash == stored_hash;
}

function gensalt_private(input){
	var output = '$P$';
	output += itoa64[Math.min(iteration_count_log2 + 5, 30)];
	output += encode64(input, 6);
	return output;
}

function ord(input){
	var r = input.charCodeAt(0);
        return r;
}

function encode64(input, count)
{
    var output = '';
    var i = 0;
    do {
        var value = ord(input[i++]);
        output += itoa64[value & 0x3f];
        if (i < count)
            value |= ord(input[i]) << 8;
	
	output += itoa64[(value >> 6) & 0x3f];
        
	if (i++ >= count)
	    break;
	
	if (i < count)
	    value |= ord(input[i]) << 16;
	output += itoa64[(value >> 12) & 0x3f];
	if (i++ >= count)
	    break;

	output += itoa64[(value >> 18) & 0x3f];
    } while (i < count);

    return output;
}

function HashPassword(password){
	var salt = gensalt_private(sixCharRandom());
	var hash = crypt_private(password, salt);
	return hash;
}

var mpass = '0ndh0-Mycook';
var stored_hash ='$P$BEHe2D9ZAR6Lf0UeDYBjvWhOxI6EZU0';
var mchecked = CheckPassword(mpass, stored_hash);
console.log("Check password: " + mpass + " with hash: " + stored_hash);
console.log(mchecked);
