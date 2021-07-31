const API = 'http://localhost:7890/api/v1/messages';

async function send(message) {
  const response = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  return await response.json();
}

async function getMessages() {
  const response = await fetch(API, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

(async () => console.log(await getMessages()))();

send({ name: 'clem', message: 'hello?' }).then(res => console.log(res));
