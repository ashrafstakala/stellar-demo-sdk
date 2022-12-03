const axios = require('axios');
const accounts = require('../accounts.json');

const fundAccounts = async accounts =>
  await Promise.all(
    accounts.map(
      async account =>
        await axios.get('/friendbot', {
          baseURL: 'https://horizon-testnet.stellar.org',
          params: { addr: account.public },
        }),
    ),
  );

fundAccounts(accounts)
  .then(() => console.log('account funded'))
  .catch(e => {
    console.log(e);
    throw e;
  });
