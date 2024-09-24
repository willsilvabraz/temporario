var admin = require("firebase-admin");

var serviceAccount = require("./Firebase-config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://clinica-4a4d8-default-rtdb.firebaseio.com"
});

module.exports = { admin };