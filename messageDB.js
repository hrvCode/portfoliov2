const messageFeed = [
      { id: "00-01", name: "khalid", age: 35, email: "khalid@swe.com" },
      { id: "00-02", name: "prasad", age: 32, email: "prasad@finn.com" }
   ];
(()=>{
  'use strict';

   // check for browser support
   if(!'indexedDB' in window){
     console.log("Your browser are not supporting indexedDB");
     return;
   }
   var dbMessages = window.indexedDB.open('testDB',3, function(upgradeDb){
     console.log('creating new OS');
     if(!upgradeDb.objectstoreNames.contains('message')){
       upgradeDb.createObjectStore('message');
       upgradeDb.createObjectStore('message', {keyPath: 'id', autoIncrement: true});
       message.createIndex('email', 'email', {unique: true});
       message.createIndex('name', 'name', {unique: false});
       message.createIndex('title','title', {unique: false});
       message.createIndex('content','content', {unique: false});
     }
       dbMessages.then(function(db){
         var tx = db.transaction('store', 'readonly');
         var store = tx.objectStore('store');
         return store.get('id');
       }).then(function(val){
         console.log(val);
       })
     });




})();
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
