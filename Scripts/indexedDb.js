// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || { READ_WRITE: "readwrite" }; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)


if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}


var request = window.indexedDB.open("MyTestDatabase", 3);

var db;
var request = indexedDB.open("MyTestDatabase");

request.onerror = function(event) {
    alert("Why didn't you allow my web app to use IndexedDB?!");
};

request.onsuccess = function(event) {
    db = event.target.result;
};

db.onerror = function(event) {
  	// Generic error handler for all errors targeted at this database's
  	// requests!
  	console.log("Database error: " + event);
};