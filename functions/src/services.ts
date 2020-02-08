import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

// const serviceAccount = require('./service_account.json');

// admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'https://mini-netflix-6d04e.firebaseio.com',
// });

admin.initializeApp(functions.config().firebase);

admin.auth().createCustomToken('testuid').then(console.log).catch(console.log);

export default admin;
