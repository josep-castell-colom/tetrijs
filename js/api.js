const url = "http://localhost:3000/";

export function fetchScores() {
  const scores = fetch(`${url}scores`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return scores;
}
