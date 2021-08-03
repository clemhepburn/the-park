/* eslint-disable no-undef */
import { getMessages, makeGradient, sendMessage, text2Hash } from './utils.js';

/*
=== dynamic dom behavior and functions ===
*/

// display the existing messages in the messages div
async function loadMessages() {
  const messages = document.querySelector('.chat > .messages');

  // refresh the messages
  messages.innerHTML = '';

  // get the messages from the server and then display them
  getMessages().then(res => renderMessages(res, messages));
}

const renderMessages = (messages, container) => {
  for (let i = 0; i < messages.length; i++) {
    const message = document.createElement('p');
    const avatar = document.createElement('div');
    avatar.classList.add('avatar');
    avatar.style.background = makeGradient(messages[i].name);
    message.innerHTML = `<span>${messages[i].name}</span> — ${messages[i].message}`;
    message.insertAdjacentElement('afterbegin', avatar);
    container.insertBefore(message, container.firstChild); 
    plantTree(messages[i].createdAt);
  }
};

const plantTree = message => {
  const hash = text2Hash(message);

  // grab width and heigh
  const fullWidth = window.innerWidth;
  const fullHeight = window.innerHeight;

  // make the tree
  const elem = document.createElement('div');
  elem.textContent = '🌳';
  elem.classList.add('tree');
  elem.style.left = (hash % fullWidth) + 'px';
  elem.style.top = (hash % fullHeight) + 'px';

  // plant the tree
  document.body.appendChild(elem);
};

// we should use setInterval to keep the messages up to date
// we can check every like 1 second for new messages
// if the number of p's in the .chat element is the same as the amount of messages returned,
// then do nothing, else, refresh the messages (call loadMessages)
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

  // grab the name and message
  const name = inpName.value;
  const message = inpMessage.value;

  // upload the message to the database and then console log it
  getMessages()
    .then(arr => sendMessage({ name, message }).then(res => [...arr, res]))
    .then(res => renderMessages(res, document.querySelector('.chat > .messages')))
  ;

  // // add the message to the chat
  // const messages = document.querySelector('.chat > .messages');
  // const newMessage = document.createElement('p');
  // newMessage.innerHTML = `<span>${inpName.value}</span> — ${inpMessage.value}`;
  // messages.insertBefore(newMessage, messages.firstChild);

  // display messages without refreshing
  // loadMessages();

  // clear the message input
  inpMessage.value = '';
  inpName.value = '';
});

// display the messages
loadMessages();
