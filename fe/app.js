/* eslint-disable no-undef */
const API = 'http://localhost:7890/api/v1/messages';

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
const messages = document.querySelector('.chat > .messages');
getMessages().then(res => {
  for (let i = 0; i < res.length; i++) {
    const message = document.createElement('p');
    message.innerHTML = `<strong>${res[i].name}</strong>: ${res[i].message}`;
    messages.insertBefore(message, messages.firstChild); 
  }
});

// post button handler
document.querySelector('.chat > form > button').addEventListener('click', e => {
  e.preventDefault();

  // grab text from the inputs
  const cssQuery = '.chat > form > fieldset:first-child > ';
  const name = document.querySelector(cssQuery + 'input:first-child').value;
  const message = document.querySelector(cssQuery + '*:last-child').value;

  send({ name, message }).then(res => console.log(res));

  // add the message to the chat. i don't know if this is actually getting it from the db or if it's just getting the form text...
  const newMessage = document.createElement('p');
  newMessage.innerHTML = `<strong>${name}</strong>: ${message}`;
  messages.insertBefore(newMessage, messages.firstChild);

  // add it to the chat without reloading the page
  document.location.reload();

  // clear the inputs
  document.querySelector(cssQuery + 'input:first-child' + '*:last-child').value = '';

});

// console log messages
getMessages().then(res => console.log(res));






