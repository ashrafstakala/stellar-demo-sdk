const StellarSdk = require('stellar-sdk');
const fetch = require('node-fetch');

// Create keypair
const pair = StellarSdk.Keypair.random();
pair.secret();
pair.publicKey();

// Fund and create account
(async function main() {
  try {
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(
        pair.publicKey(),
      )}`,
    );
    const responseJSON = await response.json();
    console.log('SUCCESS! You have a new account :)\n', responseJSON);
  } catch (e) {
    console.error('ERROR!', e);
  }
})();
