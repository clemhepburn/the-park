/* eslint-disable no-undef */

/*===============
===BACKEND API=== 
===============*/

const URL = 'https://birch-park.herokuapp.com';
const API = URL + '/api/v1/messages';

async function sendMessage(message) {
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

export { sendMessage, getMessages };

/*===============
===COLOR STUFF=== 
=================*/

const COLORS = 256 ** 3; // number of colors in rgb integer space
const PRIMES = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37,
  41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 
  97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 139, 149, 
  151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211,
  223, 227, 229, 233, 239, 241, 251
]; // there are 55 prime numbers that are less than 255. Remember 255 = 3 * 5 * 17

// takes in a hash and a prime number and returns a hex code for a color
const makeColor = (hash, prime = 211) => {
  const hex = (((hash + prime) * prime) % (COLORS - 1)).toString(16);
  return '#' + '0'.repeat(6 - hex.length) + hex;
};

// takes in text and returns a hash
const text2Hash = text => parseInt(text 
  .split('')
  .reduce((acc, char) => (acc * char.charCodeAt(0)) % Number.MAX_SAFE_INTEGER, 1)
) % COLORS;

// returns a gradient (string) for a given text
const makeGradient = (text, loud = false) => {
  // hash text
  const hash = text2Hash(text);

  // decide what type of gradient to use
  const gradientType = ['linear', 'linear', 'linear', 'conic', 'conic', 'radial'][hash % 6];

  // make gradient args
  const args = [];

  if (gradientType === 'linear') args.push(`${hash % 360}deg`);
  else if (gradientType === 'conic') args.push(`from ${hash % 360 }deg at ${hash % 100}% ${25 + hash % 50}%`);
  else if (gradientType === 'radial') args.push(`at ${hash % 100}% ${25 + hash % 50}%`);

  const numOfColors = [1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 6, 7][hash % 11];
  for (let i = 0; i < numOfColors; i++) args.push(makeColor(hash, PRIMES[Math.max(((i + 1) * 41) % PRIMES.length - 1, 7)]));

  // return gradient
  if (loud) console.log(text, `${gradientType}-gradient(${args.join(', ')})`);
  return `${gradientType}-gradient(${args.join(', ')})`;
};

export { makeGradient };
