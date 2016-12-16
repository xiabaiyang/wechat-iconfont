// import Firebase from 'firebase/app'
// import 'firebase/database'
// import 'firebase/storage'

// var gcloud = require('gcloud')({
//   projectId: 'iconfont-cfd1d.appspot.com'
// });
// var gcs = gcloud.storage();
// const api = gcs.bucket('iconfont');

// var config = {
//   apiKey: "AIzaSyDuiP-QYEh_kSrbK0gmD87s98rL5smFFUk",
//   authDomain: "iconfont-cfd1d.firebaseapp.com",
//   databaseURL: "https://iconfont-cfd1d.firebaseio.com",
//   storageBucket: "iconfont-cfd1d.appspot.com",
//   messagingSenderId: "305013755336"
// };
// Firebase.initializeApp(config)
// const api = Firebase.database()

import superagent from 'superagent';

const api = superagent;

export default api
