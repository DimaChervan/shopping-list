import firebase from "firebase";

const refName = "products"; // moduleName?

const ref = firebase.database().ref(refName);

const fetchProducts = fbRef =>
  fbRef.once("value").then(snap => {
    const val = snap.val();

    return val || {};
  });

export const fetchAllProducts = () => fetchProducts(ref);

export const fetchFilteredProducts = (key, filter) => fetchProducts(ref.orderByChild(key).equalTo(filter));

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
