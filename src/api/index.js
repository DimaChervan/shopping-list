import firebase from "firebase";

const refName = "products"; // moduleName?

const ref = firebase.database().ref(refName);

export const fetchAllProducts = () => {
  ref.once("value").then(snap => {
    const val = snap.val();

    return val || {};
  });
};

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

const addChildEventListener = (eventType, emit) => {
  ref.on(eventType, snap => {
    emit({
      id: snap.key,
      ...snap.val()
    });
  });

  return () => ref.off(eventType);
};

export const onProductAdd = emit => addChildEventListener("child_added", emit);

export const onProductChanged = emit => addChildEventListener("child_changed", emit);

export const onProductRemoved = emit => addChildEventListener("child_removed", emit);
