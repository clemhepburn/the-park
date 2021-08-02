/* eslint-disable no-undef */
import { getMessages, sendMessage } from './utils_api.js';

/*
=== dynamic dom behavior and functions ===
*/

// display the existing messages in the messages div
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
  const cssQuery = '.chat fieldset:first-child >';
  const inpName = document.querySelector(`${cssQuery} input:first-child`);
  const inpMessage = document.querySelector(`${cssQuery} *:last-child`);

  // upload the message to the database and then console log it
  sendMessage({ name: inpName.value, message: inpMessage.value }).then(res => console.log(res));

  // // add the message to the chat
  // const messages = document.querySelector('.chat > .messages');
  // const newMessage = document.createElement('p');
  // newMessage.innerHTML = `<span>${inpName.value}</span> — ${inpMessage.value}`;
  // messages.insertBefore(newMessage, messages.firstChild);

  // display messages without refreshing
  displayMessages();

  // clear the message input
  inpMessage.value = '';
});

// display the messages
displayMessages();
