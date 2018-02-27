import firebase from "firebase";

const ref = firebase.database().ref("products");

export const fetchAllProducts = () => ref.once("value");

export const fetchFilteredProducts = filter =>
  ref
    .orderByChild("completed")
    .equalTo(filter)
    .once("value");
