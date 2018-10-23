let inputName = document.querySelector('input[type="text"]');
let inputEmail = document.querySelector('input[type="email"]');
let inputMessage = document.querySelector('textarea');
let msgBtn = document.querySelector('button');
// message db;
let messageDB = [];

// msgBtn.addEventListener("click",() => {;
//   console.log(inputName.value + " " + inputEmail.value + " " + inputMessage.value);
//   addMessage(inputName.value, inputEmail.value, inputMessage.value);
// });

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
