/* eslint-disable no-undef */
const url = 'https://birch-park.herokuapp.com';
const API = '/api/v1/messages';

async function send(message) {
  return await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  }).then(res => res.json());
}

async function getMessages() {
  return await fetch(API).then(res => res.json());
}


// dynamic dom behavior and functions


//on load, display the existing messages in the messages div
async function displayMessages() {
  const messages = document.querySelector('.chat > .messages');

  // refresh the messages
  messages.innerHTML = '';

  // get the messages from the server and then display them
  getMessages().then(res => {
    for (let i = 0; i < res.length; i++) {
      const message = document.createElement('p');
      message.innerHTML = `<span>${res[i].name}</span> — ${res[i].message}`;
      messages.insertBefore(message, messages.firstChild); 
    }
  });
}

// we should use setInterval to keep the messages up to date
// we can check every like 1 second for new messages
// if the number of p's in the .chat element is the same as the amount of messages returned,
// then do nothing, else, refresh the messages (call displayMessages)
// holy shit github copilot is like literally writing this message for me it's creepy af
// wtf copilot y u do this 
// omg it wrote that line for me
// and even half of that one ^
// and I'm like "oh my god"
// and I'm like "oh my god"
// and I'm like "oh my god"
// lmao now it just keeps writing that ^

// post button handler
document.querySelector('.chat > form > button').addEventListener('click', e => {
  e.preventDefault();

  // grab the inputs
  const cssQuery = '.chat > form > fieldset:first-child > ';
  const inpName = document.querySelector(`${cssQuery} input:first-child`);
  const inpMessage = document.querySelector(cssQuery + '*:last-child');

  // upload the message to the database and then console log it
  send({ name: inpName.value, message: inpMessage.value }).then(res => console.log(res));

  // // add the message to the chat. i don't know if this is actually getting it from the db or if it's just getting the form text...
  // const newMessage = document.createElement('p');
  // newMessage.innerHTML = `<span>${name}</span> — ${message}`;
  // messages.insertBefore(newMessage, messages.firstChild);

  // add it to the chat without reloading the page
  displayMessages();

  // clear the message input
  inpMessage.value = '';
});

// display the messages
displayMessages();
