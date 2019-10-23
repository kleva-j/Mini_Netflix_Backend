import * as admin from 'firebase-admin';

// const serviceAccount = require('./service_account.json');

// admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'https://mini-netflix-6d04e.firebaseio.com',
// });

admin.initializeApp();

admin.auth().createCustomToken('testuid').then(console.log).catch(console.log);

export default {
  admin
};
