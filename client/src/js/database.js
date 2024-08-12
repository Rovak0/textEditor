import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Adding content");
  const jateDb = await openDB('jate', 1); //open jate version 1
  const transactionObj = jateDb.transaction('jate', 'readwrite');
  const store = transactionObj.objectStore('jate');
  //I am not exactly sure what I should be storing
  //I believe it is just text named content
  const request = store.add({content : content});
  const result = await request;
  console.log("Content was saved, ", content);

}
  // console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("Reading all content");
  const jateDb = await openDB('jate', 1); //open jate version 1
  const transactionObj = jateDb.transaction('jate', 'readonly');
  const store = transactionObj.objectStore('jate');
  //I am not exactly sure what I should be storing
  //I believe it is just text named content
  const request = store.getAll();
  const result = await request;
}
  
  // console.error('getDb not implemented');

initdb();
