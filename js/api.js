const url = 'http://localhost:3000/';

export function fetchScores() {
  const scores = fetch(`${url}scores`)
    .then(res => res.json())
    .catch(err => console.log(err));
  return scores;
}

export async function postScore(data) {
  await fetch(`${url}scores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
    .then(res => console.log(res))
    .catch(err => console.log(err));
}
