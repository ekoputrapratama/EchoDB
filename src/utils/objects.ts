import { DocumentObject, CollectionProvider } from '../DatabaseProvider';

function isSnapshot(doc) {
  const keys = Object.keys(doc);
  return (
    keys.includes('_document') &&
    keys.includes('_key') &&
    keys.includes('_firestore')
  );
}

export function wrapObject<T>(
  obj,
  collection: CollectionProvider<T> | any
): T & DocumentObject {
  let doc = obj;
  if (isSnapshot(doc)) {
    doc = Object.assign(doc.data(), { id: doc.id });
  }
  return Object.assign(doc, {
    delete: () => {
      if (collection instanceof CollectionProvider)
        return collection.remove({ id: doc.id });
      else return collection.doc(doc.id).delete();
    },
    update: (data) => {
      const id = data.id || doc.id;
      delete data.delete;
      delete data.update;
      delete data.id;
      if (collection instanceof CollectionProvider)
        return collection.update({ id }, data);
      else return collection.doc(id).update(data);
    },
  });
}
