const crypto = require('crypto');

const sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  return hash.digest('hex');
};
const compare = (password, hash, salt) => hash === sha512(password, salt);

module.exports = {
  compare,
};
