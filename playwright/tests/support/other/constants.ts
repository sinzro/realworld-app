/* Add your constants or helpers here */
/* Base configuration before ensures you are setup for doing authentication in tests from CI */

import db from '@root/data/database.json'

export const constants = {
  // values used for proper auth in CI and locally
  // to run the tests locally, the sso pass should be exported to ssoLoginPassword env var

  baseURL: process.env.baseUrl || 'http://localhost:3000/',
  apiURL: process.env.apiUrl || 'http://localhost:3002',

  existingUser: {
    username: process.env.ssoLoginEmail || db.users[0].username,
    userid: process.env.userid || db.users[0].id,
    password: process.env.ssoLoginPassword || 's3cret',
    bankName: db.bankaccounts[0].bankName,
  },
}
