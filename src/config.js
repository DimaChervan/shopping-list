import firebase from "firebase";

const appName = "productlist-d1127";

const config = {
  apiKey: "AIzaSyC8yeVeaE2Qw-mnMb9jyot52qiO-EQ_SMs",
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: "",
  messagingSenderId: "268172881306"
};

firebase.initializeApp(config);

export default appName;
