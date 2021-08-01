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

// post button handler
document.querySelector('.chat > form > button').addEventListener('click', e => {
  e.preventDefault();

  // grab text from the inputs
  const cssQuery = '.chat > form > fieldset:first-child > ';
  const name = document.querySelector(cssQuery + 'input:first-child').value;
  const message = document.querySelector(cssQuery + '*:last-child').value;

  send({ name, message }).then(res => console.log(res));
});

// console log messages
getMessages().then(res => console.log(res));
