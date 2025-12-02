const admin = require("firebase-admin");
const serviceAccount = require("../utils/algenie-new-version-firebase-adminsdk-fbsvc-478a89a802.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;