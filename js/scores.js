import {
  gameOverDisplay,
  scoreDisplay,
  topScoresDisplay,
  yourScore,
} from "../main.js";
import { fetchScores } from "./api.js";
import { checkLevel, score } from "./game.js";

export let scores = await getScores();

async function getScores() {
  return await fetchScores();
}

export function saveScore() {
  const name = prompt("Introduce tu nombre: ");
  yourScore.innerText = `Your score: ${score}`;
}

export function updateScore(rows) {
  if (rows) {
    score += dropDistance * settings.scores.hardDrop;
    switch (rows) {
      case 1:
        score += settings.scores.single * (level + 1);
        lineClearSFX.play();
        break;
      case 2:
        score += settings.scores.double * (level + 1);
        lineClearSFX.play();
        break;
      case 3:
        score += settings.scores.triple * (level + 1);
        lineClearSFX.play();
        break;
      case 4:
        score += settings.scores.tetris * (level + 1);
        tetrisSFX.play();
        break;
    }
    scoreDisplay.innerText = score;
  }
  checkLevel(rows);
}

export async function showScores() {
  const scores = await getScores();
  console.log(scores);
  scores.forEach((score) => {
    const span = document.createElement("span");
    span.innerText = `${score.player} --- ${score.score}`;
    topScoresDisplay.appendChild(span);
  });
  gameOverDisplay.style.display = "flex";
}
