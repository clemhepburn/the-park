/* eslint-disable no-undef */
const URL = 'https://birch-park.herokuapp.com';
const API = URL + '/api/v1/messages';

export async function sendMessage(message) {
  return await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  }).then(res => res.json());
}

export async function getMessages() {
  return await fetch(API).then(res => res.json());
}
