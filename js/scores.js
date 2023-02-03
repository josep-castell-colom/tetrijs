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
  let scores = await fetchScores();
  scores.sort((a, b) => b.score - a.score);
  if (scores.length > 10) {
    scores = scores.slice(0, 10);
  }
  return scores;
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
  topScoresDisplay.innerHTML = '';
  scores.forEach(e => {
    const span = document.createElement('span');
    const name = document.createElement('span');
    const separator = document.createElement('span');
    const score = document.createElement('span');
    name.innerText = e.player;
    separator.innerText = '---';
    score.innerText = e.score;
    span.appendChild(name);
    span.appendChild(separator);
    span.appendChild(score);
    topScoresDisplay.appendChild(span);
  });
  gameOverDisplay.style.display = 'flex';
}
