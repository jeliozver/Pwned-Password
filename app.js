const crypto = require('crypto');
const axios = require('axios');

const getPasswordSha1 = (password) => crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
const getNChars = (str, n) => str.slice(0, n);
const checkIfPwned = () => axios({ method, url }).then(res => getResult(null, res)).catch(err => getResult(err, null));
const getResult = (err, res) => {
  if (err) {
    console.log('Something went wrong :(');
    console.log(err);
    return;
  }

  if (res.status === 200) {
    const hashes = res.data.split(/\r\n/);
    let result = 'Your password is safe!!! (for now...)';

    for (const h of hashes) {
      const [hash, count] = h.split(':');
      const currentHash = `${head}${hash}`;
      if (currentHash === hashedPass) {
        result = `Oh no — pwned!\r\nThis password has been seen ${count} times before...`;
        break;
      }
    }

    console.log(result);
  }
};

const password = process.argv[process.argv.length - 1];
const hashedPass = getPasswordSha1(password);
const head = getNChars(hashedPass, 5);
const url = `https://api.pwnedpasswords.com/range/${head}`;
const method = 'get';

checkIfPwned();
