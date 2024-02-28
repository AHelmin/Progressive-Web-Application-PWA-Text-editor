/*
  The idb package being required below provides some syntactic sugar around the methods needed to work with IndexedDB. Yes, the code you see below is actually a "prettier" version of what you would normally have to write. Be thankful. We've only been using the idb package since mid 2022. Before that students had to write this code with no helper methods. These students deserve a medal.
*/
import { openDB } from 'idb';

// We will define a global constant for our database name so we don't mess it up anywhere
const DB_NAME = "jate"

const initdb = async () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_NAME)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(DB_NAME, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Export a function we will use to GET all from the database.
export const putDb = async (content) => {

  // Create a connection to the database database and version we want to use.
  const todoDB = await openDB(DB_NAME, 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = todoDB.transaction(DB_NAME, 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore(DB_NAME);

  // Use the .put() method on the store and update the content.
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

// Export a function we will use to GET all from the database.
export const getDb = async () => {

  // Create a connection to the database database and version we want to use.
  const todoDB = await openDB(DB_NAME, 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = todoDB.transaction(DB_NAME, 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore(DB_NAME);

  // Use the .get() method to get the data for item with id 1.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');

  return result?.value;
};

initdb();
