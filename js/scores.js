import {
  gameOverDisplay,
  scoreDisplay,
  topScoresDisplay,
  yourScore,
} from '../main.js';
import { settings } from '../settings.js';
import { fetchScores, postScore } from './api.js';
import { level, checkLevel, dropDistance, clearedLines } from './game.js';
import { lineClearSFX, tetrisSFX } from './media.js';

export let scores = await getScores();
export let currentScore;

export function setCurrentScore(score) {
  currentScore = score;
}

async function getScores() {
  return await fetchScores();
}

export async function saveScore() {
  const name = prompt('Introduce tu nombre: ');
  if (name) {
    const data = {
      player: name,
      score: currentScore,
      level: level,
      clearedLines: clearedLines,
    };
    await postScore(data);
  }
  yourScore.innerText = `Your score: ${currentScore}`;
}

export function updateScore(rows) {
  console.log(currentScore);
  if (rows) {
    currentScore += dropDistance * settings.scores.hardDrop;
    console.log(currentScore);
    switch (rows) {
      case 1:
        currentScore += settings.scores.single * (level + 1);
        console.log(currentScore);
        lineClearSFX.play();
        break;
      case 2:
        currentScore += settings.scores.double * (level + 1);
        console.log(currentScore);
        lineClearSFX.play();
        break;
      case 3:
        currentScore += settings.scores.triple * (level + 1);
        console.log(currentScore);
        lineClearSFX.play();
        break;
      case 4:
        currentScore += settings.scores.tetris * (level + 1);
        console.log(currentScore);
        tetrisSFX.play();
        break;
    }
    scoreDisplay.innerText = currentScore;
  }
  checkLevel(rows);
}

export async function showScores() {
  const scores = await getScores();
  scores.forEach(score => {
    const span = document.createElement('span');
    span.innerText = `${score.player} --- ${score.score}`;
    topScoresDisplay.appendChild(span);
  });
  gameOverDisplay.style.display = 'flex';
}
