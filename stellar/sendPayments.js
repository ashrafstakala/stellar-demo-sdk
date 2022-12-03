var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

// Using Alice account
var sourceKeys = StellarSdk.Keypair.fromSecret(
  'SBPB4STWMA6IZPJUVQPAZFLNMZANEEL7L23M2ZRZ5AT37WV32YNFWAM3',
);

// Sending to the account created in Stellar createAccount.js
var destinationId = 'GCY53ZC7SMJJR2SHGAP5Y7BSGVXKQ4OGZUWZKQBUT5VP6YG62RJEMUAQ';

var transaction;

server
  .loadAccount(destinationId)
  .catch(function (error) {
    if (error instanceof StellarSdk.NotFoundError) {
      throw new Error('The destination account does not exist!');
    } else return error;
  })
  .then(function () {
    return server.loadAccount(sourceKeys.publicKey());
  })
  .then(function (sourceAccount) {
    transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: destinationId,
          asset: StellarSdk.Asset.native(),
          amount: '500',
        }),
      )
      .addMemo(StellarSdk.Memo.text('Test Transaction'))
      .setTimeout(180)
      .build();

    transaction.sign(sourceKeys);

    return server.submitTransaction(transaction);
  })
  .then(function (result) {
    console.log('Success! Results:', result);
  })
  .catch(function (error) {
    console.log('Something went wrong!', error);
  });
