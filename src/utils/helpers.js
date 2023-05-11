const createHash = require('crypto').createHash;

const hash = (txt) => {
    return createHash('sha1').update(txt).digest('hex');
}

exports.hashPassword = hash;