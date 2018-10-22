const messageFeed = [
      { id: "00-01", name: "khalid", age: 35, email: "khalid@swe.com" },
      { id: "00-02", name: "prasad", age: 32, email: "prasad@finn.com" }
   ];
//IndexedDB
//prefixes of implementation that we want to test
//prefixes of implementation that we want to test
         window.indexedDB = window.indexedDB || window.mozIndexedDB ||
         window.webkitIndexedDB || window.msIndexedDB;

         //prefixes of window.IDB objects
         window.IDBTransaction = window.IDBTransaction ||
         window.webkitIDBTransaction || window.msIDBTransaction;
         window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange ||
         window.msIDBKeyRange

         if (!window.indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB.")
         }
         var db;
         var request = window.indexedDB.open("newDatabase", 1);

         request.onerror = function(event) {
            console.log("error: ");
         };

         request.onsuccess = function(event) {
            db = request.result;
            console.log("success: "+ db);
         };

         request.onupgradeneeded = function(event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore("employee", {keyPath: "id"});

            for (var i in messageFeed) {
               objectStore.add(messageFeed[i]);
            }
         }

         function read() {
            var transaction = db.transaction(["employee"]);
            var objectStore = transaction.objectStore("employee");
            var request = objectStore.get("00-03");

            request.onerror = function(event) {
               alert("Unable to retrieve daa from database!");
            };

            request.onsuccess = function(event) {
               // Do something with the request.result!
               if(request.result) {
                  alert("Name: " + request.result.name + ",Age: " + request.result.age + ", Email: " + request.result.email);
               } else {
                  alert("Kenny couldn't be found in your database!");
               }
            };
         }

         function readAll() {
            var objectStore = db.transaction("employee").objectStore("employee");

            objectStore.openCursor().onsuccess = function(event) {
               var cursor = event.target.result;

               if (cursor) {
                  alert("Name for id " + cursor.key + " is " + cursor.value.name +
                  ",Age: " + cursor.value.age + ", Email: " + cursor.value.email);
                  cursor.continue();
               } else {
                  alert("No more entries!");
               }
            };
         }

         function add() {
            var request = db.transaction(["employee"], "readwrite")
            .objectStore("employee")
            .add({ id: "00-03", name: "Kenny", age: 19, email: "kenny@planet.org" });

            request.onsuccess = function(event) {
               alert("Kenny has been added to your database.");
            };

            request.onerror = function(event) {
               alert("Unable to add data\r\nKenny is aready exist in your database! ");
            }
         }

         function remove() {
            var request = db.transaction(["employee"], "readwrite")
            .objectStore("employee")
            .delete("00-03");

            request.onsuccess = function(event) {
               alert("Kenny's entry has been removed from your database.");
            };
         }

// message db;
//global veriables
let inputName = document.querySelector('input[type="text"]');
let inputEmail = document.querySelector('input[type="email"]');
let inputMessage = document.querySelector('textarea');
let msgBtn = document.querySelector('button');
let messageDB = [];

msgBtn.addEventListener("click",() => {;
  console.log(inputName.value + " " + inputEmail.value + " " + inputMessage.value);
  addMessage(inputName.value, inputEmail.value, inputMessage.value);
});

// factory Pattern for message creating;
function addMessage(name, email, textMessage){
  let timeNow = new Date();
    messageobj = {
    name,
    email,
    textMessage,
    messageTime: {
      date: timeNow.toDateString(),
      clock: timeNow.getHours().toString() + ":" + timeNow.getMinutes().toString(),
    },
    title: function(textMessage){
      return message.slice(0,40) + '........';
    },
  }
  resetInput();
  messageDB.push(messageobj);
}

// reset orm inputs.
function resetInput(){
  inputName.value = "";
  inputEmail.value = "";
  inputMessage.value = "";
  console.log("thx for message")
}

//extra validate
function validateMessage(){
// incase
}
