import firebase from "firebase";

const refName = "products"; // moduleName?

const ref = firebase.database().ref(refName);

export const fetchAllProducts = () => ref.once("value");

export const fetchFilteredProducts = (key, filter) =>
  ref
    .orderByChild(key)
    .equalTo(filter)
    .once("value");

export const saveProduct = product => ref.push(product);

export const deleteProduct = product => ref.update(product);

export const toggleProduct = (id, product) =>
  firebase
    .database()
    .ref(`${refName}/${id}`)
    .update(product);

// add new method to get data object
/* 
ref.on("value", function(snapshot) {
  console.log("value");
  console.log(snapshot);
  console.log(snapshot.val());
}); 
const startKey = ref.push().key;
ref
  .orderByKey()
  .startAt(startKey)
  .on("child_added", function(snapshot) {
    console.log("added");
    console.log(snapshot);
    console.log(snapshot.val());
  });

ref.on("child_changed", function(snapshot) {
  console.log("changed");
  console.log(snapshot);
  console.log(snapshot.val());
});

ref.on("child_removed", function(snapshot) {
  console.log("removed");
  console.log(snapshot);
  console.log(snapshot.val());
});
*/
